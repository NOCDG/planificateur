const pool = require('../config/db');

const getPromos = async () => {
    const res = await pool.query('SELECT * FROM Promo');
    return res.rows;
};

const addPromo = async (nom, nb_heure, nb_personne) => {
    const res = await pool.query(
        'INSERT INTO Promo (nom, nb_heure, nb_personne) VALUES ($1, $2, $3) RETURNING *',
        [nom, nb_heure, nb_personne]
    );
    return res.rows[0];
};

const deletePromo = async (nom) => {
    await pool.query('DELETE FROM Promo WHERE nom = $1', [nom]);
};

const updatePromo = async (nom, nb_heure, nb_personne) => {
    const res = await pool.query(
        'UPDATE Promo SET nb_heure = $2, nb_personne = $3 WHERE nom = $1 RETURNING *',
        [nom, nb_heure, nb_personne]
    );
    return res.rows[0];
};

module.exports = { getPromos, addPromo, deletePromo, updatePromo };