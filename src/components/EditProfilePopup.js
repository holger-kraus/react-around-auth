import React, {useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [nameErrorMessage, setNameErrorMessage] = useState(null);

    const [description, setDescription] = useState('');
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function validateName(event) {
        if (!event.target.validity.valid) {
            setNameErrorMessage(event.target.validationMessage);
        } else {
            setNameErrorMessage(null);
        }
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function validateDescription(event) {
        if (!event.target.validity.valid) {
            setDescriptionErrorMessage(event.target.validationMessage);
        } else {
            setDescriptionErrorMessage(null);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    const showNameError =  nameErrorMessage ? "form__field-error_active" : "";
    const showDescriptionError =  descriptionErrorMessage ? "form__field-error_active" : "";
    const isSubmitActive = !showNameError && !showDescriptionError;

    return (
        <PopupWithForm name="profile" title="Edit profile" isOpen={props.isOpen}
                       onClose={props.onClose} onSubmit={handleSubmit} isSubmitActive={isSubmitActive} submitText={props.submitText}>
            <label className="form__label form__label_title" htmlFor="profile-name-input">
                <input id="profile-name-input" type="text"
                       name="name" className="form__field form__field_title"
                       minLength="2" maxLength="40" pattern="[a-zA-Z-\s]*" value={name} onChange={handleNameChange} onInput={validateName} required/>
                <span id="profile-name-input-error" className={`form__field-error ${showNameError}`}>{nameErrorMessage}</span>
            </label>
            <label htmlFor="profile-aboutme-input" className="form__label form__label_detail">
                <input id="profile-aboutme-input" type="text" name="aboutme"
                       className="form__field form__field_detail"
                       minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange} onInput={validateDescription} required/>
                <span id="profile-aboutme-input-error" className={`form__field-error ${showDescriptionError}`}>{descriptionErrorMessage}</span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;