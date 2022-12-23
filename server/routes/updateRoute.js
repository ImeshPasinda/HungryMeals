const express = require("express");
const router = express.Router();
const User = require("../models/userModel")



router.get("user/:id", async (req, res) => {

    let userId = req.params.id;
    const { name, email, password } = req.body;

    const updateUser = {
        
        name,
        email,
        password
    
    }

   const update =  await User.findById(userId).then(() => {

    res.send(update)
        res.status(400).send({ status: "User upadte" })

    }).catch((err) => {


        res.status(400).send({ status: "Error with updating data", error: err.message });

    })

})



router.put("/user/:id", async (req, res) => {

    let userId = req.params.id;
    const { name, email, password } = req.body;

    const updateUser = {
        
        name,
        email,
        password
    }

    try {

        await User.findByIdAndUpdate(userId, updateUser)
        res.status(400).send({ status: "User upadte" })

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});




router.get("/getallusers/email/:id", async (req, res) => {

    let userId = req.params.id;
  
    try {

        const users = await User.findById(userId)
        res.send(users)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.get("/getallusers/password/:id", async (req, res) => {

    let userId = req.params.id;
  
    try {

        const users = await User.findById(userId)
        res.send(users)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});




module.exports = router