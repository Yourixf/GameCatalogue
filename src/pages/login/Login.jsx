import { useState } from "react";
import './Login.css';
import Button from "../../components/button/Button.jsx";
import Label from "../../components/label/Label.jsx";
import Input from "../../components/input/Input.jsx";
import statusMessage from "../../components/statusMessage/StatusMessage.jsx";
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import {useLoginUser } from "../../hooks/useUser.js";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";


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

                    <StatusMessage statusState={loading} type={"loading"} content={"Laden..."}/>

                    <StatusMessage statusState={error} type={"error"} content={error ?  error.response.data : "er ging iets fout..."}/>

                    <StatusMessage statusState={data} type={"succes"} content={"Ingelogd"}/>

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