const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paymentReminderSchema = new Schema({
    clientName: {
        type: String,
        required: true,
    },
    paymentType: {
        type: String,
        enum: ['incoming', 'outgoing'],
        required: true
    },
    paymentAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    dueDate: {
        type: Date,
        required: true,
    },
})

const paymentReminder = mongoose.model('paymentReminder', paymentReminderSchema)

module.exports = paymentReminder
