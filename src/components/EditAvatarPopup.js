import React, {useState} from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const avatarLinkRef = React.useRef();
    const [errorMessage, setErrorMessage] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarLinkRef.current.value
        });
    }

    function validateLink(event) {
        if (!event.target.validity.valid) {
            setErrorMessage(event.target.validationMessage);
        } else {
            setErrorMessage(null);
        }
    }

    const showError =  errorMessage ? "form__field-error_active" : "";
    const isSubmitActive = !showError;

    return (
        <PopupWithForm name="avatarpic" title="Change Userpic" isSubmitActive={isSubmitActive} isOpen={props.isOpen}
                       onClose={props.onClose} onSubmit={handleSubmit} submitText={props.submitText}>
            <label className="form__label form__label_title" htmlFor="avatarpic-link-input">
                <input ref={avatarLinkRef} id="avatarpic-link-input" type="url" name="avatarpic-link"
                       className="form__field form__field_title" placeholder="Image Link" onInput={validateLink} required/>
                <span id="avatarpic-link-input-error" className={`form__field-error ${showError}`}>{errorMessage}</span>
            </label>
        </PopupWithForm>
    );

}

export default EditAvatarPopup;