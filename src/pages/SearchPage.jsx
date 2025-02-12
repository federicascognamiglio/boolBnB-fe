import React, { useState } from "react";
import HouseCard from "../components/HouseCard";
import axios from "axios";

function SearchPage() {
  const apiUrl = import.meta.env.VITE_BACKEND_URL

  const defaultFormValue = {
    city: "",
    minRooms: "",
    minBeds: "",
    propertyType: "",
  }

  const [formValue, setFormValue] = useState(defaultFormValue)
  const [annuncements, setAnnuncements] = useState([]);

  function handleInputChange(event) {
    const keyToChange = event.target.name
    const valueToChange = event.target.value

    const newFormValue = {
      ...formValue,
      [keyToChange]: valueToChange
    }
    setFormValue(newFormValue)
  }

  function getAnnuncements() {
    const params = {
      indirizzo_completo: ""
    }

    if (formValue.city.length > 0) {
      params.indirizzo_completo = formValue.city
    }

    // Bisogna passare le chiavi dinamiche all'indirizzo Url nei Params
    let indirizzo = "indirizzo_completo"
    let valore = "Milano"

    axios.get(`${apiUrl}/houses${params && `?${indirizzo}=${formValue.city}`}`).then((resp) => {
      console.log(resp)
      setAnnuncements(resp.data.data)
    })
  }

  return (
    <>
      {/* Titolo */}
      <h2 className="mb-3">La tua ricerca</h2>

      {/* Barra ricerca avanzata */}
      <section className="py-3">
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Città o indirizzo"
              name="city"
              value={formValue.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Min. stanze"
              name="minRooms"
              value={formValue.minRooms}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Min. posti letto"
              name="minBeds"
              value={formValue.minBeds}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              name="propertyType"
              id="propertyType"
              value={formValue.propertyType}
              onChange={handleInputChange}
            >
              <option>Seleziona tipologia</option>
              <option value="Appartamento">Appartamento</option>
              <option value="Villa">Villa</option>
              <option value="Casa Indipendente">Casa Indipendente</option>
              <option value="Chalet">Monolocale</option>
            </select>
          </div>
          <div className="col-md-2">
            <button
              type="search"
              className="btn btn-primary"
              onClick={getAnnuncements}
            >
              Cerca
            </button>
          </div>
        </div>
      </section>

      {/* Lista annunci */}
      <section className="py-3">
        {
          annuncements.map((curAnnuncement) => (
            <div key={curAnnuncement.id} className="col">
              <HouseCard house={curAnnuncement} page="SearchPage" url={apiUrl} />
            </div>
          ))
        }
      </section>
    </>
  );
}

export default SearchPage;
