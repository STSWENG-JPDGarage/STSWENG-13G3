const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/create', notificationController.createNotification);
router.get('/get', notificationController.getAllNotifications);
router.put('/update-isArchive/:id', notificationController.updateIsArchiveById);
router.delete('/delete/:id', notificationController.deleteNotificationById);

module.exports = router;