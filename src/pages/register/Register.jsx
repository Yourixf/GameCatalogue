import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import { useRegisterUser } from "../../hooks/useUser.js";
import Button from "../../components/button/Button.jsx";
import Label from "../../components/label/Label.jsx";
import Input from "../../components/input/Input.jsx";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import './Register.css';


function Register () {
    const { selectedTheme } = useContext(ThemeContext)

    const [ passwordConflict, setPasswordConflict ] = useState(false)

    const { register, handleSubmit, reset , formState: { errors } } = useForm({mode:'onSubmit'});
    const { registerUser, data, loading, error } = useRegisterUser();

    const navigate = useNavigate();

    function handleClick () {
        navigate('/login');
    }

    function handleFormSubmit(data) {
        let username = data['username-field']
        let email = data['email-field']
        let password = data['user-password-field']
        let confirmationPassword = data['user-confirm-password-field']
        let userInfo = {
            favorite_games: [],
            profile_picture: "defaultProfile.png"
        }
        let userInfoString = JSON.stringify(userInfo)

        let formData =
            {
                username: `${username}`,
                email: `${email}`,
                password: `${password}`,
                info: userInfoString,
                role: [
                    {
                        authority: "USER"
                    }
                ]
            }

            console.warn(formData)
        if (confirmationPassword === password) {
            setPasswordConflict(false)
            registerUser(formData)
            reset()
        } else {
            setPasswordConflict(true)
        }
    }

    return (
        <main className={`page-container ${selectedTheme} register-page-container`}>
            <div className={"page-inner-container"}>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <article className={`register-card ${selectedTheme}`}>
                        <h1 className={"register-title"}>Registreer</h1>

                        <StatusMessage statusState={loading} type={"loading"} content={"Laden..."}/>
                        <StatusMessage statusState={error} type={"error"} content={error ? `${error?.message} - ${error?.response?.data?.message} `: "er ging iets fout..."}/>
                        <StatusMessage statusState={data} type={"succes"} content={"Account gemaakt"}/>
                        <StatusMessage statusState={passwordConflict} type={"error"} content={"Wachtwoorden komen niet overheen"}/>

                        <Label className={"label-email"} htmlFor={"email-field"}>
                            Email:
                            <Input className={"register-form-field"} id={"email-field"}
                                   validationRules={{
                                       required: {
                                           value: true,
                                           message: `Email is verplicht`,
                                       }
                                   }}
                                   register={register}
                                   errors={errors}
                                   type={"email"}
                            />
                        </Label>

                        <Label className={"label-username"} htmlFor={"username-field"}>
                            Gebruikersnaam:
                            <Input className={"register-form-field"} id={"username-field"}
                                   validationRules={{
                                       required: {
                                           value: true,
                                           message: 'Gebruikersnaam is verplicht',
                                       }
                                   }}
                                   register={register}
                                   errors={errors}
                            />
                        </Label>

                        <Label className={"label-password"} htmlFor={"user-password-field"}>
                            Wachtwoord:
                            <Input className={"register-form-field"} id={"user-password-field"}
                                   validationRules={{
                                       required: {
                                           value: true,
                                           message: 'Wachtwoord is verplicht',
                                       },
                                       minLength: {
                                           value: 6,
                                           message: "Wachtwoord moet minimaal uit 6 characters bestaan "
                                       }

                                   }}
                                   register={register}
                                   errors={errors}
                                   type={"password"}
                            />
                        </Label>

                        <Label className={"label-confirm-password"} htmlFor={"user-confirm-password-field"}>
                            Bevestig wachtwoord:
                            <Input className={"login-form-field"} id={"user-confirm-password-field"}
                                   validationRules={{
                                       required: {
                                           value: true,
                                           message: 'Bevestigings wachtwoord is verplicht',
                                       },
                                   }}
                                   register={register}
                                   errors={errors}
                                   type={"password"}/>
                        </Label>

                        <Button className={"register-button"} content={"Registreer"} type={"submit"}/>

                        <div className={"login-section"}>
                            <p>Heb je al een account?</p>
                            <Button onClick={handleClick} className={"login-button"} content={"login"}/>
                        </div>
                    </article>
                </form>
            </div>
        </main>
    );
}

export default Register;