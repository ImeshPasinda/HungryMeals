const express = require("express");
const router = express.Router();
const User = require("../models/userModel");



router.put("/:id", async (req, res) => {

    let userId = req.params.id;
    const { ticketHeader, ticketSubject } = req.body;

    const updateTickets = {

        ticketHeader,
        ticketSubject,
        
    }

    try {

        await User.findByIdAndUpdate(userId, updateTickets)
        res.send('User Tickets Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;