import {useContext, useEffect, useState} from 'react';
import './Favorites.css';
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {useGetGameDetails} from "../../hooks/useGames.js";
import {useGetUserFavorites} from "../../hooks/useUser.js";
import {getToken, getTokenUsername} from "../../helpers/auth.js";
import {AuthContext} from "../../context/AuthProvider.jsx";
import {set} from "react-hook-form";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import GameCard from "../../components/gameCard/GameCard.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";

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
        getUserFavorites(tokenUsername, currentToken)
        console.log("INITIAL LOAD")
    }, [])

    useEffect(() => {
        getUserFavoritesData?.favorite_games?.forEach(function (item) {
            getGameDetails(item)
            setLoadingGames(true);
        })
    }, [getUserFavoritesData])

    useEffect(() => {
        if (gameDetailData) {
            setGameList(prevList => {
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
                <h1>Favorites PAGINA</h1>

                <StatusMessage statusState={loadingGames} type={"loading"} content={"Laden..."}/>

                {loadingGames === false && gameList && <section className={"game-card-wrapper"}>
                        { gameList.map(game => (
                            <GameCard
                                key={game?.id}
                                gameTitle={game?.name}
                                gameImage={game?.background_image}
                                gamePlatforms={game?.parent_platforms}
                                gameId={game?.id}
                                favorite={true}
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