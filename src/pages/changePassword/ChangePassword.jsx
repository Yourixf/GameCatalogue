import {useContext, useEffect} from "react";
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

    function handleFormSubmit(data) {
        console.log("inital data")
        console.log(data)

        let formData = {
            password: `${data["user-new-password-field"]}`
        }

        const currentToken = getToken()
        const tokenUsername = getTokenUsername(currentToken)
        console.log(data)

        const token = updateUserInfo(formData, currentToken, tokenUsername)

        if (!token) {
            throw new Error("ChangePassword.jsx - 39 - wachtwoord wijzigen mislukt")
        }

    }


    useEffect(() => {
        console.log("testing data status " , data)
    }, [data])


    return (
        <main className={`page-container ${selectedTheme}`}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <article className={`change-password-card ${selectedTheme}`}>
                    <h1 className={"change-password-title"}>Verander wachtwoord</h1>

                    <StatusMessage statusState={loading} type={"loading"} content={"Laden..."}/>

                    <StatusMessage statusState={error} type={"error"} content={"er ging iets fout..."}/>


                    <StatusMessage statusState={data} type={"success"} content={"Laden..."}/>

                    {/*<StatusMessage statusState={data} type={"succes"} content={"Wachtwoord veranderd"}/>*/}




                    <Label className={"label-current-password"} htmlFor={"current-user-password-field"}>
                        Huidig wachtwoord:
                        <Input className={"change-password-form-field"} id={"current-user-password-field"}
                               validationRules={{
                                   required: {
                                       value: true,
                                       message: 'Huidig wachtwoord is verplicht',
                                   }
                               }}
                               register={register}
                               errors={errors}
                               type={"password"}
                        />
                    </Label>

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
                                   validate: {

                                   }
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