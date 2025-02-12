import './Login.css';
import Button from "../../components/button/Button.jsx";
import Label from "../../components/label/Label.jsx";
import Input from "../../components/input/Input.jsx";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";



function Login () {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({mode:'onSubmit'});

    function handleClick () {
        navigate('/register');
    }

    function handleFormSubmit(data) {
        console.log(data)
    }

    return(
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={"login-card"}>
                <h1 className={"login-title"}>Login</h1>
                <Label className={"label-username-email"} htmlFor={"username-email-field"}>
                    Email of gebruikersnaam:
                    <Input className={"login-form-field"} id={"username-email-field"}
                           validationRules={{
                               required: {
                                   value: true,
                                   message: `Email of gebruikersnaam is verplicht`,
                               }
                           }}
                           register={register}
                           errors={errors}
                           type={"email"}
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