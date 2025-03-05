import'./Pagination.css';
import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeProvider.jsx";

function Pagination ({loadNextPage=null, loadPreviousPage=null, loadFirstPage=null, lastPageValue='x', loadLastPage=null, currentPageValue=null}) {
    const { selectedTheme } = useContext(ThemeContext)

    return (
        <nav className={`pagination ${selectedTheme}`}>
            <ul className={`pagination-list`}>
                {loadPreviousPage && <li onClick={loadPreviousPage} className={`pagination-previous-next`}>vorige</li>}

                {currentPageValue && currentPageValue === 1 ?
                    <li onClick={loadFirstPage} className={`pagination-pages first-page current-page`}>1</li>
                    :
                    [
                        <li key={1} onClick={loadFirstPage} className={`pagination-pages first-page`}>1</li>,
                        [currentPageValue -1 === 1 ?
                            null : <li key={3} className={`pagination-pages other-pages`}>...</li>
                        ]
                        ,
                        <li key={2} className={`pagination-pages current-page`}>{currentPageValue}</li>
                    ]
                }

                {lastPageValue && lastPageValue > 3 && lastPageValue !== currentPageValue &&
                    [
                        [lastPageValue - 1 === currentPageValue ?
                            null : <li key={3} className={`pagination-pages other-pages`}>...</li>

                        ]
                        ,
                        <li key={4} onClick={loadLastPage} className={`pagination-pages last-page`}>{lastPageValue}</li>
                    ]
                }

                {loadNextPage && lastPageValue !== currentPageValue ?

                    <li onClick={loadNextPage} className={`pagination-previous-next`}>volgende</li>
                    :
                    null
                }
            </ul>
        </nav>
    )
}

export default Pagination;