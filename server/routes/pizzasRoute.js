const express = require("express");
const router = express.Router();
const Pizza = require('../models/PizzaModel')


//add new foods
router.post("/add/food", async (req, res) => {
  const { newName, newVarients, newPrices, newImage, newIsBeverage, newIsVegetarian, newIsNonVeg, newDescription } = req.body;

  try {
      const foods = new Pizza({
        name : newName,
        image : newVarients,
        isBeverage : newPrices,
        isVegetarian : newImage,
        isNonVeg : newIsBeverage,
        description : newIsVegetarian,
        varients : newIsNonVeg,
        prices : newDescription,
      });

      await foods.save();
      res.send('Food added successfully!');
  } catch (error) {
      return res.status(400).json({ message: error });
  }
});


//get all foods
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

//update foods
router.put("/update/food/:id", async (req, res) => {
    const foodId = req.params.id;
    const { name, varients, prices, image, isBeverage, isVegetarian, isNonVeg, description } = req.body;
  
    try {
      const updateFoods = {
        name,
        image,
        isBeverage,
        isVegetarian,
        isNonVeg,
        description,
        varients,
        prices,
      };
      await Pizza.findByIdAndUpdate(foodId, updateFoods);
      res.send('Foods updated successfully!');
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  });
  
  

module.exports = router;