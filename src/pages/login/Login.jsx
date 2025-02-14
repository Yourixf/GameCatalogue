import React from "react";
import './Login.css';
import Button from "../../components/button/Button.jsx";
import Label from "../../components/label/Label.jsx";
import Input from "../../components/input/Input.jsx";
import {useNavigate} from "react-router-dom";
import {set, useForm} from "react-hook-form";
import axios from "axios";
import { jwtDecode} from "jwt-decode";


function Login () {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({mode:'onSubmit'});

    const [error, setError] = React.useState(false);

    const NOVI_BASE_API_ENDPOINT = "https://api.datavortex.nl/gamecatalogue";

    const noviBaseHeaders = {
        'Content-type': 'application/json',
        'X-Api-Key': `${import.meta.env.VITE_NOVI_API_KEY}`,
    };

    function handleClick () {
        navigate('/register');
    }

    function handleFormSubmit(data) {
        console.log(data)

        let formData = {
            username: `${data["username-field"]}`,
            password: `${data["user-password-field"]}`
        }
        console.log("form data :" ,formData)
        getJWTToken(formData)
        console.log("uitgevoerd")
    }

    async function getJWTToken(formData) {
        try {
            const result = await axios.post(`${NOVI_BASE_API_ENDPOINT}/users/authenticate`, formData, noviBaseHeaders);
            console.log(result)
            localStorage.setItem('token', `Bearer ${result.data.jwt}`)
            setError(false)
        }
        catch (e) {
            console.log(e)
            setError(e)
        }
    }

    return(
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={"login-card"}>
                <h1 className={"login-title"}>Login</h1>
                {error ?  <h3 className="error-message">{error.response.data}</h3> : ''}

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
                    <Button onClick={handleClick} className={"register-button"} content={"maak een account"}></Button>
                </div>
            </div>
        </form>
    );
}

export default Login;