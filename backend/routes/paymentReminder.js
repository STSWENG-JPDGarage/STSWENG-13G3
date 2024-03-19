const express = require('express');
const router = express.Router();
const paymentReminderController = require('../controllers/paymentReminderController');

router.post('/create', paymentReminderController.createPaymentReminder);
router.get('/get', paymentReminderController.getAllPaymentReminders);
router.get('/get-nondue', paymentReminderController.getNonDuePaymentReminders);
router.get('/get/:id', paymentReminderController.getPaymentReminderById);
router.put('/update/:id', paymentReminderController.updatePaymentReminderById);
router.delete('/delete/:id', paymentReminderController.deletePaymentReminderById);

module.exports = router;