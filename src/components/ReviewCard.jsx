function ReviewCard({ review }) {

    return (
        <div className="card review mb-3">
            <div className="card-body">
                <h5 className="card-title">{review.nome}</h5>
                <p className="card-text">{review.commento}</p>
                <p>{review.giorni_permanenza}</p>
                <p>{review.data_recensione.split('T')[0]}</p>
            </div>
        </div>
    )
}

export default ReviewCard;