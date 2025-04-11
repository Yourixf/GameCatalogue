import {useContext} from 'react';
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import './Recommendations.css';

function Recommendations () {
    const { selectedTheme } = useContext(ThemeContext)

    return (
        <main className={`page-container ${selectedTheme} recommendations-page-container`}>
            <div>
                <h1>recommendations PAGINA</h1>
            </div>
        </main>
    );
}

export default Recommendations;