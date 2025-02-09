import React from 'react';
import './Login.css';
import Button from "../../components/button/Button.jsx";

function Login () {
    return(
        <> 
        <div>
            <div className={"login-card"}>
                <h1 className={"login-title"}>Login</h1>
                <div>
                    <label className={"label-title"} htmlFor="user-password-field">
                        Email of gebruikersnaam:
                        <input className="input-field login-form-field" type="text" id="user-password-field"/>
                    </label>
                </div>
                <div>
                    <label className={"label-title"} htmlFor="user-password-field">
                        Wachtwoord:
                        <input className="input-field login-form-field" type="text"  id="user-password-field"/>
                    </label>
                </div>
                <Button className={"login-button"} content={"login"}></Button>

                <div>
                    <p>Geen account?</p>
                    <Button className={"register-button"} content={"maak een account"}></Button>
                </div>

            </div>
        </div>
        </>

    );
}

export default Login;