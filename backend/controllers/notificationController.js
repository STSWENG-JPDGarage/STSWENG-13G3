const Notification = require('../models/notificationModel');
const mongoose = require('mongoose')

const notificationController = {
    // Controller function to fetch all notifications
    getAllNotifications: async (req, res) => {
        try {
            // Retrieve all notifications from the database
            const notifications = await Notification.find();
            res.json(notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Controller function to add a new notification
    addNotification: async (req, res) => {
        try {
            // Create a new notification based on the request body
            const newNotification = new Notification(req.body);
            // Save the new notification to the database
            const savedNotification = await newNotification.save();
            res.status(201).json(savedNotification);
        } catch (error) {
            console.error('Error adding notification:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Controller function to delete a notification by ID
    deleteNotification: async (req, res) => {
        try {
            // Find the notification by ID and delete it
            await Notification.findByIdAndDelete(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            console.error('Error deleting notification:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = notificationController;
