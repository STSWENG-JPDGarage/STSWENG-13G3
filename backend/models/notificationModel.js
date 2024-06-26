const mongoose = require('mongoose')

const Schema = mongoose.Schema

// NEW VERSION
// Base schema for common fields
const notificationSchema = new Schema({
    notificationType: {
        type: String,
        enum: ['Stock', 'Payment'],
        required: true
    },
    isArchive: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No',
        required: true
    },
    isArchiveDate: {
        type: Date,
        default: null,
        required: false
    },
    isDeleted: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
}, { discriminatorKey: 'discriminator' });

// Stock notification schema
const stockNotificationSchema = new Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    stockRemaining: {
        type: Number,
        required: true,
        min: [0, 'Stock Number should be greater than or equal to 0'],
        max: [9999999, 'Stock Number should be less than or equal to 9999999'],
    }
});

// Payment notification schema
const paymentNotificationSchema = new Schema({
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        enum: ['Incoming', 'Outgoing'],
        required: true
    },
    paymentAmount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    }
});

// Create models based on the base schema
const Notification = mongoose.model('Notification', notificationSchema);
const StockNotification = Notification.discriminator('StockNotification', stockNotificationSchema);
const PaymentNotification = Notification.discriminator('PaymentNotification', paymentNotificationSchema);

module.exports = {
    Notification,
    StockNotification,
    PaymentNotification
};
