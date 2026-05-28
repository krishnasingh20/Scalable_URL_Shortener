const Url = require("../models/Url");
const { nanoid } = require("nanoid");
const validator = require("validator");


const shortenUrl = async (req, res) => {
    try {
        const { originalUrl, customAlias, expiresAt} = req.body;

        const existingLongUrl = await Url.findOne({ originalUrl });

        if(existingLongUrl) {

            if(expiresAt) {
                let newExpiry = new Date(expiresAt);

                if(!existingLongUrl.expiresAt || newExpiry > existingLongUrl.expiresAt) {
                    existingLongUrl.expiresAt = newExpiry;
                    await existingLongUrl.save();
                }
            }
            
            return res.status(200).json({
                message: "URL already exists",
                data: existingLongUrl,
            });
        }

        // generate shortcode 
        let shortCode = customAlias || nanoid(6);

        let savedUrl;

        while(true) {
            try {
                savedUrl = await Url.create({
                    originalUrl,
                    shortCode,
                    customAlias,
                    expiresAt,
                });

                break;
            }
            catch (error) {
                if(error.code == 11000) {
                    if(customAlias) {
                        return res.status(409).json({
                            message: "Custom alias already exists",
                        });
                    }

                    shortCode = nanoid(6);

                    continue;
                }

                throw error;
            }
        }

        return res.status(201).json({
            message: "Short URL created successfully",
            data: savedUrl,
        });
    }
    catch (error) {
        return res.status(500).json({
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