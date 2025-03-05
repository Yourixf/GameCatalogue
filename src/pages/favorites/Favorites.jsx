import {useContext} from 'react';
import './Favorites.css';
import {ThemeContext} from "../../context/ThemeProvider.jsx";

function Favorites () {
    const { selectedTheme } = useContext(ThemeContext)


    return(
        <main className={`page-container ${selectedTheme} favorites-page-container`}>
            <div>
                <h1>Favorites PAGINA</h1>
            </div>
        </main>

    );
}

export default Favorites;