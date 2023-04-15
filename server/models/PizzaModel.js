const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    varients: {
        type: [String],
        required: true
    },
    prices: {
        type: [{
            small: Number,
            medium: Number,
            large: Number
        }],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isNonVeg: {
        type: Boolean,
        required: true
    },
    isVegetarian: {
        type: Boolean,
        required: true
    },
    isBeverage: {
        type: Boolean,
        required: true
    },
}, {
    timestamps: true,
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
