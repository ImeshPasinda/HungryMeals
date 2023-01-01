const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({

    
    notificationType: { type: String, require, default: 'Public Notification' },
    notificationHeader: { type: String, require, default: 'empty' },
    notificationBody: { type: String, require, default: 'empty' },
    notificationButton: { type: String, require, default: 'empty' },
    notificationDate: { type: String, require, default: 'YYYY-MM-DD' },

  
}, {

    timestamps: true,

})

const Notification = mongoose.model('notifications', notificationSchema)

module.exports = Notification