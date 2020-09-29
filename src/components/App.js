import React, {useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {submitSave, submitSaving, submitEdit, submitCreate, submitCreating, submitDelete, submitDeleting} from "../utils/utils";

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIssEditAvatarPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [deletedCard, setDeletedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [submitText, setSubmitText] = useState("");

    React.useEffect(() => {
        api.getProfile().then((myProfile) => {
            setCurrentUser(myProfile);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    React.useEffect(() => {
        api.getInitialCards().then((cards) => {
                let initialCards = [];
                cards.forEach((card) => {
                    initialCards.push(card);
                });
                setCards(initialCards);
            }
        ).catch((err) => {
            console.log(err);
        });
    }, []);

    function handleCardLike(card) {
        // Check one more time if this card was already liked
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Send a request to the API and getting the updated card data
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            // Create a new array based on the existing one and putting a new card into it
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            // Update the state
            setCards(newCards);
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleCardDelete(deletedCard) {
        setSubmitText(submitDeleting);
        api.deleteCard(deletedCard._id).then(() => {
            const remainingCards = cards.filter((card) => card._id !== deletedCard._id)
            setCards(remainingCards);
            setIsConfirmationPopupOpen(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleEditAvatarClick() {
        setSubmitText(submitSave);
        setIssEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setSubmitText(submitSave);
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setSubmitText(submitCreate);
        setIsAddPlacePopupOpen(true);
    }

    function confirmDelete(card) {
        setDeletedCard(card);
        setSubmitText(submitDelete);
        setIsConfirmationPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setSelectedCard(null);
        setIssEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
    }

    function handleUpdateUser({name, about}) {
        setSubmitText(submitSaving);
        api.updateProfile(name, about).then((updateProfile) => {
            setCurrentUser(updateProfile);
            setIsEditProfilePopupOpen(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleUpdateAvatar({avatar}) {
        setSubmitText(submitSaving);
        api.updateProfilePicture(avatar).then((updateProfile) => {
            setCurrentUser(updateProfile);
            setIssEditAvatarPopupOpen(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleAddPlace({title, link}) {
        setSubmitText(submitCreating);
        api.addCard(title, link).then((newCard) => {
            setCards([...cards, newCard]);
            setIsAddPlacePopupOpen(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header/>
                <Main cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike}
                      onCardDelete={confirmDelete}/>
                <Footer/>
                <EditProfilePopup isOpen={isEditProfilePopupOpen} submitText={submitText} onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}/>
                <AddPlacePopup isOpen={isAddPlacePopupOpen} submitText={submitText} onClose={closeAllPopups}
                               onAddPlace={handleAddPlace}/>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} submitText={submitText} onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}/>
                <ConfirmationPopup isOpen={isConfirmationPopupOpen} onClose={closeAllPopups} onConfirmation={handleCardDelete} confirmedObject={deletedCard} submitText={submitText}/>
                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
