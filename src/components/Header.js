import React from 'react';
import logo from "../images/logo-white.svg";

function Header() {
    return (
        <header className="header">
            <img className="header__logo" alt="logo" src={logo}/>
        </header>
    );
}

export default Header;