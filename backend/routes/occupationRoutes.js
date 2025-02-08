const express = require('express');
const router = express.Router();
const occupationController = require('../controllers/occupationController');

router.post('/', occupationController.createOccupation);
router.get('/', occupationController.getAllOccupations);
router.delete('/:id', occupationController.deleteOccupation);

module.exports = router;
