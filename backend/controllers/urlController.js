const Url = require("../models/Url");
const { nanoid } = require("nanoid");
const validator = require("validator");

const shortenUrl = async (req, res) => {
    try {
        const { originalUrl, customAlias, expiresAt } = req.body;

        //validation
        if(!originalUrl) {
            return res.status(400).json({
                message: "original URL is required",
            });
        }

        // auto add https if missing 
        let formattedUrl = originalUrl;

        if(!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
            formattedUrl = `https://${formattedUrl}`;
        }

        // validate URL
        if(!validator.isURL(formattedUrl)) {
            return res.status(400).json({
                message: "Invalid URL",
            });
        }

        //if custom Alias is provided use it otherwise generate nanoid
        const shortCode = customAlias || nanoid(6);

        //check if shortcode already exists
        const existingUrl = await Url.findOne({
            shortCode,
        });

        if(existingUrl) {
            return res.status(400).json({
                message: "Short code already exists",
            });
        }

        const newUrl = await Url.create({
            originalUrl: formattedUrl,
            shortCode,
            customAlias,
            expiresAt,
        });

        res.status(201).json({
            message: "Short URL created successfully",
            data: newUrl,
        })

    }
    catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};


const redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        // find url document
        const url = await Url.findOne({
            shortCode,
        });

        // if url not found
        if(!url) {
            return res.status(404).json({
                message: "URL not found",
            });
        }

        // check if desabled
        if(!url.isActive) {
            return res.status(403).json({
                message: "URL is disabled",
            });
        }

        // check expiration
        if(url.expiresAt && new Date(url.expiresAt) < new Date()) {
            return res.status(410).json({
                message: "URL is expired",
            });
        }

        // increase clicks
        url.clicks += 1;

        // store visit timestamp 
        url.visitHistory.push({
            timestamp: new Date(),
        });

        // save updated document 
        await url.save();

        // redirect user 
        res.redirect(url.originalUrl);
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        })
    }
};


const getAllurls = async (req, res) => {
    try {
        const urls = await Url.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            count: urls.length,
            data: urls,
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};


module.exports = {
    shortenUrl,
    redirectUrl,
    getAllurls,
};