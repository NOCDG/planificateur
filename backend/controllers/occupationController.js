const { getOccupations, addOccupation, deleteOccupation, updateOccupation } = require('../models/occupationModel');

const getAllOccupations = async (req, res) => {
    try {
        const occupations = await getOccupations();
        res.status(200).json(occupations);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des occupations", error: err.message });
    }
};

const createOccupation = async (req, res) => {
    const { nom_promo, num_salle, batiment, semaine_id } = req.body;
    try {
        const newOccupation = await addOccupation(nom_promo, num_salle, batiment, semaine_id);
        res.status(201).json(newOccupation);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de l'ajout de l'occupation", error: err.message });
    }
};

const removeOccupation = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteOccupation(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'occupation", error: err.message });
    }
};

const modifyOccupation = async (req, res) => {
    const { id } = req.params;
    const { nom_promo, num_salle, batiment, semaine_id } = req.body;
    try {
        const updatedOccupation = await updateOccupation(id, nom_promo, num_salle, batiment, semaine_id);
        res.status(200).json(updatedOccupation);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la modification de l'occupation", error: err.message });
    }
};

module.exports = { getAllOccupations, createOccupation, removeOccupation, modifyOccupation };