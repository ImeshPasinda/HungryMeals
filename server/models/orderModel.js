const mongoose = require("mongoose");

const orderSchemma = mongoose.Schema({

    name : {type: String , require},
    email : {type: String , require},
    userid : {type: String , require},
    orderItems : [],
    shippingAddress : {type: Object},
    orderAmount : {type: String , require},
    isDelivered : {type: Boolean , default : false},
    transactionId : {type: String , require},
},{
    
    timestamps : true
})

module.exports = mongoose.model('orders' , orderSchemma)