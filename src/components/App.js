import React, {useState} from 'react';
import {Route, Switch, useHistory, withRouter} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import InfoToolTip from "./InfoTooltip";
import api from "../utils/api";
import authentication from "../utils/authentication";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {
    submitSave,
    submitSaving,
    submitEdit,
    submitCreate,
    submitCreating,
    submitDelete,
    submitDeleting
} from "../utils/utils";

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIssEditAvatarPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [success, setSuccess] = useState(true);
    const [selectedCard, setSelectedCard] = useState(null);
    const [deletedCard, setDeletedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [submitText, setSubmitText] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const history = useHistory();

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        api.getProfile(token).then((myProfile) => {
            setCurrentUser(myProfile);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        api.getInitialCards(token).then((cards) => {
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

    React.useEffect(tokenCheck, []);

    function handleCardLike(card) {
        const token = localStorage.getItem('token');
        // Check one more time if this card was already liked
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Send a request to the API and getting the updated card data
        api.changeLikeCardStatus(card._id, !isLiked, token).then((newCard) => {
            // Create a new array based on the existing one and putting a new card into it
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            // Update the state
            setCards(newCards);
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleCardDelete(deletedCard) {
        const token = localStorage.getItem('token');
        setSubmitText(submitDeleting);
        api.deleteCard(deletedCard._id, token).then(() => {
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
        setIsInfoToolTipOpen(false);
    }

    function handleUpdateUser({name, about}) {
        const token = localStorage.getItem('token');
        setSubmitText(submitSaving);
        api.updateProfile(name, about, token).then((updateProfile) => {
            setCurrentUser(updateProfile);
            setIsEditProfilePopupOpen(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleUpdateAvatar({avatar}) {
        const token = localStorage.getItem('token');
        setSubmitText(submitSaving);
        api.updateProfilePicture(avatar, token).then((updateProfile) => {
            setCurrentUser(updateProfile);
            setIssEditAvatarPopupOpen(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleAddPlace({title, link}) {
        const token = localStorage.getItem('token');
        setSubmitText(submitCreating);
        api.addCard(title, link, token).then((newCard) => {
            setCards([...cards, newCard]);
            setIsAddPlacePopupOpen(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleSignup({email, password}) {
        authentication.signup(email, password).then((res) => {
            if (res && res.data) {
                setIsInfoToolTipOpen(true);
                setSuccess(true);
                setLoggedIn(true);
                setUserEmail(res.data.email);
                history.push('/');
            }
        }).catch((err) => {
            setIsInfoToolTipOpen(true);
            setSuccess(false);
        });
    }

    function handleSignin({email, password}) {
        authentication.signin(email, password).then((data) => {
            if (data.token) {
                setLoggedIn(true);
                localStorage.setItem('token', data.token);
                history.push('/');
                tokenCheck();
            }
        }).catch((err) => {
            setIsInfoToolTipOpen(true);
            setSuccess(false);
        });
    }

    function handleLogout() {
        setLoggedIn(false);
        localStorage.removeItem('token');
        history.push('/signin');
    }

    function tokenCheck() {
        const token = localStorage.getItem('token');
        if (token) {
            authentication.getMyIdentity(token).then((res) => {
                if (res && res.data) {
                    setLoggedIn(true);
                    setUserEmail(res.data.email);
                    history.push('/');
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Switch>
                    <Route path="/signin">
                        <Header loggedIn={loggedIn} email={userEmail} link={{description: 'Sign up', to: '/signup'}}/>
                        <Login onSignin={handleSignin}/>
                    </Route>
                    <Route path="/signup">
                        <Header loggedIn={loggedIn} email={userEmail} link={{description: 'Log in', to: '/signin'}}/>
                        <Register onSignup={handleSignup}/>
                    </Route>
                    <ProtectedRoute path="/" loggedIn={loggedIn}>
                        <Header loggedIn={loggedIn} email={userEmail} link={{description: 'Log out', to: '#'}}
                                onLogout={handleLogout}/>
                        <Main cards={cards}
                              onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                              onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
                              onCardLike={handleCardLike}
                              onCardDelete={confirmDelete}/>
                    </ProtectedRoute>
                </Switch>
                <Footer/>
                <EditProfilePopup isOpen={isEditProfilePopupOpen} submitText={submitText} onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}/>
                <AddPlacePopup isOpen={isAddPlacePopupOpen} submitText={submitText} onClose={closeAllPopups}
                               onAddPlace={handleAddPlace}/>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} submitText={submitText} onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}/>
                <ConfirmationPopup isOpen={isConfirmationPopupOpen} onClose={closeAllPopups}
                                   onConfirmation={handleCardDelete} confirmedObject={deletedCard}
                                   submitText={submitText}/>
                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
                <InfoToolTip isOpen={isInfoToolTipOpen} success={success} onClose={closeAllPopups}/>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default withRouter(App);
