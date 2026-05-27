const express = require("express");
const router = express.Router();

router.post("/shorten", (req, res) => {
    res.send("Shorten URL Routes Working")
});

module.exports = router;