import {useContext, useEffect, useState} from "react";
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

    const [ passwordConflict, setPasswordConflict ] = useState(false)

    function cancelButton () {
        navigate('/profile');
    }

    function handleFormSubmit(data) {
        let newPassword = data['user-new-password-field']
        let confirmationPassword = data['user-confirm-password-field']

        let formData = {
            password: `${newPassword}`,
        }

        if (confirmationPassword === newPassword) {
            setPasswordConflict(false)
            const currentToken = getToken()
            const tokenUsername = getTokenUsername(currentToken)
            updateUserInfo(formData, currentToken, tokenUsername)

        } else {
            setPasswordConflict(true)
        }
    }


    // useEffect(() => {
    //     // console.log("testing data status " , data)
    // }, [data])


    return (
        <main className={`page-container ${selectedTheme}`}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <article className={`change-password-card ${selectedTheme}`}>
                    <h1 className={"change-password-title"}>Verander wachtwoord</h1>

                    <StatusMessage statusState={loading} type={"loading"} content={"Laden..."}/>

                    <StatusMessage statusState={error} type={"error"} content={error?.message ? error?.message : "er ging iets fout..."}/>

                    <StatusMessage statusState={data} type={"succes"} content={"Wachtwoord veranderd"}/>



                    <StatusMessage statusState={passwordConflict} type={"error"} content={"Wachtwoorden komen niet overheen"}/>

                    <Label className={"label-new-password"} htmlFor={"user-new-password-field"}>
                        Nieuw wachtwoord:
                        <Input className={"change-password-form-field"} id={"user-new-password-field"}
                               validationRules={{
                                   required: {
                                       value: true,
                                       message: 'Nieuw wachtwoord is verplicht',
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
                        <Input className={"change-password-form-field"} id={"user-confirm-password-field"}
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

                    <Button className={"confirm-button"} content={"bevestig"} type={"submit"}></Button>

                    <Button onClick={cancelButton} className={"cancel-button"}
                            content={data? 'Terug naar profiel' : "Annuleren"}></Button>


                </article>
            </form>
        </main>
    );
}

export default ChangePassword;