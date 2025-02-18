function ReviewCard({ review }) {

    return (
        <div className="card review mb-3">
            <div className="card-body">
                <h5 className="card-title fs-4">{review.nome}</h5>
                <p className="card-subtitle fs-6 fw-light text-secondary mb-3">Durata soggiorno: {review.giorni_permanenza}</p>
                <p className="fs-5">{review.commento}</p>
                <p className="card-subtitle fs-6 fw-light text-secondary">{review.data_recensione.split('T')[0]}</p>
            </div>
        </div>
    )
}

export default ReviewCard;