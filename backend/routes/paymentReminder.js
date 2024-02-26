const express = require('express');
const router = express.Router();
const paymentReminderController = require('../controllers/paymentReminderController');

router.post('/paymentReminders', paymentReminderController.createPaymentReminder);
router.get('/paymentReminders', paymentReminderController.getAllPaymentReminders);
router.get('/paymentReminders/:id', paymentReminderController.getPaymentReminderById);
router.put('/paymentReminders/:id', paymentReminderController.updatePaymentReminderById);
router.delete('/paymentReminders/:id', paymentReminderController.deletePaymentReminderById);

module.exports = router;