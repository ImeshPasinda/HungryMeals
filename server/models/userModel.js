const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    name: { type: String, require },
    email: { type: String, require },
    password: { type: String, require },
    isVerified: { type: Boolean, require, default: false },
    notifications : { type: String, require, default: 'Welcome to Hungy Meals!' },

}, {

    timestamps: true,

})

const User = mongoose.model('users', userSchema)

module.exports = User