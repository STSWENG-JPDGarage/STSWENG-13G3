const PaymentReminder = require('../models/paymentReminderModel');
const mongoose = require('mongoose')

const paymentReminderController = {
    // Create a new payment reminder
    createPaymentReminder: async (req, res) => {
        try {
            const { clientName, paymentType, paymentAmount, dueDate } = req.body;
            const newPaymentReminder = new PaymentReminder({
                clientName,
                paymentType,
                paymentAmount,
                dueDate
            });
            await newPaymentReminder.save();
            res.status(201).json({ message: 'Payment reminder created successfully', paymentReminder: newPaymentReminder });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error', message: error.message });
        }
    },

    // Retrieve all payment reminders
    getAllPaymentReminders: async (req, res) => {
        try {
            const paymentReminders = await PaymentReminder.find();
            res.status(200).json(paymentReminders);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Retrieve all payment reminders
    getAllPaymentReminders: async (req, res) => {
        try {
            const paymentReminders = await PaymentReminder.find();
            res.status(200).json(paymentReminders);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Retrieve nondue payment reminders
    getNonDuePaymentReminders: async (req, res) => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
    
            const paymentReminders = await PaymentReminder.find({ dueDate: { $gte: today } });
    
            res.status(200).json(paymentReminders);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Retrieve a specific payment reminder by ID
    getPaymentReminderById: async (req, res) => {
        try {
            const paymentReminder = await PaymentReminder.findById(req.params.id);
            if (!paymentReminder) {
                return res.status(404).json({ error: 'Payment reminder not found' });
            }
            res.status(200).json(paymentReminder);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Update a specific payment reminder by ID
    updatePaymentReminderById: async (req, res) => {
        try {
            const { clientName, paymentType, paymentAmount, dueDate } = req.body;
            const updatedPaymentReminder = await PaymentReminder.findByIdAndUpdate(req.params.id, {
                clientName,
                paymentType,
                paymentAmount,
                dueDate
            }, { new: true });
            if (!updatedPaymentReminder) {
                return res.status(404).json({ error: 'Payment reminder not found' });
            }
            res.status(200).json({ message: 'Payment reminder updated successfully', paymentReminder: updatedPaymentReminder });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Delete a specific payment reminder by ID
    deletePaymentReminderById: async (req, res) => {
        try {
            const deletedPaymentReminder = await PaymentReminder.findByIdAndDelete(req.params.id);
            if (!deletedPaymentReminder) {
                return res.status(404).json({ error: 'Payment reminder not found' });
            }
            res.status(200).json({ message: 'Payment reminder deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

/*
// FOR TESTING PURPOSES
// Create a new payment reminder
const newPaymentReminder = new PaymentReminder({
    clientName: 'Example Client',
    paymentType: 'Incoming',
    paymentAmount: 999,
    dueDate: new Date('2024-12-31')
});
// Save the to the database
newPaymentReminder.save()
    .then(savedReminder => {
        console.log('Payment reminder saved:', savedReminder);
    })
    .catch(error => {
        console.error('Error saving payment reminder:', error);
    });
*/

module.exports = paymentReminderController;
