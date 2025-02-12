import HouseCard from "../components/HouseCard"
import { useState, useEffect } from "react"
import axios from "axios"

function HomePage() {
    // Dati
    const apiUrl = import.meta.env.VITE_BACKEND_URL
    const [annuncements, setAnnuncements] = useState([])

    // Richiesta API
    const getAnnuncements = () => {
        axios.get(`${apiUrl}/houses`).then((resp) => {
            setAnnuncements(resp.data.data)
        })
    }

    useEffect(() => {
        getAnnuncements()
    }, [])

    return (
        <>
            <h1>Benvenuto nella homepage</h1>
            {/* sezione input */}
            <section>

            </section>

            {/* sezione cards */}
            <section className="py-3">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {
                        annuncements.map((curAnnuncement) => (
                            <div key={curAnnuncement.id} className="col">
                                <HouseCard house={curAnnuncement} page="HomePage" />
                            </div>
                        ))
                    }
                </div>
                {/* <HouseCard /> */}
            </section>
        </>
    )
}

export default HomePage;