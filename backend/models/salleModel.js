const pool = require('../config/db');

const getSalles = async () => {
    const res = await pool.query('SELECT * FROM Salle');
    return res.rows;
};

const addSalle = async (num_salle, batiment, nb_place) => {
    const res = await pool.query(
        'INSERT INTO Salle (num_salle, batiment, nb_place) VALUES ($1, $2, $3) RETURNING *',
        [num_salle, batiment, nb_place]
    );
    return res.rows[0];
};

const deleteSalle = async (num_salle, batiment) => {
    await pool.query('DELETE FROM Salle WHERE num_salle = $1 AND batiment = $2', [num_salle, batiment]);
};

const updateSalle = async (num_salle, batiment, nb_place) => {
    const res = await pool.query(
        'UPDATE Salle SET nb_place = $3 WHERE num_salle = $1 AND batiment = $2 RETURNING *',
        [num_salle, batiment, nb_place]
    );
    return res.rows[0];
};

module.exports = { getSalles, addSalle, deleteSalle, updateSalle };