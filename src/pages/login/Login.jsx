import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {useLoginUser } from "../../hooks/useUser.js";
import {useAuthData} from "../../helpers/user.js";
import Button from "../../components/button/Button.jsx";
import Label from "../../components/label/Label.jsx";
import Input from "../../components/input/Input.jsx";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import './Login.css';

function Login () {
    const { selectedTheme } = useContext(ThemeContext)
    const authData = useAuthData();

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({mode:'onSubmit'});
    const { loginUser, data, loading, error } = useLoginUser();

    function registerButton () {
        navigate('/register');
    }

    async function handleFormSubmit(data){
        let formData = {
            username: `${data["username-field"]}`,
            password: `${data["user-password-field"]}`
        }

        try {
            const token = await loginUser(formData)

            if (!token) {
                throw new Error("Login.jsx.jsx - 38 - Login failed")
            }
            await authData.login(token.data.jwt);

            navigate('/profile')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <main className={`page-container ${selectedTheme} login-page-container`}>
            <div className={"page-inner-container"}>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <article className={`login-card ${selectedTheme}`}>
                        <h1 className={"login-title"}>Login</h1>

                        <StatusMessage statusState={loading} type={"loading"} content={"Laden"}/>
                        <StatusMessage
                            statusState={error} type={"error"}
                            content={error ? error?.response?.data || error?.message : "er ging iets fout..."}
                        />
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

                        <Button className={"login-button"} content={"login"} type={"submit"}/>

                        <div className={"register-section"}>
                            <p>Geen account?</p>
                            <Button onClick={registerButton} className={"register-button"}
                                    content={"maak een account"}/>
                        </div>
                    </article>
                </form>
            </div>
        </main>
    );
}

export default Login;