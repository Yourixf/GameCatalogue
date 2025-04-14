import {useContext, useState} from 'react';
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {UserInfoContext} from "../../context/UserInfoProvider.jsx";
import {useGetCurrentGameList} from "../../hooks/useGames.js";
import StatusMessage from '../../components/statusMessage/StatusMessage.jsx';
import './Recommendations.css';

function Recommendations () {
    const { selectedTheme } = useContext(ThemeContext)
    const { userInfo } = useContext(UserInfoContext)
    
    const [genres, setGenres] = useState('');

    const {
            currentGameListData,
            currentGameListLoading,
            currentGameListError,
            loadNextPage,
            loadFirstPage,
            getLastPageNumber,
            loadLastPage,
            getCurrentPageNumber,
            checkFavorite,
            handleFilterChange,
            handleSortingChange,
            sortingFilters
        } = useGetCurrentGameList()
    

    console.log(userInfo);

    
    return (
        <main className={`page-container ${selectedTheme} recommendations-page-container`}>
            <div>

            
                <h1>recommendations PAGINA</h1>
            </div>
        </main>
    );
    
}

export default Recommendations;