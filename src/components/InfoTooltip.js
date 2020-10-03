import React from 'react';
import successIcon from '../images/success.svg';
import failureIcon from '../images/failure.svg';

function InfoToolTip(props) {

    const message = props.success ? "Success! You have now been registered." : "Oops, something went wrong! Please try again.";
    const icon = props.success ? successIcon : failureIcon;

    return (
        <section className={`overlay overlay_image ${props.isOpen ? "overlay_opened" : ""}`}>
            <div className="overlay__container overlay__container_message">
                <img src={icon} className="message__icon" alt="image title"/>
                    <p className="message__text">{message}</p>
                    <button className="overlay__close-button" onClick={props.onClose}></button>
            </div>
        </section>
    );
}

export default InfoToolTip;
