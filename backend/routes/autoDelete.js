const express = require('express');
const router = express.Router();
const autoDeleteController = require('../controllers/autoDeleteController');

router.post('/create', autoDeleteController.createAutoDelete);
router.get('/get', autoDeleteController.getAllAutoDeletes);
router.get('/get/:id', autoDeleteController.getAutoDeleteById);
router.put('/update/:id', autoDeleteController.updateAutoDeleteById);
router.delete('/delete/:id', autoDeleteController.deleteAutoDeleteById);

module.exports = router;