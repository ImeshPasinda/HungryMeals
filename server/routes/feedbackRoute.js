const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedbackModel")


router.post("/post/", async (req, res) => {

    const { name, email, subject ,message } = req.body

    

    try {

       
            const newFeedback = new Feedback({ name, email, subject ,message })
            newFeedback.save()
            res.send('Feedback send Successfully')
        

    } catch (error) {

        return res.status(400).json({ message: error });
    }
});

module.exports = router