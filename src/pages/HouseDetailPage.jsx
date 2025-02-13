import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";


function HouseDetailPage() {
  const apiUrl = import.meta.env.VITE_BACKEND_URL

  const { slug } = useParams()
  const [annuncements, setAnnuncements] = useState([]);


  function getAnnuncements() {
    axios.get(`${apiUrl}/houses/${slug}`).then((resp) => {
      setAnnuncements(resp.data)
    })
  }


  useEffect(() => {
    getAnnuncements()
  }, [])

  const imgUrl = annuncements.foto && annuncements.foto.length > 0 ? `${apiUrl}/images/${annuncements.foto[0]}` : "https://placehold.co/600x400"


  return (
    <>
      {/* Sezione dettagli */}
      <section className="py-4">
        {/* Titolo e Posizione */}
        <h1 className="fw-bold mb-1">{annuncements.titolo_annuncio}</h1>
        <p className="text-muted">{annuncements.indirizzo_completo}</p>

        {/* Galleria di Immagini */}
        <div className="row g-2">
          <div className="col-md-8">
            <img src={imgUrl} className="img-fluid rounded-3 w-100 h-100 object-fit-cover" alt="Main" />
          </div>
          {/* <div className="col-md-4 d-flex flex-column gap-2"></div>
          {annuncements.altre_foto?.slice(0, 4).map((foto, index) => (
            <img key={index} src={foto} className="img-fluid rounded-3" alt={`Foto ${index + 1}`} />
          ))} */}
        </div>
      </section>

      {/* Info e Prenotazione */}
      <section className="py-4">
        <div className="col-md-8">
          <h4 className="fw-bold">Informazioni sull'alloggio</h4>
          <p className="fs-5">{annuncements.descrizione_annuncio}</p>
          <div className="d-flex gap-4 my-3">
            <div>
              <strong>Ospiti:</strong> {annuncements.numero_ospiti}
            </div>
            <div>
              <strong>Camere:</strong> {annuncements.numero_camere}
            </div>
            <div>
              <strong>Letti:</strong> {annuncements.numero_letti}
            </div>
            <div>
              <strong>Bagni:</strong> {annuncements.numero_bagni}
            </div>
          </div>
        </div>
      </section>

      {/* Box recensioni */}
      <section className="py-4">
        {
          annuncements.review && (
            <>
              <h2 className="text-center">Recensioni</h2>
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
        <ReviewForm id={annuncements.id} resetAnnuncement={getAnnuncements} />
      </section>
    </>
  );
};

export default HouseDetailPage;
