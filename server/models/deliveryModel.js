const mongoose = require("mongoose");

/*const userRiderSchema = mongoose.Schema({

    riderName: { type: String, require },
    riderEmail: { type: String, require },
    riderPassword: { type: String, require },

}, {

    timestamps: true,

})*/

const driverSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    Password: { type: String, require },
    dailySalary: { type: Number, default: 0 },
  }, {

    timestamps: true,

});

const deliverySchema = mongoose.Schema({
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    pickupTime: { type: Date, required: true },
    deliveryTime: { type: Date },
    earnings: { type: Number, default: 0 },
  });

const Driver = mongoose.model('Driver', driverSchema);

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = { Driver, Delivery };

//const Rider = mongoose.model('riders', userRiderSchema)

//module.exports = Rider