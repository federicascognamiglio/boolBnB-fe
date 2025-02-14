import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function ReviewForm({ id, resetAnnuncement }) {
    const apiUrl = import.meta.env.VITE_BACKEND_URL

    const defaultFormValue = {
        nome: "",
        commento: "",
        giorni_permanenza: ""
    };

    const [formValue, setFormValue] = useState(defaultFormValue);
    const [errors, setErrors] = useState([]) 

    function validateForm() {
        let newErrors = {}

        // Nome
        if (!formValue.nome || typeof formValue.nome !== "string" || formValue.nome.length < 3) {
            newErrors.nome = "Il nome deve essere minimo di 3 caratteri"
        }
        // Recensione
        if (!formValue.commento || formValue.commento.length < 20) {
            newErrors.commento = "Il commento deve essere minimo di 20 caratteri"
        }
        // Giorni permanenza
        if (!formValue.giorni_permanenza || formValue.giorni_permanenza <= 0) {
            newErrors.giorni_permanenza = "I giorni di permanenza devono essere maggiori di 0";
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    }

    function handleReviewInput(event) {
        const keyToChange = event.target.name;
        const valueToChange = event.target.value;

        const newFormValue = {
            ...formValue,
            [keyToChange]: valueToChange
        }
        setFormValue(newFormValue)
    }

    function handleFormSubmit(event) {
        event.preventDefault()

        if (!validateForm()) {
            return
        }

        axios.post(`${apiUrl}/houses/${id}/review`, formValue).then((resp) => {
            console.log(formValue);

            setFormValue(defaultFormValue)
            resetAnnuncement()
        })
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nome Utente *</label>
                    <input onChange={handleReviewInput} name="nome" value={formValue.nome} type="text" className="form-control" id="username" placeholder="Inserisci il tuo nome" required />
                    {errors.nome && <div className="text-danger">{errors.nome}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="comment" className="form-label">Commento *</label>
                    <textarea onChange={handleReviewInput} name="commento" value={formValue.commento} className="form-control" id="comment" rows="4" placeholder="Scrivi la tua recensione" required></textarea>
                    <div id="titolo_annuncio" className="form-text">
                        La recensione deve essere di minimo 20 caratteri.
                    </div>
                    {errors.commento && <div className="text-danger">{errors.commento}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="giorni_permanenza" className="form-label">Durata del soggiorno *</label>
                    <input onChange={handleReviewInput} name="giorni_permanenza" value={formValue.giorni_permanenza} type="number" min="0" className="form-control" id="giorni_permanenza" rows="4" placeholder="" required />
                    {errors.giorni_permanenza && <div className="text-danger">{errors.giorni_permanenza}</div>}
                </div>
                <div className="text-end">
                    <button type="submit" className="btn btn-success">Invia</button>
                </div>
            </form>
        </>
    )
}

export default ReviewForm;