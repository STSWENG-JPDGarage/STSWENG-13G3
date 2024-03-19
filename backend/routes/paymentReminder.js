const express = require('express');
const router = express.Router();
const paymentReminderController = require('../controllers/paymentReminderController');

router.post('/paymentReminders-create', paymentReminderController.createPaymentReminder);
router.get('/paymentReminders-get', paymentReminderController.getAllPaymentReminders);
router.get('/paymentReminders-get/:id', paymentReminderController.getPaymentReminderById);
router.put('/paymentReminders-update/:id', paymentReminderController.updatePaymentReminderById);
router.delete('/paymentReminders-delete/:id', paymentReminderController.deletePaymentReminderById);

module.exports = router;