import React from 'react';
import {Link} from "react-router-dom";

function Login(props) {

    const emailRef = React.useRef();
    const passwordRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onSignin({
            email: emailRef.current.value,
            password: passwordRef.current.value
        });

        emailRef.current.value = '';
        passwordRef.current.value = '';
    }

    return (
        <section className="login">
            <form action="#" className="form form_authentication" onSubmit={handleSubmit} noValidate>
                <h2 className="form__title form__title_authentication">Log in</h2>
                <label className="form__label form__label_authenticate-email" htmlFor="login-email-input">
                    <input ref={emailRef} id="login-email-input" type="email"
                           name="name" className="form__field form__field_authentication-email" placeholder="Email"
                           required/>
                </label>
                <label htmlFor="login-password-input" className="form__label form__label_authenticate-password">
                    <input ref={passwordRef} id="login-password-input" type="password" name="aboutme"
                           className="form__field form__field_authentication-password"
                           placeholder="Password" required/>
                </label>
                <button type="submit" className="form__save form__save_authenticate">Log in</button>
                <Link to="/register" className="form__save-hint">Not a member yet? Sign up here!</Link>
            </form>
        </section>
    );
}

export default Login;
