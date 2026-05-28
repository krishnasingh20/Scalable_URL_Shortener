require("dotenv").config();

const express = require("express");
const cors = require("cors");

const urlRoutes = require("./routes/urlRoutes");

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json());

app.use("/", urlRoutes);

app.get("/", (req, res) => {
    res.send("URL Shortener API Running");
});

module.exports = app;