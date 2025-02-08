const { getSemaines, addSemaine, deleteSemaine, updateSemaine } = require('../models/semaineModel');

const getAllSemaines = async (req, res) => {
    try {
        const semaines = await getSemaines();
        res.status(200).json(semaines);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des semaines", error: err.message });
    }
};

const createSemaine = async (req, res) => {
    const { numero, annee, nbHeures } = req.body;
    try {
        const newSemaine = await addSemaine(numero, annee, nbHeures);
        res.status(201).json(newSemaine);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de l'ajout de la semaine", error: err.message });
    }
};

const removeSemaine = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteSemaine(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression de la semaine", error: err.message });
    }
};

const modifySemaine = async (req, res) => {
    const { id } = req.params;
    const { numero, annee, nbHeures } = req.body;
    try {
        const updatedSemaine = await updateSemaine(id, numero, annee, nbHeures);
        res.status(200).json(updatedSemaine);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la modification de la semaine", error: err.message });
    }
};

module.exports = { getAllSemaines, createSemaine, removeSemaine, modifySemaine };