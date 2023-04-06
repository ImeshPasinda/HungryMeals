const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema({

    name: { type: String, require },
    varients: [],
    prices: [],
    category: { type: String, require },
    image: { type: String, require },
    isPizza: {type: Boolean, require , default : false},
    isBeverage: {type: Boolean, require , default : false},
    isVegetarian: {type: Boolean, require , default : false},
    description: { type: String, require }

}, {

    timestamps: true,

})

const pizzaModel = mongoose.model('pizzas', pizzaSchema)

module.exports = pizzaModel