import React from "react";

function HouseCard({ house }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{house.indirizzo_completo}</h5>
        <p>🏡 {house.tipologia}</p>
        <p>🛋️ {house.numero_camere} stanze - 🛏 {house.numero_letti} posti letto - 🛁 {house.numero_bagni} bagni</p>
        <p>📏 {house.metri_quadrati} m²</p>
        <p>❤️ {house.likes} - 📝 {house.recensioni} recensioni</p>
      </div>
    </div>
  );
}

export default HouseCard;
