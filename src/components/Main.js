import React from 'react';
import Card from './Card';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <button className="profile__avatar" onClick={props.onEditAvatar}>
                    <img className="profile__avatar-image" alt="profile avatar" src={currentUser.avatar}/>
                    <div className="profile__avatar-edit"/>
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit-button" onClick={props.onEditProfile}/>
                    <p className="profile__about-me">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" onClick={props.onAddPlace}/>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {props.cards.map((card, index) => (
                            <Card key={index} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike}
                                  onCardDelete={props.onCardDelete}/>
                        )
                    )}
                </ul>
            </section>
        </main>
    );
}

export default Main;