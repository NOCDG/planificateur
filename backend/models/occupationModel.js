const pool = require('../config/db');

const getOccupations = async () => {
    const res = await pool.query('SELECT * FROM Occupation');
    return res.rows;
};

const addOccupation = async (nom_promo, num_salle, batiment, semaine_id) => {
    const res = await pool.query(
        'INSERT INTO Occupation (nom_promo, num_salle, batiment, semaine_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [nom_promo, num_salle, batiment, semaine_id]
    );
    return res.rows[0];
};

const deleteOccupation = async (id) => {
    await pool.query('DELETE FROM Occupation WHERE id = $1', [id]);
};

const updateOccupation = async (id, nom_promo, num_salle, batiment, semaine_id) => {
    const res = await pool.query(
        'UPDATE Occupation SET nom_promo = $2, num_salle = $3, batiment = $4, semaine_id = $5 WHERE id = $1 RETURNING *',
        [id, nom_promo, num_salle, batiment, semaine_id]
    );
    return res.rows[0];
};

module.exports = { getOccupations, addOccupation, deleteOccupation, updateOccupation };