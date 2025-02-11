import React, { useState, useEffect } from "react";
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
      // Esempio di API Mock per test
      const response = await axios.get("http://localhost:3000", { params: { city, minRooms, minBeds, propertyType } });

      // Simuliamo immobili casuali basandoci su JSONPlaceholder
      const houses = response.data.map((post, index) => ({
        id: post.id,
        address: `Via ${post.title}, Città Fittizia`,
        rooms: Math.floor(Math.random() * 5) + 1,
        bathrooms: Math.floor(Math.random() * 3) + 1,
        squareMeters: Math.floor(Math.random() * 200) + 50,
        likes: Math.floor(Math.random() * 100),
        reviews: Math.floor(Math.random() * 30),
        propertyType: ["Appartamento", "Villa", "Monolocale", "Casa Indipendente"][index % 4],
      }));

      // Filtriamo i risultati
      const filteredHouses = houses.filter((house) =>
        (!city || house.address.toLowerCase().includes(city.toLowerCase())) &&
        (!minRooms || house.rooms >= minRooms) &&
        (!minBeds || house.beds >= minBeds) &&
        (!propertyType || house.propertyType === propertyType)
      );

      // Ordiniamo per numero di cuoricini
      const sortedResults = filteredHouses.sort((a, b) => b.likes - a.likes);
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
          <input type="text" className="form-control" placeholder="Città o indirizzo" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" placeholder="Min. stanze" value={minRooms} onChange={(e) => setMinRooms(e.target.value)} />
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" placeholder="Min. posti letto" value={minBeds} onChange={(e) => setMinBeds(e.target.value)} />
        </div>
        <div className="col-md-3">
          <select className="form-control" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="">Seleziona tipologia</option>
            <option value="Appartamento">Appartamento</option>
            <option value="Villa">Villa</option>
            <option value="Monolocale">Monolocale</option>
            <option value="Casa Indipendente">Casa Indipendente</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={searchHouses}>Cerca</button>
        </div>
      </div>

      <div className="row mt-4">
        {results.length > 0 ? results.map((house) => (
          <div className="col-md-4 mb-3" key={house.id}>
            <HouseCard house={house} />
          </div>
        )) : <p className="mt-3 text-center">Nessun immobile trovato.</p>}
      </div>
    </div>
  );
}

export default SearchPage;
