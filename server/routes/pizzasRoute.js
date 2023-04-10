const express = require("express");
const router = express.Router();
const Pizza = require('../models/PizzaModel')

router.get("/getallpizzas", async (req, res) => {

    try {

        const pizzas = await Pizza.find({})
        res.send(pizzas)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

//get current food
router.get("/getcurrentfood/:id", async (req, res) => {

    let foodId = req.params.id;
    try {

        const currentfood = await Pizza.findById(foodId)
        res.send(currentfood)

    } catch (error) {
        return res.status(400).json({ message: error });
    }

})

module.exports = router;