import React from 'react';

function ImagePopup(props) {

    return (
        <section className={`overlay overlay_image ${props.card ? "overlay_opened" : ""}`}>
            <div className="overlay__container overlay__container_image">
                <img className="image" alt="image title" src={props.card && props.card.link} />
                <p className="image__title">{props.card && props.card.name}</p>
                <button className="overlay__close-button" onClick={props.onClose}></button>
            </div>
        </section>
    );
}

export default ImagePopup;