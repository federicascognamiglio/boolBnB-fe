import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";

function HouseDetailPage() {
    return (
        <>
            <div className="container">
                <h1 className="text-center">Dettagli Annuncio</h1>
                <p>QUI CI VA LA CARD DETTAGLIO DELL'ANNUNCIO!</p>
                <ReviewForm />
                <h1 className="text-center mb-5 mt-3">Recensioni degli utenti</h1>
                <ReviewCard />
            </div>
        </>)
}

export default HouseDetailPage;