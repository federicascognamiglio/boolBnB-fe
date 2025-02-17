import axios from "axios";
import { useState } from "react";

function ContactForm({ id }) {
    const apiUrl = import.meta.env.VITE_BACKEND_URL

    const defaultFormValue = {
        email_ospite: "",
        messaggio: ""
    }
    // Variabili di Stato
    const [formValue, setFormValue] = useState(defaultFormValue)
    const [errors, setErrors] = useState([])
    const [charCount, setCharCount] = useState(0);
    const minCharCount = 20;

    function validateForm() {
        let newErrors = {}

        // email_ospite
        if (!formValue.email_ospite || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValue.email_ospite)) {
            newErrors.email_ospite = "Email non valida"
        }
        // Messaggio
        if (!formValue.messaggio || formValue.messaggio.length < 20) {
            newErrors.messaggio = "Il messaggio deve essere di almeno 20 caratteri";
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    }

    function handleChangeInput(event) {
        const keyToChange = event.target.name
        const valueToChange = event.target.value

        const newFormValue = {
            ...formValue,
            [keyToChange]: valueToChange
        }
        setFormValue(newFormValue)
        if (keyToChange === 'messaggio') {
            setCharCount(valueToChange.length);
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault()

        if (!validateForm()) {
            return
        }

        axios.post(`${apiUrl}/houses/${id}/message`, formValue).then((resp) => {
            setFormValue(defaultFormValue)
            setCharCount(0)
        })
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input name="email_ospite" value={formValue.email_ospite} onChange={handleChangeInput} type="email" className="form-control" id="email" placeholder="name@example.com" />
                {errors.email_ospite && <div className="text-danger">{errors.email_ospite}</div>}
            </div>
            <div className="mb-3 position-relative">
                <label htmlFor="messagio" className="form-label">Messaggio</label>
                <textarea name="messaggio" value={formValue.messaggio} onChange={handleChangeInput} className="form-control " id="messagio" rows="3"></textarea>
                <div className="position-absolute bottom-0 end-0 mb-1 me-3 form-text">{`${charCount}/${minCharCount}`}</div>
                {errors.messaggio && <div className="text-danger">{errors.messaggio}</div>}
            </div>
            <div className="text-end">
                <button type="submit" className="btn btn-success">Invia</button>
            </div>
        </form>
    )
}

export default ContactForm;