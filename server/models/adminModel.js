const mongoose = require("mongoose");

const userAdminSchema = mongoose.Schema({

    name: { type: String, require },
    email: { type: String, require },
    password: { type: String, require },
    isAdmin: { type: Boolean, require, default: true },

}, {

    timestamps: true,

})

const Admin = mongoose.model('admins', userAdminSchema)

module.exports = Admin