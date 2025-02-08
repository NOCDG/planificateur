const express = require('express');
const { getAllOccupations, createOccupation, removeOccupation, modifyOccupation } = require('../controllers/occupationController');

const router = express.Router();

router.get('/', getAllOccupations);
router.post('/', createOccupation);
router.delete('/:id', removeOccupation);
router.put('/:id', modifyOccupation);

module.exports = router;