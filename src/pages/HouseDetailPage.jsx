import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import ContactForm from '../components/ContactForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";


function HouseDetailPage() {
  const apiUrl = import.meta.env.VITE_BACKEND_URL

  const { slug } = useParams() //lo slug è un codice univoco come id, e serve per idendificare un elemento dall'altro, e rende la query più bella e leggibile
  const [annuncements, setAnnuncements] = useState([]);

  const updateLike = () => {
    axios.post(`${apiUrl}/houses/${annuncements.id}/like`).then((resp) => {
      getAnnuncements()
    })
  }

  const addLike = () => {
    const [isLiked, setIsLiked] = useState(false)

    return (
      <FontAwesomeIcon
        icon={isLiked === true ? solidHeart : regularHeart}
        style={{ color: isLiked ? "black" : "black", fontSize: "24px", cursor: "pointer" }}
        onClick={() => {
          setIsLiked(true)
          updateLike()
        }}
      />
    );
  }

  function getAnnuncements() {
    //n'altra chiamata axios pe ave i dati
    axios.get(`${apiUrl}/houses/${slug}`).then((resp) => {
      setAnnuncements(resp.data)
      console.log(resp.data);
    })
  }

  //useEffect quando viene caricata la pagina, esegue il comando impostato
  useEffect(() => {
    getAnnuncements()
  }, [])

  //se ci sono le foto, mette le foto, altrimenti mette il placeholder
  const imgUrl = annuncements.foto && annuncements.foto.length > 0 ? `${apiUrl}/images/${annuncements.foto[0]}` : "https://placehold.co/600x400"
  console.log(annuncements.foto);
  

  return (
    <>
      {/* Sezione dettagli */}
      <section className="py-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fw-bold mb-3">{annuncements.titolo_annuncio}</h1>
          <div className='d-flex'>
            <div className='me-1'>{addLike()}</div>
            <span>{annuncements.likes}</span>
          </div>
        </div>

        {/* Galleria di Immagini */}
        <div className="row g-2">
          <div className="col-md-8">
            <img src={imgUrl} className="img-fluid rounded-3 w-100 h-100 object-fit-cover pb-4" alt="Main" />
          </div>
        </div>
        <div className="col-md-8">
          <h4 className="text mb-4">{annuncements.indirizzo_completo}</h4>
          <h5>Descrizione:</h5>
          <p className="fs-5">{annuncements.descrizione_annuncio}</p>
          <div className="d-flex gap-4">
            <div>
              <strong>Camere:</strong> {annuncements.numero_camere}
            </div>
            <div>
              <strong>Letti:</strong> {annuncements.numero_letti}
            </div>
            <div>
              <strong>Bagni:</strong> {annuncements.numero_bagni}
            </div>
            <div>
              <strong>Recensioni: </strong> {annuncements.review && annuncements.review.length}
            </div>
          </div>
        </div>
      </section>

      {/* Box recensioni */}
      <section className="py-4">
        {
          annuncements.review && (
            <>
              <h2 className="text-center mb-3">Recensioni</h2>
              <div className="row row-cols-1 row-cols-xs-2 row-cols-md-3">
                {
                  annuncements.review.map((curReview) => (
                    <div className="col" key={curReview.id}>
                      <ReviewCard review={curReview} />
                    </div>
                  ))
                }
              </div>
            </>
          )
        }
      </section>

      {/* Aggiungi recensione */}
      <section className="py-4">
        <h2 className="text-center">Aggiungi una Recensione</h2>
        <p className='form-text text-center'>I campi contrassegnati con * sono obbligatori</p>
        <ReviewForm id={annuncements.id} resetAnnuncement={getAnnuncements} />
      </section>

      {/* Comunicazione */}
      <section>
        <h2 className="text-center">Contatta l'host</h2>
        <ContactForm id={annuncements.id}/>
      </section>
    </>
  );
};

export default HouseDetailPage;
