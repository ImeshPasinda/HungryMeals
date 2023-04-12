
/*const express = require("express");
const router = express.Router();
const Driver = require("../models/deliveryModel")

//
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
//

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
  const { riderName, riderEmail, riderPhone, riderPassword } = req.body;

  try {
    const driverExist = await Driver.findOne({ riderEmail });

    if (driverExist) {
      return res.status(400).json({ message: "Driver already exists" });
    } else {
      const newDriver = new Driver({
        riderName,
        riderEmail,
        riderPhone,
        riderPassword,
      });

      await newDriver.save();
      res.status(201).json({ message: "New driver created" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});


module.exports = router;
*/

const express = require("express");
const router = express.Router();
const { Driver } = require("../models/deliveryModel")
const Delivery = require("../models/deliveryModel");

router.post("/login", async (req, res) => {
  const { email, Password } = req.body;

  try {
    // Find a driver with the given email and password
    const driver = await Driver.findOne({ email, Password });

    if (driver) {
      // Create a response object with the driver's name, email, and ID
      const currentDriver = {
        name: driver.Name,
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

//register new Driver
router.post("/addDriver", async (req, res) => {
  const { name, email, phone, Password } = req.body;

  try {
    const driverExist = await Driver.findOne({ email });

    if (driverExist) {
      return res.status(400).json({ message: "Driver already exists" });
    } else {
      const newDriver = new Driver({
        Name: name,
        email,
        phone,
        Password,
      });

      await newDriver.save();
      res.status(201).json({ message: "New driver created" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// Update driver by id
router.put('/driver/:id', async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!driver) {
      return res.status(404).send({ error: 'Driver not found' });
    }
    res.send(driver);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// DELETE a driver by their ID
router.delete("/drivers/:id", async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // Check if the driver is assigned to any deliveries
    const assignedDeliveries = await Delivery.find({ driver: req.params.id });
    if (assignedDeliveries.length > 0) {
      return res.status(400).json({ message: "Driver is assigned to a delivery and cannot be deleted" });
    }

    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: "Driver deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
