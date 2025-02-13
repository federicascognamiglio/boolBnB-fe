import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"

function CreateHousePage() {
    const apiUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const defaultFormValue = {
        titolo_annuncio: "",
        descrizione_annuncio: "",
        tipologia: "",
        numero_camere: "",
        numero_letti: "",
        numero_bagni: "",
        metri_quadrati: "",
        indirizzo: "",
        cap: "",
        citta: "",
        paese: "",
        email_proprietario: "",
        stato_annuncio: "attivo",
        foto: "",
        descrizione_immagine: ""
    };

    const [errors, setErrors] = useState({})
    const [formValue, setFormValue] = useState(defaultFormValue);

    const validateForm = () => {
        let newErrors = {}

        // Titolo
        if (!formValue.titolo_annuncio || formValue.titolo_annuncio.length > 50) {
            newErrors.titolo_annuncio = "Il titolo deve avere massimo 50 caratteri"
        }
        // Descrizione annuncio
        if (!formValue.descrizione_annuncio || formValue.descrizione_annuncio.length < 20) {
            newErrors.descrizione_annuncio = "La descrizione deve avere un minimo di 20 caratteri"
        }
        // Numero di stanze, letti, bagni
        if (!formValue.numero_camere || formValue.numero_camere <= 0 || formValue.numero_camere > 50) {
            newErrors.numero_camere = "Il numero di camere deve essere tra 1 e 50";
        }
        if (!formValue.numero_letti || formValue.numero_letti <= 0 || formValue.numero_letti > 50) {
            newErrors.numero_letti = "Il numero di letti deve essere tra 1 e 50";
        }
        if (!formValue.numero_bagni || formValue.numero_bagni <= 0 || formValue.numero_bagni > 20) {
            newErrors.numero_bagni = "Il numero di bagni deve essere tra 1 e 20";
        }
        // Metri quadrati
        if (!formValue.metri_quadrati || formValue.metri_quadrati <= 0 || formValue.metri_quadrati > 10000) {
            newErrors.metri_quadrati = "I metri quadrati devono essere tra 1 e 10.000";
        }
        // Indirizzo e CAP
        if (!formValue.indirizzo || formValue.indirizzo.trim().length < 5) {
            newErrors.indirizzo = "L'indirizzo deve essere valido e con almeno 5 caratteri";
        }
        if (!formValue.cap || !/^\d{5}$/.test(formValue.cap)) {
            newErrors.cap = "Il CAP deve essere un numero di 5 cifre";
        }
        // Citta e Paese
        if (!formValue.citta) {
            newErrors.citta = "La città è obbligatoria";
        }
        if (!formValue.paese) {
            newErrors.paese = "Il paese è obbligatorio";
        }
        // Email
        if (!formValue.email_proprietario || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValue.email_proprietario)) {
            newErrors.email_proprietario = "L'email non è valida";
        }
        // Descrizione immagine
        if (formValue.descrizione_immagine && formValue.descrizione_immagine.length > 250) {
            newErrors.descrizione_immagine = "La descrizione dell'immagine non può superare 250 caratteri";
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    }

    function handleInputChange(event) {
        console.log(event);

        const { name, value, files } = event.target;

        setFormValue(prevFormValue => ({
            ...prevFormValue,
            [name]: name === "foto" ? files[0] : value
        }));
        console.log("Foto caricata:", files[0]);

    }

    function handleFormSubmit(event) {
        event.preventDefault()
        console.log(formValue);

        if (!validateForm()) {
            return
        }

        const formData = new FormData()

        for (let key in formValue) {
            if (key === "foto" && formValue.foto instanceof File) {
                formData.append("foto", formValue.foto);
            } else if (formValue[key] !== undefined && formValue[key] !== null) {
                formData.append(key, formValue[key]);
            }
        }

        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        axios.post(`${apiUrl}/houses`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((resp) => {
            setFormValue(defaultFormValue)
            navigate("/")
        }).catch((error) => {
            console.error("Errore durante l'invio del form:", error);
        });
    }

    return (
        <>
            <h2>Aggiungi un nuovo annuncio</h2>
            <p>I campi contrassegnati con * sono obbligatori</p>
            <form className="py-4" onSubmit={handleFormSubmit}>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    <div className="mb-3 mt-2">
                        <label htmlFor="titolo">Titolo *</label>
                        <input className="form-control col-3" type="text" id="titolo" name="titolo_annuncio" value={formValue.titolo_annuncio} onChange={handleInputChange} placeholder="Esempio: Villa Chiara" required />
                        <div id="titolo_annuncio" className="form-text">
                            Il titolo deve avere un massimo di 50 caratteri.
                        </div>
                        {errors.titolo_annuncio && <div className="text-danger">{errors.titolo_annuncio}</div>}
                    </div>
                    <div className="mb-3 mt-2">
                        <label htmlFor="titolo">Descrizione annuncio *</label>
                        <textarea className="form-control col-3" id="titolo" name="descrizione_annuncio" value={formValue.descrizione_annuncio} onChange={handleInputChange} placeholder="Esempio: Villa Chiara" required ></textarea>
                        <div id="titolo_annuncio" className="form-text">
                            La descrizione deve avere un minimo di 20 caratteri.
                        </div>
                        {errors.descrizione_annuncio && <div className="text-danger">{errors.descrizione_annuncio}</div>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="tipologia">Tipologia *</label>
                        <select className="form-control" id="tipologia" name="tipologia" value={formValue.tipologia} onChange={handleInputChange}>
                            <option defaultValue="Seleziona la tipologia">Seleziona la tipologia</option>
                            <option value="appartamento">Appartamento</option>
                            <option value="casa_indipendente">Casa Indipendente</option>
                            <option value="villa">Villa</option>
                            <option value="villetta_schiera">Villetta a Schiera</option>
                            <option value="chalet">Chalet</option>
                            <option value="baita">Baita</option>
                        </select>
                    </div>
                    <div className="col-4 mb-3">
                        <label htmlFor="stanze">Numero Stanze *</label>
                        <input className="form-control" type="number" id="stanze" name="numero_camere" value={formValue.numero_camere} onChange={handleInputChange} />
                        {errors.numero_camere && <div className="text-danger">{errors.numero_camere}</div>}
                    </div>
                    <div className="col-4 mb-3">
                        <label htmlFor="letti">Numero Letti *</label>
                        <input className="form-control" type="number" id="letti" name="numero_letti" value={formValue.numero_letti} onChange={handleInputChange} required />
                        {errors.numero_letti && <div className="text-danger">{errors.numero_letti}</div>}
                    </div>
                    <div className="col-4 mb-3">
                        <label htmlFor="bagni">Numero Bagni *</label>
                        <input className="form-control" type="number" id="bagni" name="numero_bagni" value={formValue.numero_bagni} onChange={handleInputChange} required />
                        {errors.numero_bagni && <div className="text-danger">{errors.numero_bagni}</div>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="mq">Metri Quadrati *</label>
                        <input className="form-control" type="number" id="mq" name="metri_quadrati" value={formValue.metri_quadrati} onChange={handleInputChange} required />
                        {errors.metri_quadrati && <div className="text-danger">{errors.metri_quadrati}</div>}
                    </div>
                    <div className="col-3 mb-3">
                        <label htmlFor="indirizzo">Indirizzo *</label>
                        <input className="form-control" type="text" id="indirizzo" name="indirizzo" value={formValue.indirizzo} onChange={handleInputChange} placeholder="Esempio: Via Roma 33" required />
                        {errors.indirizzo && <div className="text-danger">{errors.indirizzo}</div>}
                    </div>
                    <div className="col-3 mb-3">
                        <label htmlFor="cap">CAP *</label>
                        <input className="form-control" type="text" id="cap" name="cap" value={formValue.cap} onChange={handleInputChange} required />
                        <div id="titolo_annuncio" className="form-text">
                            Il CAP deve essere un numero di 5 cifre
                        </div>
                        {errors.cap && <div className="text-danger">{errors.cap}</div>}
                    </div>
                    <div className="col-3 mb-3">
                        <label htmlFor="citta">Città *</label>
                        <input className="form-control" type="text" id="citta" name="citta" value={formValue.citta} onChange={handleInputChange} placeholder="Esempio: Milano" required />
                        {errors.citta && <div className="text-danger">{errors.citta}</div>}
                    </div>
                    <div className="col-3 mb-3">
                        <label htmlFor="paese">Nazione *</label>
                        <input className="form-control" type="text" id="paese" name="paese" value={formValue.paese} onChange={handleInputChange} placeholder="Esempio: Italia" required />
                        {errors.paese && <div className="text-danger">{errors.paese}</div>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="email">Email di riferimento *</label>
                        <input className="form-control" type="email" id="email" name="email_proprietario" value={formValue.email_proprietario} onChange={handleInputChange} placeholder="Esempio: utente1@mail.com" required />
                        {errors.email_proprietario && <div className="text-danger">{errors.email_proprietario}</div>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="immagine">Immagine Immobile</label>
                        <input className="form-control" type="file" multiple id="immagine" name="foto" onChange={handleInputChange} accept="image/*"/>
                        {errors.foto && <div className="text-danger">{errors.foto}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="titolo">Descrizione immagine</label>
                        <input className="form-control col-3" type="text" id="titolo" name="descrizione_immagine" value={formValue.descrizione_immagine} onChange={handleInputChange} placeholder="Descrizione foto" />
                        <div id="titolo_annuncio" className="form-text">
                            La descrizione non deve superare 250 caratteri
                        </div>
                        {errors.descrizione_immagine && <div className="text-danger">{errors.descrizione_immagine}</div>}
                    </div>
                </div>
                <div className="text-end">
                    <button className="btn btn-success mt-3 mb-3" type="submit">Invia</button>
                </div>
            </form>
        </>
    )
};

export default CreateHousePage;