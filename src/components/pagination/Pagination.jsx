import'./Pagination.css';
import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeProvider.jsx";


// when adding API data, i will add the code for the dynamic part.

function Pagination () {
    const { selectedTheme } = useContext(ThemeContext)


    return (
        <nav className={`pagination ${selectedTheme}`}>
            <ul className={`pagination-list`}>
                <li className={`pagination-previous-next`}>vorige</li>
                <li className={`pagination-pages first-page`}>1</li>
                <li className={`pagination-pages current-page`}>2</li>
                <li className={`pagination-pages `}>...</li>
                <li className={`pagination-pages last-page`}>100</li>
                <li className={`pagination-previous-next`}>volgende</li>
            </ul>
        </nav>
    )
}

export default Pagination;