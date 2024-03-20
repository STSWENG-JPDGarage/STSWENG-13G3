const { Notification, StockNotification, PaymentNotification } = require('../models/notificationModel');
const mongoose = require('mongoose')

const notificationController = {
    // Controller function to create a new notification
    createNotification: async (req, res) => {
        try {
            let newNotification;
            if (req.body.notificationType === 'Stock') {
                newNotification = new StockNotification(req.body);
            } else if (req.body.notificationType === 'Payment') {
                newNotification = new PaymentNotification(req.body);
            } else {
                return res.status(400).json({ error: 'Invalid notification type' });
            }
            const savedNotification = await newNotification.save();
            res.status(201).json(savedNotification);

        } catch (error) {
            console.error('Error adding notification:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Controller function to fetch all notifications
    getAllNotifications: async (req, res) => {
        try {
            const notifications = await Notification.find();
            res.json(notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Controller function to update isArchive of a notification
    updateIsArchiveById: async (req, res) => {
        try {
            const { id } = req.params;
            const { isArchive } = req.body;

            const updatedNotification = await Notification.findByIdAndUpdate(id, { isArchive }, { new: true });

            if (!updatedNotification) {
                return res.status(404).json({ error: 'Notification not found' });
            }

            res.json(updatedNotification);
        } catch (error) {
            console.error('Error updating notification:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Controller function to delete a notification by ID
    deleteNotificationById: async (req, res) => {
        try {
            await Notification.findByIdAndDelete(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            console.error('Error deleting notification:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = notificationController;
