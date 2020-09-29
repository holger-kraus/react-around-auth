import React from 'react';
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onConfirmation(props.confirmedObject);
    }

    return (
        <PopupWithForm name="confirmation" title="Are you sure?" isOpen={props.isOpen} isSubmitActive={true}
                       onClose={props.onClose} onSubmit={handleSubmit} submitText={props.submitText}/>
    );
}

export default ConfirmationPopup;