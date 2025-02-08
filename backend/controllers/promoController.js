const { getPromos, addPromo, deletePromo, updatePromo } = require('../models/promoModel');

const getAllPromos = async (req, res) => {
    try {
        const promos = await getPromos();
        res.status(200).json(promos);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des promotions", error: err.message });
    }
};

const createPromo = async (req, res) => {
    const { nom, nb_heure, nb_personne } = req.body;
    try {
        const newPromo = await addPromo(nom, nb_heure, nb_personne);
        res.status(201).json(newPromo);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de l'ajout de la promotion", error: err.message });
    }
};

const removePromo = async (req, res) => {
    const { nom } = req.params;
    try {
        await deletePromo(nom);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression de la promotion", error: err.message });
    }
};

const modifyPromo = async (req, res) => {
    const { nom } = req.params;
    const { nb_heure, nb_personne } = req.body;
    try {
        const updatedPromo = await updatePromo(nom, nb_heure, nb_personne);
        res.status(200).json(updatedPromo);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la modification de la promotion", error: err.message });
    }
};

module.exports = { getAllPromos, createPromo, removePromo, modifyPromo };