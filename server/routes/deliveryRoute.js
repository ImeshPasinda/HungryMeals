const express = require("express");
const router = express.Router();
const Driver = require("../models/deliveryModel")


/*router.post("/login", async (req, res) => {

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
*/

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find a driver with the given email and password
    const driver = await Driver.findOne({ email, password });

    if (driver) {
      // Create a response object with the driver's name, email, and ID
      const currentDriver = {
        name: driver.name,
        email: driver.email,
        _id: driver._id,
      };

      // Send the response object back to the client
      res.send(currentDriver);
    } else {
      // If no driver was found, send an error message
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    // If an error occurred, send a generic error message
    res.status(500).json({ message: "Something went wrong" });
  }
});

//register new Rider
router.post("/addDriver", async (req, res) => {

    const { riderName, riderEmail,riderPhone, riderPassword } = req.body

    try {

        const riderExist = await Driver.findOne({ email })

        if (riderExist) {

            return res.status(400).json({ message: error });

        } else {

            const newRider = new Driver({ riderName, riderEmail,riderPhone, riderPassword })
            newRider.save()
            res.send('New Rider Registration Successful !!!')
        }

    } catch (error) {

        return res.status(400).json({ message: error });
    }

})