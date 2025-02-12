import React from "react";

function HouseCard({ house, page }) {
  return (
        <div className="card">
            <img src="" class="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{house.titolo_annuncio}</h5>
                <p className="card-text">{house.indirizzo_completo}</p>
                {
                    page === "SearchPage" && (
                        <>
                            <p>🏡 {house.tipologia}</p>
                            <p>🛋️ {house.numero_camere} stanze - 🛏 {house.numero_letti} posti letto - 🛁 {house.numero_bagni} bagni</p>
                            <p>📏 {house.metri_quadrati} m²</p>
                            <p>❤️ {house.likes} - 📝 {house.num_recensioni} recensioni</p>
                        </>
                    )
                }
            </div>
        </div >
    );
}

export default HouseCard;
