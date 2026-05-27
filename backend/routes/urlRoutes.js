const express = require("express");
const router = express.Router();

const { shortenUrl, redirectUrl, getAllurls } = require("../controllers/urlController");

// create short url 
router.post("/shorten", shortenUrl);

// to get all exisiting urls
router.get("/", getAllurls);

// redirect route -- dynamic route must come after "/" because "/anything" will be may match dynamic route first
router.get("/:shortcode", redirectUrl);

module.exports = router;