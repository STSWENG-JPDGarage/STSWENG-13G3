const mongoose = require('mongoose')

const Schema = mongoose.Schema

const autoDeleteSchema = new Schema({
    numOfDays: {
        type: Number,
        required: true,
        min: [1, 'Number of days should be greater than or equal to 1'],
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
        required: true,
    },
})

const autoDelete = mongoose.model('autoDelete', autoDeleteSchema)

module.exports = autoDelete
