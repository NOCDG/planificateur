const express = require('express');
const { getAllPromos, createPromo, removePromo, modifyPromo } = require('../controllers/promoController');

const router = express.Router();

router.get('/', getAllPromos);
router.post('/', createPromo);
router.delete('/:nom', removePromo);
router.put('/:nom', modifyPromo);

module.exports = router;