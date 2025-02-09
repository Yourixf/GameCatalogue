import './Login.css';
import Button from "../../components/button/Button.jsx";
import Label from "../../components/label/Label.jsx";
import Input from "../../components/input/Input.jsx";
import {useNavigate} from "react-router-dom";


function Login () {
    const navigate = useNavigate();

    function handleClick () {
        navigate('/register');
    }

    return(

        <div className={"login-card"}>
            <h1 className={"login-title"}>Login</h1>
            <Label className={"label-username-email"} htmlFor={"username-email-field"}>
                Email of gebruikersnaam:
                <Input className={"login-form-field"} id={"username-email-field"}/>
            </Label>

            <Label className={"label-password"} htmlFor={"user-password-field"}>
                Wachtwoord:
                <Input className={"login-form-field"} id={"user-password-field"}/>
            </Label>

            <Button className={"login-button"} content={"login"}></Button>

            <div className={"register-section"}>
                <p>Geen account?</p>
                <Button onClick={handleClick} className={"register-button"} content={"maak een account"}></Button>
            </div>
        </div>
    );
}

export default Login;