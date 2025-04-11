import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import Button from "../../components/button/Button.jsx";
import './404.css';


function NotFound () {
    const { selectedTheme } = useContext(ThemeContext)

    const navigate = useNavigate();

    function handleClick() {
        navigate('/');
    }

    return (
        <main className={`page-container ${selectedTheme} 404-page-container`}>
            <div className="not-found-error">
                <h1 className="error-code">404</h1>
                <h2 className="error-main-text">Oeps! Pagina niet gevonden</h2>
                <h2 className="error-secondary-text">De pagina die je zoekt bestaat niet of is verplaatst</h2>
                <Button className="error-home-button" content="terug naar home" onClick={handleClick}/>
            </div>
        </main>
    );
}

export default NotFound;