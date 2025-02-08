import React, { useState } from "react";
import usePlanningData from "../hooks/usePlanningData";
import PromoList from "../components/PromotionList";
import PlanningTable from "../components/PlanningTable";
import axios from "axios";

const Planification = () => {
  const { promos, salles, semaines, occupations, fetchData } = usePlanningData();
  const [draggedPromo, setDraggedPromo] = useState(null);
  const [draggedOccupation, setDraggedOccupation] = useState(null);

  // Fonction pour calculer le total des heures d'une promo
  const calculateTotalHours = (nom_promo) => {
    const promoOccupations = occupations.filter((o) => o.nom_promo === nom_promo);
    
    console.log(`Calcul des heures pour ${nom_promo} :`, promoOccupations); // ✅ Vérification
  
    return promoOccupations.reduce((total, o) => total + (o.nbHeures || 0), 0);
  };

  // Détection du début du drag d'une promotion
  const handleDragStartPromo = (promo) => {
    setDraggedPromo(promo);
  };

  // Détection du début du drag d'une occupation existante
  const handleDragStartOccupation = (occupation) => {
    setDraggedOccupation(occupation);
  };

  // Déposer une promotion sur une salle et une semaine
  const handleDrop = async (semaineId, salle) => {
    if (draggedPromo) {
      // Vérification des conflits de salle
      const existingOccupation = occupations.find(
        (o) => o.semaine_id === semaineId && o.num_salle === salle.num_salle
      );

      if (existingOccupation) {
        alert(`❌ La salle ${salle.num_salle} est déjà occupée par ${existingOccupation.nom_promo} !`);
        return;
      }

      try {
        await axios.post("http://localhost:5000/occupations", {
          nom_promo: draggedPromo.nom,
          num_salle: salle.num_salle,
          semaine_id: semaineId,
        });

        fetchData(); // Recharge les données après ajout
        setDraggedPromo(null); // Réinitialisation de la promo déplacée
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'occupation:", error);
      }
    }
  };

  // Supprimer une occupation existante via le drag vers la corbeille
  const handleDropDelete = async () => {
    if (draggedOccupation) {
      try {
        await axios.delete(`http://localhost:5000/occupations/${draggedOccupation.id}`);
        fetchData(); // Mise à jour des données après suppression
        setDraggedOccupation(null);
      } catch (error) {
        console.error("Erreur lors de la suppression de l'occupation:", error);
      }
    }
  };

  return (
    <div className="planning-container">
      {/* Zone de suppression des occupations (corbeille) */}
      <div 
        className="trash-bin"
        onDrop={handleDropDelete}
        onDragOver={(e) => e.preventDefault()}
      >
        🗑️ Glissez ici pour supprimer
      </div>

      {/* Liste des promotions */}
      <PromoList promos={promos} handleDragStart={handleDragStartPromo} calculateTotalHours={calculateTotalHours} />

      {/* Tableau de planning */}
      <PlanningTable 
        semaines={semaines} 
        salles={salles} 
        occupations={occupations} 
        fetchData={fetchData} 
        handleDragStart={handleDragStartOccupation} 
        handleDrop={handleDrop} 
      />
    </div>
  );
};

export default Planification;
