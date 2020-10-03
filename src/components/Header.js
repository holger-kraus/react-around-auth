import React from 'react';
import logo from "../images/logo-white.svg";
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" alt="logo" src={logo}/>
            <p className="header__email">{props.loggedIn ? props.email : ''}</p>
            <Link to={props.link.to} className="header__link" onClick={props.onLogout ? props.onLogout : null}>{props.link.description}</Link>
        </header>
    );
}

export default Header;
