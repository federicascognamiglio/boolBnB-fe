import React from 'react';
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import HouseCard from '../components/HouseCard';

function HouseDetailPage()  {
  return (
    <div className="container mt-4">
      {/* Titolo e Posizione */}
      <h1 className="fw-bold mb-1">{house.titolo_annuncio}</h1>
      <p className="text-muted">{house.indirizzo_completo}</p>

      {/* Galleria di Immagini */}
      <div className="row g-2">
        <div className="col-md-8">
          <img src={house.url_foto} className="img-fluid rounded-3 w-100 h-100 object-fit-cover" alt="Main" />
        </div>
        <div className="col-md-4 d-flex flex-column gap-2">
          {house.altre_foto?.slice(0, 4).map((foto, index) => (
            <img key={index} src={foto} className="img-fluid rounded-3" alt={`Foto ${index + 1}`} />
          ))}
        </div>
      </div>

      {/* Info Dettagliate e Prenotazione */}
      <div className="row mt-4">
        <div className="col-md-8">
          <h4 className="fw-bold">Informazioni sull'alloggio</h4>
          <p className="fs-5">{house.descrizione_annuncio}</p>

          <div className="d-flex gap-4 my-3">
            <div>
              <strong>Ospiti:</strong> {house.numero_ospiti}
            </div>
            <div>
              <strong>Camere:</strong> {house.numero_camere}
            </div>
            <div>
              <strong>Letti:</strong> {house.numero_letti}
            </div>
            <div>
              <strong>Bagni:</strong> {house.numero_bagni}
            </div>
          </div>

          <hr />

          {/* Sezione Recensioni */}
		  <ReviewForm />
		  <h1 className="text-center mb-5 mt-3">Recensioni degli utenti</h1>
		  <ReviewCard /> 
        </div>

        
      </div>
    </div>
  );
};

export default HouseDetailPage;
