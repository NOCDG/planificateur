const express = require('express');
const { getAllSemaines, createSemaine, removeSemaine, modifySemaine } = require('../controllers/semaineController');

const router = express.Router();

router.get('/', getAllSemaines);
router.post('/', createSemaine);
router.delete('/:id', removeSemaine);
router.put('/:id', modifySemaine);

module.exports = router;