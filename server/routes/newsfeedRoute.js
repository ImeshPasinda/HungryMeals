const express = require("express");
const router = express.Router();
const News = require('../models/newsfeedModel')

router.get("/getallnews", async (req, res) => {

    try {

        const news = await News.find({})
        res.send(news)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;