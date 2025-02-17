import HouseCard from "../components/HouseCard"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"

function HomePage() {
    // Dati
    const apiUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    // Variabili di stato
    const [annuncements, setAnnuncements] = useState([])
    const [search, setSearch] = useState("")

    // Richiesta API
    const getAnnuncements = () => {
        const params = {}

        if (search.length > 0) {
            params.indirizzo_completo = search
        }

        axios.get(`${apiUrl}/houses`, { params }).then((resp) => {
            setAnnuncements(resp.data.data)
        })
    }

    // Invio ricerca con tasto invio
    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            navigate(`/search?indirizzo_completo=${encodeURIComponent(search)}`);
        }
    }

    useEffect(() => {
        getAnnuncements()
    }, [])

    return (
        <>
            <h1 className="mb-4">Appartamenti in affitto</h1>
            {/* Barra di ricerca semplice */}
            <section className="py-3">
                <div className="d-flex justify-content-between">
                    <input
                        type="search"
                        value={search}
                        className="form-control me-2"
                        placeholder="Dove vuoi andare..."
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyUp={handleKeyUp}
                    />
                    <button className="btn btn-light" onClick={() => { navigate(`/search?indirizzo_completo=${encodeURIComponent(search)}`); }}>Cerca</button>
                </div>
            </section>

            {/* Lista annunci */}
            <section className="py-3">
                <h4 className="mb-3">I più amati</h4>
                {annuncements &&
                    annuncements.length > 0 ? (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {
                            annuncements.map((curAnnuncement) => (
                                <div key={curAnnuncement.id} className="col">
                                    <HouseCard house={curAnnuncement} page="HomePage" url={apiUrl} resetAnnuncements={getAnnuncements} />
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
    )
}

export default HomePage;