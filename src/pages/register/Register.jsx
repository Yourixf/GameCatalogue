import './Register.css';
import Button from "../../components/button/Button.jsx";
import Label from "../../components/label/Label.jsx";
import Input from "../../components/input/Input.jsx";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import { useContext } from "react";
import { useRegisterUser } from "../../hooks/useUser.js";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import {ThemeContext} from "../../context/ThemeProvider.jsx";


function Register () {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({mode:'onSubmit'});

    const { registerUser, data, loading, error } = useRegisterUser();
    const { selectedTheme } = useContext(ThemeContext)

    function handleClick () {
        navigate('/login');
    }

    async function handleFormSubmit(data) {
        let formData =
            {
            username: `${data["username-field"]}`,
            email: `${data["email-field"]}`,
            password: `${data["user-password-field"]}`,
            info: "",
            authorities: [
                {
                    authority: "ADMIN"
                }
            ]
        }
        await registerUser(formData)
    }

    return (
        <main className={`page-container ${selectedTheme} register-page-container`}>
            <div className={"page-inner-container"}>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <article className={`register-card ${selectedTheme}`}>
                        <h1 className={"register-title"}>Registreer</h1>

                        <StatusMessage statusState={loading} type={"loading"} content={"Laden..."}/>

                        <StatusMessage statusState={error} type={"error"} content={error ?  error.response.data : "er ging iets fout..."}/>

                        <StatusMessage statusState={data} type={"succes"} content={"Account gemaakt"}/>

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
                                           value: 8,
                                           message: "Wachtwoord moet minimaal uit 8 characters bestaan "
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
                                       validate: {

                                       }
                                   }}
                                   register={register}
                                   errors={errors}
                                   type={"password"}/>
                        </Label>

                        <Button className={"register-button"} content={"Registreer"} type={"submit"}></Button>

                        <div className={"login-section"}>
                            <p>Heb je al een account?</p>
                            <Button onClick={handleClick} className={"login-button"} content={"login"}></Button>
                        </div>
                    </article>
                </form>
            </div>
        </main>
    );
}

export default Register;