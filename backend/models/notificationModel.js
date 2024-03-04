const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notificationSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    stockRemaining: {
        type: Number,
        required: true
    },
    isArchive: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const notification = mongoose.model('notification', notificationSchema)

module.exports = notification
