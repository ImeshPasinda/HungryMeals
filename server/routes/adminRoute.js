const express = require("express");
const router = express.Router();
const Admin = require("../models/adminModel")


router.post("/login", async (req, res) => {

    const { email, password } = req.body

    try {

        const admin = await Admin.find({ email, password })

        if (admin.length > 0) {

            const currentUser = {
                name: admin[0].name,
                email: admin[0].email,
                isAdmin: admin[0].isAdmin,
                _id: admin[0]._id
            }
            res.send(currentUser);

        }
        else {

            return res.status(400).json({ message: 'Adimin Login Failed' });

        }

    } catch (error) {

        return res.status(400).json({ message: 'Something went wrong' });
    }
})

module.exports = router;