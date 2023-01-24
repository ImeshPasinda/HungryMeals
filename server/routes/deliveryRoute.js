const express = require("express");
const router = express.Router();
const Rider = require("../models/deliveryModel")


router.post("/login", async (req, res) => {

    const { RiderEmail, RiderPassword } = req.body

    try {

        const rider = await Rider.find({ RiderEmail, RiderPassword })

        if (rider.length > 0) {

            const currentRider = {
                RiderName: rider[0].RiderName,
                RiderEmail: rider[0].RiderEmail,
                _id: rider[0]._id
            }
            res.send(currentRider);

        }
        else {

            return res.status(400).json({ message: 'Rider Login Failed' });

        }

    } catch (error) {

        return res.status(400).json({ message: 'Something went wrong' });
    }
})

//register new Rider
router.post("/addrider", async (req, res) => {

    const { riderName, riderEmail, riderPassword } = req.body

    try {

        const riderExit = await Rider.findOne({ riderEmail })

        if (riderExit) {

            return res.status(400).json({ message: error });

        } else {

            const newRider = new Rider({ riderName, riderEmail, riderPassword })
            newRider.save()
            res.send('New Rider Registration Successful !!!')
        }

    } catch (error) {

        return res.status(400).json({ message: error });
    }

})