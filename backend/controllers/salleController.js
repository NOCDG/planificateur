const { getSalles, addSalle, deleteSalle, updateSalle } = require('../models/salleModel');

const getAllSalles = async (req, res) => {
    try {
        const salles = await getSalles();
        res.status(200).json(salles);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des salles", error: err.message });
    }
};

const createSalle = async (req, res) => {
    const { num_salle, batiment, nb_place } = req.body;
    try {
        const newSalle = await addSalle(num_salle, batiment, nb_place);
        res.status(201).json(newSalle);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de l'ajout de la salle", error: err.message });
    }
};

const removeSalle = async (req, res) => {
    const { num_salle, batiment } = req.params;
    try {
        await deleteSalle(num_salle, batiment);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression de la salle", error: err.message });
    }
};

const modifySalle = async (req, res) => {
    const { num_salle, batiment } = req.params;
    const { nb_place } = req.body;
    try {
        const updatedSalle = await updateSalle(num_salle, batiment, nb_place);
        res.status(200).json(updatedSalle);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la modification de la salle", error: err.message });
    }
};

module.exports = { getAllSalles, createSalle, removeSalle, modifySalle };