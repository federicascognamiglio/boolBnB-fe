function ReviewForm(){
    return(
        <>
        <div class="container mt-5">
        <h2 className="text-center">Aggiungi una Recensione</h2>
        <form>
            <div class="mb-3">
                <label for="username" class="form-label">Nome Utente</label>
                <input type="text" class="form-control" id="username" placeholder="Inserisci il tuo nome" required />
            </div>
            <div class="mb-3">
                <label for="comment" class="form-label">Recensione</label>
                <textarea class="form-control" id="comment" rows="4" placeholder="Scrivi la tua recensione" required></textarea>
            </div>
            <div className="text-end"><button type="submit" class="btn btn-success">Invia</button></div>
        </form>
    </div>
        </>
    )
}

export default ReviewForm;