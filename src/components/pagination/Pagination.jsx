import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import'./Pagination.css';

function Pagination ({loadNextPage=null, loadPreviousPage=null, loadFirstPage=null, lastPageValue='x', loadLastPage=null, currentPageValue=null, listType}) {
    const { selectedTheme } = useContext(ThemeContext)

    return (
        <nav className={`pagination ${selectedTheme}`}>
            <ul className={`pagination-list`}>
                {/*for when there is only 1 page*/}
                {lastPageValue === 0 && (
                    <li className="pagination-pages current-page">1</li>
                )}

                {lastPageValue > 1 && (
                    <>
                        {/*for when there is an previous page available*/}
                        {loadPreviousPage && currentPageValue > 1 && (
                            <li onClick={loadPreviousPage} className={`pagination-previous-next`}>vorige</li>
                        )}
                        {/*for first page clickable, and checks is the first page is the current page*/}
                        <li
                            onClick={loadFirstPage}
                            className={`pagination-pages ${currentPageValue === 1 ? 'current-page' : ''}`}
                        >
                            1
                        </li>

                        {/*for the ... when more then 1 page from first page*/}
                        {currentPageValue > 2 && <li className="pagination-pages other-pages">...</li>}

                        {(currentPageValue > 1 && currentPageValue < lastPageValue) && (
                            <li className="pagination-pages current-page">{currentPageValue}</li>
                        )}

                        {/*for the ... when more then 1 page from last page*/}
                        {currentPageValue < lastPageValue - 1 && <li className="pagination-pages other-pages">...</li>}

                        {/*for the last page clickable version, also checks if its the current page*/}
                        <li
                            onClick={() => loadLastPage(listType)}
                            className={`pagination-pages ${currentPageValue === lastPageValue ? 'current-page' : ''}`}
                        >
                            {lastPageValue}
                        </li>

                        {/*for when there is an next page available*/}
                        {loadNextPage && currentPageValue < lastPageValue && (
                            <li onClick={loadNextPage} className={`pagination-previous-next`}>volgende</li>
                        )}
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Pagination;