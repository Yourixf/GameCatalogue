import'./Pagination.css';
import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {useGetNextPreviousPage} from "../../hooks/useGames.js";


// when adding API data, i will add the code for the dynamic part.

function Pagination ({loadNextPage=null, loadPreviousPage=null, loadFirstPage=null, lastPageValue='x', loadLastPage=null}) {
    const { selectedTheme } = useContext(ThemeContext)

    console.warn(loadPreviousPage)
    console.warn(loadNextPage)


    return (
        <nav className={`pagination ${selectedTheme}`}>
            <ul className={`pagination-list`}>
                {loadPreviousPage && <li onClick={loadPreviousPage} className={`pagination-previous-next`}>vorige</li>}

                <li onClick={loadFirstPage} className={`pagination-pages first-page`}>1</li>
                <li className={`pagination-pages current-page`}>2</li>
                <li className={`pagination-pages `}>...</li>
                <li onClick={loadLastPage} className={`pagination-pages last-page`}>{lastPageValue}</li>
                {loadNextPage && <li onClick={loadNextPage} className={`pagination-previous-next`}>volgende</li>}

            </ul>
        </nav>
    )
}

export default Pagination;