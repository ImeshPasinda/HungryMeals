const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema({
    name: { type: String, required: true },
    varients: [String],
    prices: [
        {
            size: String,
            price: Number,
        },
    ],
    image: { type: String, required: true },
    isBeverage: { type: Boolean, default: false },
    isVegetarian: { type: Boolean, default: false },
    isNonVeg: { type: Boolean, default: false },
    description: { type: String },
}, {
    timestamps: true,
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
