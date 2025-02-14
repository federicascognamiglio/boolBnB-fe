import React from "react";
import axios from "axios";
import { useState, useEffect } from "react"
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";


function HouseCard({ house, page, url, resetAnnuncements }) {
    const imgUrl = house.foto && house.foto.length > 0 ? `${url}/images/${house.foto[0]}` : "https://placehold.co/600x400"
    const navigate = useNavigate()

    const updateLike = () => {
        axios.post(`${url}/houses/${house.id}/like`).then((resp) => {
            resetAnnuncements()
        })
    }

    const addLike = () => {
        const [isLiked, setIsLiked] = useState(false)

        return (
            <FontAwesomeIcon
                icon={isLiked === true ? solidHeart : regularHeart}
                style={{ color: isLiked ? "white" : "white", fontSize: "24px", cursor: "pointer" }}
                onClick={() => {
                    setIsLiked(true)
                    updateLike()
                }}
            />
        );
    }

    return (
        <div className="card position-relative h-100" style={{cursor: "pointer"}} onClick={() => navigate(`/detail/${house.slug}`)}>
            <div className="position-absolute top-0 end-0 mt-2 me-2">{addLike()}</div>
            <img src={imgUrl} className="card-img-top" alt={`Immagine ${house.titolo_annuncio}`} />
            <div className="card-body">
                <h5 className="card-title">{house.titolo_annuncio}</h5>
                <span className="badge text-bg-primary mb-3">🏡 {house.tipologia}</span>
                <p className="card-text">{house.indirizzo_completo}</p>
                <p>❤️ {house.likes}</p>
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
        </div>
    );
}

export default HouseCard;
