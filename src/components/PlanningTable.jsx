import React from "react";

const PlanningTable = ({ semaines, salles, occupations, handleDrop, handleDragStart }) => {
    return (
      <div className="planning-grid">
        <table>
          <thead>
            <tr>
              <th>Semaine</th>
              {salles.map((salle) => (
                <th key={salle.num_salle}>{salle.num_salle}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {semaines.map((semaine) => (
              <tr key={semaine.id}>
                <td>Semaine {semaine.numero} ({semaine.annee})</td>
                {salles.map((salle) => (
                  <td
                    key={`${semaine.id}-${salle.num_salle}`}
                    onDrop={() => handleDrop(semaine.id, salle)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {occupations
                      .filter((o) => o.semaine_id === semaine.id && o.num_salle === salle.num_salle)
                      .map((o) => (
                        <div
                          key={o.id}
                          className="occupation-item"
                          draggable
                          onDragStart={() => handleDragStart(o)}
                        >
                          {o.nom_promo}
                        </div>
                      ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default PlanningTable;
