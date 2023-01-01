const express = require("express");
const router = express.Router();
const Notification = require("../models/notificationModel")

// router.post("/post", async (req, res) => {

//     const { notificationType, notificationHeader, notificationBody, notificationButton, notificationDate } = req.body



//     try {

//         const currentNotifications = {


//             notificationType: notificationType,
//             notificationHeader: notificationHeader,
//             notificationBody: notificationBody,
//             notificationButton: notificationButton,
//             notificationDate: notificationDate,



//         }
//         res.send(currentNotifications);



//         const newNotification = new Notification({ notificationType, notificationHeader, notificationBody ,notificationButton, notificationDate })
//         newNotification.save()
//         // localStorage.setItem('currentNotification', JSON.stringify(newNotification))
//         res.send('Notification Posted Successfully')



//     } catch (error) {

//         return res.status(400).json({ message: error });
//     }
// });

router.get("/getnotifications", async (req, res) => {


    try {

        const notifications = await Notification.find()
        res.send(notifications)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



router.put("/update/notification/:id", async (req, res) => {

    let userId = req.params.id;
    const { notificationType, notificationHeader, notificationBody, notificationButton, notificationDate } = req.body;

    const updateNotification = {

        notificationType,
        notificationHeader,
        notificationBody,
        notificationButton,
        notificationDate
    }

    try {

        await Notification.findByIdAndUpdate(userId, updateNotification)
        res.send('User Public Notification Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



module.exports = router;