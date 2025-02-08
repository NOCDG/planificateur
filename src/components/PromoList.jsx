import React from "react";

const PromoList = ({ promos, handleDragStart, calculateTotalHours }) => {
  return (
    <div className="promos-list">
      <h3>Promotions</h3>
      {promos.map((promo) => (
        <div
          key={promo.nom}
          className="promo-item"
          draggable
          onDragStart={() => handleDragStart(promo)}
        >
          {promo.nom} - Total heures: {calculateTotalHours(promo.nom)}
        </div>
      ))}
    </div>
  );
};

export default PromoList;
