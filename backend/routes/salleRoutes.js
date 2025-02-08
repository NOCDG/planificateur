const express = require('express');
const { getAllSalles, createSalle, removeSalle, modifySalle } = require('../controllers/salleController');

const router = express.Router();

router.get('/', getAllSalles);
router.post('/', createSalle);
router.delete('/:num_salle/:batiment', removeSalle);
router.put('/:num_salle/:batiment', modifySalle);

module.exports = router;