import { useState } from "react";
import './Login.css';
import Button from "../../components/button/Button.jsx";
import Label from "../../components/label/Label.jsx";
import Input from "../../components/input/Input.jsx";
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import {useLoginUser } from "../../hooks/useUser.js";


function Login () {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({mode:'onSubmit'});

    const { loginUser, data, loading, error } = useLoginUser();

    function handleClick () {
        navigate('/register');
    }

    function handleFormSubmit(data) {
        let formData = {
            username: `${data["username-field"]}`,
            password: `${data["user-password-field"]}`
        }
        loginUser(formData)
    }

    return (
        <div className={"page-inner-container"}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className={"login-card"}>
                    <h1 className={"login-title"}>Login</h1>

                    {loading && <h3 className="loading-message">Laden...</h3>}
                    {error ? <h3 className="error-message">{error.response.data}</h3> : ''}
                    {data && <h3 className={"succes-message"}>Ingelogd!</h3>}

                    <Label className={"label-username"} htmlFor={"username-field"}>
                        Gebruikersnaam:
                        <Input className={"login-form-field"} id={"username-field"}
                               validationRules={{
                                   required: {
                                       value: true,
                                       message: `Gebruikersnaam is verplicht`,
                                   }
                               }}
                               register={register}
                               errors={errors}
                               type={"username"}
                        />
                    </Label>

                    <Label className={"label-password"} htmlFor={"user-password-field"}>
                        Wachtwoord:
                        <Input className={"login-form-field"} id={"user-password-field"}
                               validationRules={{
                                   required: {
                                       value: true,
                                       message: 'Wachtwoord is verplicht',
                                   }
                               }}
                               register={register}
                               errors={errors}
                               type={"password"}
                        />
                    </Label>

                    <Button className={"login-button"} content={"login"} type={"submit"}></Button>

                    <div className={"register-section"}>
                        <p>Geen account?</p>
                        <Button onClick={handleClick} className={"register-button"}
                                content={"maak een account"}></Button>
                    </div>
                </div>
            </form>
        </div>
    )
    ;
}

export default Login;