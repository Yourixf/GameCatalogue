import {useContext, useEffect, useState} from 'react';
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {AuthContext} from "../../context/AuthProvider.jsx";
import {useGetGameDetails} from "../../hooks/useGames.js";
import {useGetUserFavorites} from "../../hooks/useUser.js";
import {getToken, getTokenUsername} from "../../helpers/auth.js";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import GameCard from "../../components/gameCard/GameCard.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import SortingFilter from "../../components/sortingFilter/SortingFilter.jsx";
import './Favorites.css';

function Favorites () {
    const { selectedTheme } = useContext(ThemeContext)
    const { authData } = useContext(AuthContext)

    const { getGameDetails, data:gameDetailData, loading:gameDetailLoading, error:gameDetailError } = useGetGameDetails();
    const { getUserFavorites, data:getUserFavoritesData} = useGetUserFavorites();


    const [ gameList, setGameList] = useState([]);
    const [ loadingGames, setLoadingGames] = useState(false)

    const currentToken = authData.user && getToken()
    const tokenUsername = authData.user && getTokenUsername(currentToken)

    useEffect(() => {
        // gets user favorites
        getUserFavorites(tokenUsername, currentToken)
    }, [])

    useEffect(() => {
        // loops through the favorites and gets the details from the API
        getUserFavoritesData?.favorite_games?.forEach(function (item) {
            getGameDetails(item)
            setLoadingGames(true);
        })
    }, [getUserFavoritesData])

    useEffect(() => {
        // checks if gameDetailData is truthy
        if (gameDetailData) {
            // puts gameDetailData in gameList state
            setGameList(prevList => {
                // checks
                if (!prevList.some(game => game?.id === gameDetailData?.id)) {
                    return [...prevList, gameDetailData];
                }
                return prevList;
            });
        }
        setLoadingGames(false);
    }, [gameDetailData]);


    return(
        <main className={`page-container ${selectedTheme} favorites-page-container`}>
            <section className={`section-inner-container favorite-games-section-inner-container`}>
                <span className={"section-title-wrapper"}>
                    <h2 className={`section-title recommended-title`}>Jouw favorieten</h2>
                    <span className={"sorting-filter-wrapper state-two"}>
                                <SortingFilter content={"Sorteer op:"} type={'sorting'}/>
                                <SortingFilter content={"Filter op:"} type={"filter"}/>
                    </span>
                    <span className={"hidden-item"}></span>

                </span>
                <StatusMessage statusState={loadingGames} type={"loading"} content={"Laden"}/>

                {loadingGames === false && gameList && <section className={"game-card-wrapper"}>
                        { gameList.map(game => (
                            <GameCard
                                key={game?.id}
                                gameTitle={game?.name}
                                gameImage={game?.background_image}
                                gamePlatforms={game?.parent_platforms}
                                gameId={game?.id}
                                favorite={false}
                            />
                        ))}
                    </section>
                }

            {/*  TODO PAGINATION  */}
            </section>
        </main>

    );
}

export default Favorites;