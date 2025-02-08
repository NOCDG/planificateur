const pool = require('../config/db'); // Connexion à la BDD

// Ajouter une occupation
const addOccupation = async (nom_promo, num_salle, batiment, semaine_id) => {
  const query = `
    INSERT INTO occupation (nom_promo, num_salle, batiment, semaine_id)
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;
  const values = [nom_promo, num_salle, batiment, semaine_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Récupérer toutes les occupations
const getOccupations = async () => {
  const query = `SELECT * FROM occupation;`;
  const { rows } = await pool.query(query);
  return rows;
};

// Supprimer une occupation
const deleteOccupation = async (id) => {
  const query = `DELETE FROM occupation WHERE id = $1;`;
  await pool.query(query, [id]);
};

module.exports = { addOccupation, getOccupations, deleteOccupation };
