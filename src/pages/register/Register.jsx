import './Register.css';
import Button from "../../components/button/Button.jsx";
import Label from "../../components/label/Label.jsx";
import Input from "../../components/input/Input.jsx";
import {useNavigate} from "react-router-dom";


function Register () {
    const navigate = useNavigate();

    function handleClick () {
        navigate('/login');
    }

    return (
        <div className={"register-card"}>
            <h1 className={"register-title"}>Registreer</h1>
            <Label className={"label-email"} htmlFor={"email-field"}>
                Email:
                <Input className={"register-form-field"} id={"email-field"}/>
            </Label>

            <Label className={"label-username"} htmlFor={"username-field"}>
                Gebruikersnaam:
                <Input className={"register-form-field"} id={"username-field"}/>
            </Label>

            <Label className={"label-password"} htmlFor={"user-password-field"}>
                Wachtwoord:
                <Input className={"register-form-field"} id={"user-password-field"}/>
            </Label>

            <Label className={"label-confirm-password"} htmlFor={"user-confirm-password-field"}>
                Bevestig wachtwoord:
                <Input className={"login-form-field"} id={"user-confirm-password-field"}/>
            </Label>
            <Button className={"register-button"} content={"Registreer"}></Button>

            <div className={"login-section"}>
                <p>Heb je al een account?</p>
                <Button onClick={handleClick} className={"login-button"} content={"login"}></Button>
            </div>
        </div>
    );
}

export default Register;