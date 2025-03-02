import'./Pagination.css';
import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {useGetNextPreviousPage} from "../../hooks/useGames.js";


// when adding API data, i will add the code for the dynamic part.

function Pagination ({data}) {
    const { selectedTheme } = useContext(ThemeContext)

    const { getNextPreviousPage, data:nextPreviousPageData, loading:nextPreviousPageLoading, error:nextPreviousPageError} = useGetNextPreviousPage()


    return (
        <nav className={`pagination ${selectedTheme}`}>

            {data ?
                <ul className={`pagination-list`}>

                    {data.previous && <li className={`pagination-previous-next`}>vorige</li>}

                    <li className={`pagination-pages first-page`}>1</li>
                    <li className={`pagination-pages current-page`}>2</li>
                    <li className={`pagination-pages `}>...</li>
                    <li className={`pagination-pages last-page`}>100</li>



                    {data.next && <li onClick={() => getNextPreviousPage(data.next)}  className={`pagination-previous-next`}>volgende</li> }
                </ul>
                :
                <li className={`pagination-previous-next`}>geen data ontvangen...</li>
            }

        </nav>
    )
}

export default Pagination;