import React, { useState } from "react";
import HouseCard from "../components/HouseCard";
import axios from "axios";

function SearchPage() {
  const [city, setCity] = useState("");
  const [minRooms, setMinRooms] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [results, setResults] = useState([]);

  const searchHouses = async () => {
    try {
      // Chiamata al backend per recuperare gli immobili
      const response = await axios.get("http://localhost:3000/api/annunci", {
        params: { city, minRooms, minBeds, propertyType },
      });

      // Mappiamo gli immobili ottenuti dal database
      const houses = response.data.map((house) => ({
        id: house.id,
        indirizzo_completo: house.indirizzo_completo,
        tipologia: house.tipologia,
        numero_camere: house.numero_camere,
        numero_letti: house.numero_letti,
        numero_bagni: house.numero_bagni,
        metri_quadrati: house.metri_quadrati,
        likes: house.likes || 0, // Se il valore è NULL, assegniamo 0
        recensioni: house.recensioni_count || 0, // Il backend deve fornire questo valore
      }));

      // Ordiniamo gli immobili per numero di likes (gradimento)
      const sortedResults = houses.sort((a, b) => b.likes - a.likes);
      setResults(sortedResults);
    } catch (error) {
      console.error("Errore durante la ricerca:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Cerca un immobile</h2>

      <div className="row g-3">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Città o indirizzo"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min. stanze"
            value={minRooms}
            onChange={(e) => setMinRooms(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min. posti letto"
            value={minBeds}
            onChange={(e) => setMinBeds(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Seleziona tipologia</option>
            <option value="Appartamento">Appartamento</option>
            <option value="Villa">Villa</option>
            <option value="Monolocale">Monolocale</option>
            <option value="Casa Indipendente">Casa Indipendente</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={searchHouses}>
            Cerca
          </button>
        </div>
      </div>

      <div className="row mt-4">
        {results.length > 0 ? (
          results.map((house) => (
            <div className="col-md-4 mb-3" key={house.id}>
              <HouseCard house={house} />
            </div>
          ))
        ) : (
          <p className="mt-3 text-center">Nessun immobile trovato.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
