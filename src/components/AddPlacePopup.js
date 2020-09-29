import React, {useState} from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [title, setTitle] = useState('');
    const [titleErrorMessage, setTitleErrorMessage] = useState(null);

    const [link, setLink] = useState('');
    const [linkErrorMessage, setLinkErrorMessage] = useState(null);


    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function validateTitle(event) {
        if (!event.target.validity.valid) {
            setTitleErrorMessage(event.target.validationMessage);
        } else {
            setTitleErrorMessage(null);
        }
    }

    function handleLinkChange(event) {
        setLink(event.target.value);
    }

    function validateLink(event) {
        if (!event.target.validity.valid) {
            setLinkErrorMessage(event.target.validationMessage);
        } else {
            setLinkErrorMessage(null);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        props.onAddPlace({
            title: title,
            link: link,
        });
    }

    const showTitleError =  titleErrorMessage ? "form__field-error_active" : "";
    const showLinkError =  linkErrorMessage ? "form__field-error_active" : "";
    const isSubmitActive = !showTitleError && !showLinkError;

    return (
        <PopupWithForm name="place" title="New place" isOpen={props.isOpen} isSubmitActive={isSubmitActive} onClose={props.onClose} onSubmit={handleSubmit} submitText={props.submitText}>
            <label className="form__label form__label_title" htmlFor="place-title-input">
                <input id="place-title-input" type="text" name="image-title"
                       className="form__field form__field_title" placeholder="Title" minLength="2"
                       maxLength="40" value={title} onChange={handleTitleChange} onInput={validateTitle} required/>
                <span id="place-title-input-error" className={`form__field-error ${showTitleError}`}>{titleErrorMessage}</span>
            </label>
            <label className="form__label form__label_detail" htmlFor="place-link-input">
                <input id="place-link-input" type="url" name="image-link"
                       className="form__field form__field_detail" placeholder="Image Link" value={link}
                       onChange={handleLinkChange} onInput={validateLink} required/>
                <span id="place-link-input-error" className={`form__field-error ${showLinkError}`}>{linkErrorMessage}</span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;