const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    name: { type: String, require },
    email: { type: String, require },
    password: { type: String, require },
    isVerified: { type: Boolean, require, default: false },
    notificationOneImage: { type: String, require, default: 'https://img.freepik.com/free-vector/character-illustration-people-with-internet-message-icons_53876-66149.jpg?w=900&t=st=1672323497~exp=1672324097~hmac=8f1145a507dba8e09043821090e0b1a0681a94cd1d95ce7f2459d0cb08ef4fe3' },
    notificationOneHeader: { type: String, require, default: '' },
    notificationOneBody: { type: String, require, default: '' },
    notificationOneDate: { type: Date, require, default: '2022-12-30' },

    notificationTwoImage: { type: String, require, default: 'https://img.freepik.com/free-vector/character-illustration-people-with-internet-message-icons_53876-66149.jpg?w=900&t=st=1672323497~exp=1672324097~hmac=8f1145a507dba8e09043821090e0b1a0681a94cd1d95ce7f2459d0cb08ef4fe3' },
    notificationTwoHeader: { type: String, require, default: '' },
    notificationTwoBody: { type: String, require, default: '' },
    notificationTwoDate: { type: Date, require, default: '2022-12-30' },

    notificationThreeImage: { type: String, require, default: 'https://img.freepik.com/free-vector/character-illustration-people-with-internet-message-icons_53876-66149.jpg?w=900&t=st=1672323497~exp=1672324097~hmac=8f1145a507dba8e09043821090e0b1a0681a94cd1d95ce7f2459d0cb08ef4fe3' },
    notificationThreeHeader: { type: String, require, default: '' },
    notificationThreeBody: { type: String, require, default: '' },
    notificationThreeDate: { type: Date, require, default: '2022-12-30' },
    
    notificationFourImage: { type: String, require, default: 'https://img.freepik.com/free-vector/character-illustration-people-with-internet-message-icons_53876-66149.jpg?w=900&t=st=1672323497~exp=1672324097~hmac=8f1145a507dba8e09043821090e0b1a0681a94cd1d95ce7f2459d0cb08ef4fe3' },
    notificationFourHeader: { type: String, require, default: '' },
    notificationFourBody: { type: String, require, default: '' },
    notificationFourDate: { type: Date, require, default: '2022-12-30' },

}, {

    timestamps: true,

})

const User = mongoose.model('users', userSchema)

module.exports = User