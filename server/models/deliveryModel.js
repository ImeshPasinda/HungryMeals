const mongoose = require("mongoose");

const userRiderSchema = mongoose.Schema({

    riderName: { type: String, require },
    riderEmail: { type: String, require },
    riderPassword: { type: String, require },

}, {

    timestamps: true,

})

const Rider = mongoose.model('riders', userRiderSchema)
 
module.exports = Rider