const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

const {
    getAllNotifications
} = require('../controllers/notificationController')

router.get('/notifications-get', notificationController.getAllNotifications);
router.post('/notifications-add', notificationController.addNotification);
router.put('/notifications-update/:id', notificationController.updateNotification);
router.delete('/notifications-delete/:id', notificationController.deleteNotification);

module.exports = router;