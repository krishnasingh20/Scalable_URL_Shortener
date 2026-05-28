const validator = require("validator");
const { validate } = require("../models/Url");

const validateUrl = (req, res, next) => {
    let { originalUrl } = req.body;

    if(!originalUrl) {
        return res.status(400).json({
            message: "orignal URL is required",
        });
    }

    originalUrl = originalUrl.trim();

    //auto add https
    if(!originalUrl.startsWith("http") && !originalUrl.startsWith("https")) {
        originalUrl = `https://${originalUrl}`;
    }

    const isValid = validator.isURL(originalUrl, {
        require_protocol: true,
        protocols: ["http", "https"],
    });

    if(!isValid) {
        return res.status(400).json({
            message: "Invalid URL",
        });
    }

    // attach clean url to req
    req.body.originalUrl = originalUrl;

    next();
};

module.exports = validateUrl;