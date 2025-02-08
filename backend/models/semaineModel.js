const pool = require('../config/db');

const getSemaines = async () => {
    const res = await pool.query('SELECT * FROM Semaine');
    return res.rows;
};

const addSemaine = async (numero, annee, nbheures) => {
    const res = await pool.query(
      'INSERT INTO Semaine (numero, annee, nbheures) VALUES ($1, $2, $3) RETURNING *',
      [numero, annee, nbheures]
    );
    return res.rows[0];
  };

const deleteSemaine = async (id) => {
    await pool.query('DELETE FROM Semaine WHERE id = $1', [id]);
};

const updateSemaine = async (id, numero, annee, nbHeures) => {
    const res = await pool.query(
        'UPDATE Semaine SET numero = $2, annee = $3, nbHeures = $4 WHERE id = $1 RETURNING *',
        [id, numero, annee, nbHeures]
    );
    return res.rows[0];
};

module.exports = { getSemaines, addSemaine, deleteSemaine, updateSemaine };