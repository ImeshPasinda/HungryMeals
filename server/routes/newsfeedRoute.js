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

    let newsId = req.params.id;
    const { image, header, description  } = req.body;

    const updateNews = {

        image, 
        header,
        description 
    }

    try {

        await News.findByIdAndUpdate(newsId, updateNews)
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


//get current news
router.get("/getcurrentnews/:id", async (req, res) => {

    let newsId = req.params.id;
    try {

        const currentnews = await News.findById(newsId)
        res.send(currentnews)

    } catch (error) {
        return res.status(400).json({ message: error });
    }

})

//Delete News
router.delete("/delete/news/:id", async (req, res) => {

    let newsId = req.params.id;

    try {
        await News.findByIdAndDelete(newsId)

        res.send('News Deleted Successfully')
    }

    catch (error) {


        return res.status(400).json({ message: error });
    }
});


module.exports = router;