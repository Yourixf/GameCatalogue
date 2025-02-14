import './Register.css';
import Button from "../../components/button/Button.jsx";
import Label from "../../components/label/Label.jsx";
import Input from "../../components/input/Input.jsx";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";


function Register () {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({mode:'onSubmit'});

    function handleClick () {
        navigate('/login');
    }

    function handleFormSubmit(data) {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={"register-card"}>
                <h1 className={"register-title"}>Registreer</h1>
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
            </div>
        </form>
    );
}

export default Register;