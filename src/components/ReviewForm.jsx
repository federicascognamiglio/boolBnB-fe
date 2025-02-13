// aggingere e controllare tutti gli input X
// creare defaultFormValue X
// variabili di stato X
// fun handle input changhe X
// fun submit 

// prop alla pagina dettagli
// chiamata axios e passargli questi valori

// dobbiamo far si che tutti i nome value, name coincidino con quelli nel backend
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
                    <label htmlFor="username" className="form-label">Nome Utente</label>
                    <input onChange={handleReviewInput} name="nome" value={formValue.nome} type="text" className="form-control" id="username" placeholder="Inserisci il tuo nome" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="comment" className="form-label">Recensione</label>
                    <textarea onChange={handleReviewInput} name="commento" value={formValue.commento} className="form-control" id="comment" rows="4" placeholder="Scrivi la tua recensione" required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="giorni_permanenza" className="form-label">Durata del soggiorno</label>
                    <input onChange={handleReviewInput} name="giorni_permanenza" value={formValue.giorni_permanenza} type="number" className="form-control" id="giorni_permanenza" rows="4" placeholder="" required />
                </div>
                <div className="text-end">
                    <button type="submit" className="btn btn-success">Invia</button>
                </div>
            </form>
        </>
    )
}

export default ReviewForm;