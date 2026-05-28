const express = require("express");
const router = express.Router();

const { shortenUrl, redirectUrl, getAllurls } = require("../controllers/urlController");
const validateUrl = require("../middleware/validateUrl");

// create short url 
router.post("/api/url/shorten", validateUrl, shortenUrl);

// to get all exisiting urls
router.get("/api/url", getAllurls);

// redirect route -- dynamic route must come after "/" because "/anything" will be may match dynamic route first
router.get("/:shortCode", redirectUrl);

module.exports = router;