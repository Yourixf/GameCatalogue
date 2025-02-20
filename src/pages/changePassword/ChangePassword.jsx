import {useContext} from "react";
import './ChangePassword.css';
import Button from "../../components/button/Button.jsx";
import Label from "../../components/label/Label.jsx";
import Input from "../../components/input/Input.jsx";
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import {useUpdateUserInfo} from "../../hooks/useUser.js";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {AuthContext} from "../../context/AuthProvider.jsx";
import {getToken, getTokenUsername} from "../../helpers/auth.js";


function ChangePassword () {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({mode:'onSubmit'});

    const { updateUserInfo, data, loading, error } = useUpdateUserInfo();
    const { selectedTheme } = useContext(ThemeContext)
    const { authData } = useContext(AuthContext)

    function cancelButton () {
        navigate('/profile');
    }

    async function handleFormSubmit(data) {
        let formData = {
            password: `${data["user-password-field"]}`
        }

        const currentToken = getToken()
        const tokenUsername = getTokenUsername()

        try {
            const token = await updateUserInfo(formData, currentToken, tokenUsername)

            if (!token) {
                throw new Error("ChangePassword.jsc - 39 - wachtwoord wijzigen mislukt")
            }

            navigate('/')
        } catch (e) {
            console.log("ChangePassword.jsx - 44 - er ging wat mis...")
            console.log(e)
        }
    }

    return (
        <div className={"page-inner-container"}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className={`change-password-card ${selectedTheme}`}>
                    <h1 className={"change-password-title"}>Verander wachtwoord</h1>

                    <StatusMessage statusState={loading} type={"loading"} content={"Laden..."}/>

                    <StatusMessage statusState={error} type={"error"} content={error ?  error.response.data : "er ging iets fout..."}/>

                    <StatusMessage statusState={data} type={"succes"} content={"Wachtwoord veranderd"}/>

                    <Label className={"label-password"} htmlFor={"user-password-field"}>
                        Nieuw wachtwoord:
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
                        Bevestig nieuw wachtwoord:
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

                    <Button className={"confirm-button"} content={"bevestig"} type={"submit"}></Button>

                    <Button onClick={cancelButton} className={"cancel-button"}
                                content={"Annuleren"}></Button>

                </div>
            </form>
        </div>
    );
}

export default ChangePassword;