import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HouseCard from "../components/HouseCard";

function SearchPage() {
  const apiUrl = import.meta.env.VITE_BACKEND_URL
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialSearch = queryParams.get("indirizzo_completo") || ""

  const defaultFormValue = {
    indirizzo_completo: initialSearch,
    numero_camere: "",
    numero_letti: "",
    tipologia: ""
  }

  // const navigation = useNavigation();
  const [formValue, setFormValue] = useState(defaultFormValue)
  const [annuncements, setAnnuncements] = useState([])

  function handleInputChange(event) {
    //assegno ad una variabile il nome del tag su cui  avvenuto un evento
    const keyToChange = event.target.name
    //assegno ad una variabile il valore del tag su cui è avvenuto l'evento
    const valueToChange = event.target.value
    //prendo i nuovi valori e li inserisco nell'oggetto, in corrispondenza delle rispettive chiavi
    const newFormValue = {
      ...formValue, //seziono l'oggetto chiave per chiave
      [keyToChange]: valueToChange //per ogni chiave
    }
    setFormValue(newFormValue) //aggiorno l'oggetto con i nuovi valori
  }

  function getAnnuncements() { //funzione di ricerca avanzata
    const params = {} //è l'oggetto valorizzato dall'input dell'utente in base alla ricerca che vuole fare

    if (formValue.indirizzo_completo.length > 0) {
      params.indirizzo_completo = formValue.indirizzo_completo; // citta: milano
    }
    if (formValue.numero_camere.length > 0) {
      params.numero_camere = formValue.numero_camere; // minstanze: 2
    }
    if (formValue.numero_letti.length > 0) {
      params.numero_letti = formValue.numero_letti;
    }
    if (formValue.tipologia.length > 0) {
      params.tipologia = formValue.tipologia;
    }

    // Bisogna passare le chiavi dinamiche all'indirizzo Url nei Params
    const queryString = new URLSearchParams(params).toString() //concatenare i parametri di ricerca nella query
    //la chiamata api che non salva nessun dato, ma chiede solo i dati all'api
    axios.get(`${apiUrl}/houses?${queryString}`).then((resp) => {
      setAnnuncements(resp.data.data)
    })
  }

  useEffect(() => {
    getAnnuncements()
  }, [formValue])

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
              placeholder="Cerca destinazione"
              name="indirizzo_completo"
              value={formValue.indirizzo_completo}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="Quante camere"
              name="numero_camere"
              value={formValue.numero_camere}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="Quanti letti"
              name="numero_letti"
              value={formValue.numero_letti}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              name="tipologia"
              id="tipologia"
              value={formValue.tipologia}
              onChange={handleInputChange}
            >
              <option value="">Seleziona tipologia</option>
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
          formValue !== "" && (
            <h5 className="mb-3">
              <p>Risultato ricerca: {annuncements.length} {annuncements.length && annuncements.length === 1 ? " struttura trovata" : " strutture trovate"}</p>
            </h5>
          )
        }
        {annuncements &&
          annuncements.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {
              annuncements.map((curAnnuncement) => (
                <div key={curAnnuncement.id} className="col">
                  <HouseCard house={curAnnuncement} page="SearchPage" url={apiUrl} resetAnnuncements={getAnnuncements} />
                </div>
              ))
            }
          </div>
        ) : (
          <div className="alert alert-danger">Nessun annuncio trovato</div>
        )
        }
      </section>
    </>
  );
}

export default SearchPage;
