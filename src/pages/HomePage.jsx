import HouseCard from "../components/HouseCard"
import { useState, useEffect } from "react"
// import { useNavigation } from '@react-navigation/native';
import axios from "axios"

function HomePage() {
    // Dati
    const apiUrl = import.meta.env.VITE_BACKEND_URL

    // const navigation = useNavigation();

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
                        className="form-control"
                        placeholder="Dove vuoi andare..."
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <button 
                    className="btn btn-light" 
                    onClick={getAnnuncements}>
                        Search
                    </button>
                    {/* () => {  navigation.navigate('/search', {
                        initialParam: search
                      });} */}
                </div>
            </section>

            {/* Lista annunci */}
            <section className="py-3">
                {
                    annuncements.length > 0 ? (
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {
                                annuncements.map((curAnnuncement) => (
                                    <div key={curAnnuncement.id} className="col">
                                        <HouseCard house={curAnnuncement} page="HomePage" url={apiUrl} />
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div className="alert alert-danger">Nessun annuncio trovato</div>
                    )
                }

                {/* <HouseCard /> */}
            </section>
        </>
    )
}

export default HomePage;