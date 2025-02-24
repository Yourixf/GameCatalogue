import'./Pagination.css';

function Pagination () {
    const selectedTheme = "dark-mode";

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