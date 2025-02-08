import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Planning = () => {
  const [promos, setPromos] = useState([]);
  const [salles, setSalles] = useState([]);
  const [semaines, setSemaines] = useState([]);
  const [occupations, setOccupations] = useState([]);

  // Charger les données initiales
  useEffect(() => {
    fetchPromos();
    fetchSalles();
    fetchSemaines();
    fetchOccupations();
  }, []);

  const fetchPromos = async () => {
    const response = await axios.get('http://localhost:5000/promos');
    setPromos(response.data);
  };

  const fetchSalles = async () => {
    const response = await axios.get('http://localhost:5000/salles');
    setSalles(response.data);
  };

  const fetchSemaines = async () => {
    const response = await axios.get('http://localhost:5000/semaines');
    setSemaines(response.data);
  };

  const fetchOccupations = async () => {
    const response = await axios.get('http://localhost:5000/occupations');
    setOccupations(response.data);
  };

  // Gérer le drag and drop
  const handleDrop = async (semaineId, salleId) => {
    const promo = promos.find(p => p.isDragging);
    if (promo) {
      try {
        await axios.post('http://localhost:5000/occupations', {
          nom_promo: promo.nom,
          num_salle: salleId,
          batiment: 'BâtimentA', // À adapter
          semaine_id: semaineId,
        });
        fetchOccupations();
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'occupation:", error);
      }
    }
  };

  // Calculer le total des heures par promo
  const calculateTotalHours = (nom_promo) => {
    const promoOccupations = occupations.filter(o => o.nom_promo === nom_promo);
    return promoOccupations.reduce((total, o) => total + o.nbHeures, 0);
  };

  return (
    <div className="planning-container">
      <div className="promos-list">
        <h3>Promotions</h3>
        {promos.map(promo => (
          <div
            key={promo.nom}
            className="promo-item"
            draggable
            onDragStart={() => setPromos(promos.map(p => ({ ...p, isDragging: p.nom === promo.nom })))}
          >
            {promo.nom} - Total heures: {calculateTotalHours(promo.nom)}
          </div>
        ))}
      </div>
      <div className="planning-grid">
        <table>
          <thead>
            <tr>
              <th>Semaine</th>
              {salles.map(salle => (
                <th key={`${salle.num_salle}-${salle.batiment}`}>
                  {salle.num_salle} ({salle.batiment})
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {semaines.map(semaine => (
              <tr key={semaine.id}>
                <td>Semaine {semaine.numero} ({semaine.annee})</td>
                {salles.map(salle => (
                  <td
                    key={`${semaine.id}-${salle.num_salle}-${salle.batiment}`}
                    onDrop={() => handleDrop(semaine.id, salle.num_salle)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {occupations
                      .filter(o => o.semaine_id === semaine.id && o.num_salle === salle.num_salle)
                      .map(o => o.nom_promo)
                      .join(', ')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Planning;