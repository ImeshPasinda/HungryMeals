const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    name: { type: String, require },
    email: { type: String, require },
    password: { type: String, require },
    isVerified: { type: Boolean, require, default: false },
    notificationOneImage: { type: String, require, default: 'https://img.freepik.com/free-vector/character-illustration-people-with-internet-message-icons_53876-66149.jpg?w=900&t=st=1672323497~exp=1672324097~hmac=8f1145a507dba8e09043821090e0b1a0681a94cd1d95ce7f2459d0cb08ef4fe3' },
    notificationOneHeader: { type: String, require, default: 'empty' },
    notificationOneBody: { type: String, require, default: 'empty' },
    notificationOneDate: { type: Date, require, default: '' },

    notificationTwoImage: { type: String, require, default: 'https://img.freepik.com/free-vector/character-illustration-people-with-internet-message-icons_53876-66149.jpg?w=900&t=st=1672323497~exp=1672324097~hmac=8f1145a507dba8e09043821090e0b1a0681a94cd1d95ce7f2459d0cb08ef4fe3' },
    notificationTwoHeader: { type: String, require, default: 'empty' },
    notificationTwoBody: { type: String, require, default: 'empty' },
    notificationTwoDate: { type: Date, require, default: '' },

    notificationThreeImage: { type: String, require, default: 'https://img.freepik.com/free-vector/character-illustration-people-with-internet-message-icons_53876-66149.jpg?w=900&t=st=1672323497~exp=1672324097~hmac=8f1145a507dba8e09043821090e0b1a0681a94cd1d95ce7f2459d0cb08ef4fe3' },
    notificationThreeHeader: { type: String, require, default: 'empty' },
    notificationThreeBody: { type: String, require, default: 'empty' },
    notificationThreeDate: { type: Date, require, default: '' },
    
    notificationFourImage: { type: String, require, default: 'https://img.freepik.com/free-vector/character-illustration-people-with-internet-message-icons_53876-66149.jpg?w=900&t=st=1672323497~exp=1672324097~hmac=8f1145a507dba8e09043821090e0b1a0681a94cd1d95ce7f2459d0cb08ef4fe3' },
    notificationFourHeader: { type: String, require, default: 'empty' },
    notificationFourBody: { type: String, require, default: 'empty' },
    notificationFourDate: { type: Date, require, default: '' },

}, {

    timestamps: true,

})

const User = mongoose.model('users', userSchema)

module.exports = User