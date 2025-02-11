function CreateHousePage() {
    return (
        <form action="#" method="post" enctype="multipart/form-data">
            <div className="row">
                <div className="mb-3 mt-2">
                    <label htmlFor="titolo">Titolo:</label>
                    <input className="form-control col-3" type="text" id="titolo" name="titolo" placeholder="Esempio: Villa Chiara" required />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="tipologia">Tipologia:</label>
                    <select className="form-control" id="tipologia" name="tipologia" required>
                        <option selected>Seleziona la tipologia</option>
                        <option value="appartamento">Appartamento</option>
                        <option value="casa_indipendente">Casa Indipendente</option>
                        <option value="villa">Villa</option>
                        <option value="villetta_schiera">Villetta a Schiera</option>
                        <option value="chalet">Chalet</option>
                        <option value="baita">Baita</option>
                    </select>
                </div>
                <div className="col-4 mb-3">
                    <label htmlFor="stanze">Numero Stanze:</label>
                    <input className="form-control" type="number" id="stanze" name="stanze" required />
                </div>
                <div className="col-4 mb-3">
                    <label htmlFor="letti">Numero Letti:</label>
                    <input className="form-control" type="number" id="letti" name="letti" required />
                </div>
                <div className="col-4 mb-3">
                    <label htmlFor="bagni">Numero Bagni:</label>
                    <input className="form-control" type="number" id="bagni" name="bagni" required />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="mq">Metri Quadrati:</label>
                    <input className="form-control" type="number" id="mq" name="mq" required />
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="indirizzo">Indirizzo</label>
                    <input className="form-control" type="text" id="indirizzo" name="indirizzo" placeholder="Esempio: Via Roma 33" required />
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="cap">CAP</label>
                    <input className="form-control" type="number" id="cap" name="cap" required />
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="città">Città</label>
                    <input className="form-control" type="text" id="città" name="città" placeholder="Esempio: Milano" required />
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="paese">Paese</label>
                    <input className="form-control" type="text" id="paese" name="paese" placeholder="Esempio: Italia" required />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="email">Email di Riferimento:</label>
                    <input className="form-control" type="email" id="email" name="email" placeholder="Esempio: utente1@mail.com" required />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="immagine">Immagine Immobile:</label>
                    <input className="form-control" type="file" multiple id="immagine" name="immagine" accept="image/*" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="titolo">Descrizione immagine:</label>
                    <input className="form-control col-3" type="text" id="titolo" name="titolo" placeholder="Descrizione foto" required />
                </div>
            </div>
            <div className="text-end">
                <button className="btn btn-success mt-3 mb-3" type="submit">Invia</button>
            </div>

        </form>
    )
};

export default CreateHousePage;