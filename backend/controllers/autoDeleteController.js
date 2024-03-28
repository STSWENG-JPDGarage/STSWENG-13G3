const AutoDelete = require('../models/autoDeleteModel');
const mongoose = require('mongoose')

const autoDeleteController = {
    // Create new auto-delete settings
    createAutoDelete: async (req, res) => {
        try {
            const { numOfDays, lastUpdated } = req.body;
            const newAutoDelete = new AutoDelete({
                numOfDays,
                lastUpdated,
            });
            await newAutoDelete.save();
            res.status(201).json({ message: 'Auto delete setting created successfully', autoDelete: newAutoDelete });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error', message: error.message });
        }
    },

    // Retrieve all auto-delete settings
    getAllAutoDeletes: async (req, res) => {
        try {
            const autoDeletes = await AutoDelete.find();
            res.status(200).json(autoDeletes);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Retrieve a specific auto-delete setting by id
    getAutoDeleteById: async (req, res) => {
        try {
            const autoDelete = await AutoDelete.findById(req.params.id);
            if (!autoDelete) {
                return res.status(404).json({ error: 'Auto delete setting not found' });
            }
            res.status(200).json(autoDelete);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Update a specific auto-delete setting by ID
    updateAutoDeleteById: async (req, res) => {
        try {
            const { numOfDays, lastUpdated } = req.body;
            const updatedAutoDelete = await AutoDelete.findByIdAndUpdate(req.params.id, {
                numOfDays,
                lastUpdated
            }, { new: true });
            if (!updatedAutoDelete) {
                return res.status(404).json({ error: 'Auto delete setting not found' });
            }
            res.status(200).json({ message: 'Auto delete updated successfully', autoDelete: updatedAutoDelete });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Delete a specific auto-delete setting by ID
    deleteAutoDeleteById: async (req, res) => {
        try {
            const deletedAutoDelete = await AutoDelete.findByIdAndDelete(req.params.id);
            if (!deletedAutoDelete) {
                return res.status(404).json({ error: 'Auto delete setting not found' });
            }
            res.status(200).json({ message: 'Auto delete setting deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = autoDeleteController;
