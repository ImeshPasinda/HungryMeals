const express = require("express");
const router = express.Router();
const News = require('../models/newsfeedModel')


//add news for newsfeed
router.post("/post/news", async (req, res) => {

    const { image, header,category, description } = req.body



    try {


        const newNews = new News({ image, header,category,description })
        newNews.save()
        res.send('News posted successfully!')


    } catch (error) {

        return res.status(400).json({ message: error });
    }
});

//update newsfeed
router.put("/update/news/:id", async (req, res) => {

    let userId = req.params.id;
    const { image, header,category, description  } = req.body;

    const updateNews = {

        image, 
        header,
        category, 
        description 
    }

    try {

        await News.findByIdAndUpdate(userId, updateNews)
        res.send('News updated successfully!')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

//get all news
router.get("/getallnews", async (req, res) => {

    try {

        const news = await News.find({})
        res.send(news)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


module.exports = router;