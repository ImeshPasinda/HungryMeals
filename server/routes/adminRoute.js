const express = require("express");
const router = express.Router();
const Admin = require("../models/adminModel")



router.post("/admin", async (req, res) => {

    const { email, password } = req.body

    try {

        const admin = await Admin.find({ email, password })

        if (admin.length > 0) {

            const currentUser = {
                name: user[0].name,
                email: user[0].email,
                isAdmin: user[0].isAdmin,
                _id: user[0]._id
            }
            res.send(currentUser);

        }
        else {

            return res.status(400).json({ message: 'Admin Login Failed' });

        }

    } catch (error) {

        return res.status(400).json({ message: 'Something went wrong' });
    }
})

// router.get("/getadminusers", async (req, res) => {

  
//     try {

//         const users = await User.find({})
//         res.send(users)

//     } catch (error) {
//         return res.status(400).json({ message: error });
//     }
// });

module.exports = router;