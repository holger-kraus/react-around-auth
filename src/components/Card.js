import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    // Check if card was created by the current user
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (`element__remove ${isOwn ? '' : 'element__remove_hide'}`);

    // Check if the card was liked by the current user
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`element__like-button ${isLiked ? 'element__like-button_liked' : ''}`);

    const numberOfLikes = props.card.likes.length;

    function handleCardClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick(event) {
        event.stopPropagation();
        event.preventDefault();
        props.onCardLike(props.card);
    }

    function handleCardDelete(event) {
        event.stopPropagation();
        event.preventDefault();
        props.onCardDelete(props.card);
    }

    return (
            <li className="element" data-id="#">
                <a className="element__link" style={{ backgroundImage: `url(${props.card.link})` }} href="#" onClick={handleCardClick}>
                    <button className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
                    <div className="element__title-container">
                        <h2 className="element__title">{props.card.name}</h2>
                        <div className="element__like">
                            <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                            <span className="element__like-count">{numberOfLikes}</span>
                        </div>
                    </div>
                </a>
            </li>
    );
}

export default Card;