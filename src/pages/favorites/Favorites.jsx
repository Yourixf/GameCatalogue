import {useContext, useEffect, useState} from 'react';
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {AuthContext} from "../../context/AuthProvider.jsx";
import {UserInfoContext} from "../../context/UserInfoProvider.jsx";
import {useGetCurrentGameList, useGetGameDetails} from "../../hooks/useGames.js";
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
    const { userInfo } = useContext(UserInfoContext)

    const { getGameDetails, data:gameDetailData, loading:gameDetailLoading, error:gameDetailError } = useGetGameDetails();
    const { getUserFavorites, data:getUserFavoritesData} = useGetUserFavorites();

    const [ gameList, setGameList] = useState([]);
    const [ loadingGames, setLoadingGames] = useState(false)

    const currentToken = authData.user && getToken()
    const tokenUsername = authData.user && getTokenUsername(currentToken)

    const {
        handleSortingChange,
        handleFilterChange,
        sortingFilters
    } = useGetCurrentGameList()

    useEffect(() => {
        // gets user favorites
        getUserFavorites(tokenUsername, currentToken)
    }, [])


    useEffect(() => {
        async function fetchFavoriteDetails() {
            if (!getUserFavoritesData?.favorite_games) return;

            setLoadingGames(true);

            const favoriteIds = [...new Set(
                Object.values(getUserFavoritesData.favorite_games).flat()
            )];

            const gamePromises = favoriteIds.map(id => getGameDetails(id));
            const resolvedGames = await Promise.all(gamePromises);

            const validGames = resolvedGames.filter(game => game?.data);
            setGameList(validGames.map(g => g.data));

            setLoadingGames(false);
        }

        fetchFavoriteDetails();
    }, [getUserFavoritesData]);


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

            {!loadingGames && gameList.length <= 0 && [...new Set(Object.values(userInfo.userInfoData?.favorite_games || {}).flat())].length === 0 &&
                <StatusMessage statusState={true} type={"error"}
                               content={gameDetailError ? gameDetailError?.message : "Je hebt geen favorieten."}/>
            }

            {!loadingGames && gameList.length > 0 &&
                <section className={`section-outer-container favorite-games-section-outer-container`}>
                    <section className={`section-inner-container favorite-games-section-inner-container`}>
                        <span className={"section-title-wrapper"}>
                            <h2 className={`section-title recommended-title`}>Jouw favorieten</h2>
                            <span className={"sorting-filter-wrapper state-two"}>
                                    {/*<SortingFilter*/}
                                    {/*    onApplyFilters={handleSortingChange}*/}
                                    {/*    content={"Sorteer op:"}*/}
                                    {/*    type={'sorting'}*/}
                                    {/*    selectedFilters={sortingFilters?.sort}*/}
                                    {/*/>*/}
                                    {/*<SortingFilter*/}
                                    {/*    onApplyFilters={handleFilterChange}*/}
                                    {/*    content={"Filter op:"}*/}
                                    {/*    type={"filter"}*/}
                                    {/*    selectedFilters={sortingFilters?.genres}*/}
                                    {/*/>*/}
                            </span>
                                <span className={"hidden-item"}></span>
                        </span>
                        <StatusMessage statusState={loadingGames || gameDetailLoading} type={"loading"} content={"Laden"}/>
                        <section className={"game-card-wrapper"}>
                            {gameList.map(game => (
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
                        {/*  TODO PAGINATION  */}
                    </section>
                </section>
            }
        </main>

    );
}

export default Favorites;