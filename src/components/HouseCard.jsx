import React from "react";
import { Link, NavLink } from "react-router-dom";

function HouseCard({ house, page, url }) {

    const imgUrl = house.foto && house.foto.length > 0 ? `${url}/images/${house.foto[0]}` : "https://placehold.co/600x400"
    
    return (
        <div className="card h-100">
            <img src={imgUrl} className="card-img-top" alt={`Immagine ${house.titolo_annuncio}`} />
            <div className="card-body">
                <h5 className="card-title">{house.titolo_annuncio}</h5>
                <span className="badge text-bg-primary mb-3">🏡 {house.tipologia}</span>
                <p className="card-text">{house.indirizzo_completo}</p>
                {
                    page === "SearchPage" && (
                        <>
                            <p>🛋️ {house.numero_camere} stanze - 🛏 {house.numero_letti} posti letto - 🛁 {house.numero_bagni} bagni</p>
                            <p>📏 {house.metri_quadrati} m²</p>
                            <p>❤️ {house.likes} - 📝 {house.num_recensioni} recensioni</p>
                        </>
                    )
                }
                <Link to={`/detail/${house.slug}`} className="btn btn-success">
                    Dettagli
                </Link>
            </div>
        </div >
    );
}

export default HouseCard;
