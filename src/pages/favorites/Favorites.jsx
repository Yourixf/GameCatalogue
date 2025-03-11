import {useContext, useEffect, useState} from 'react';
import './Favorites.css';
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {useGetGameDetails} from "../../hooks/useGames.js";
import {useGetUserFavorites} from "../../hooks/useUser.js";
import {getToken, getTokenUsername} from "../../helpers/auth.js";
import {AuthContext} from "../../context/AuthProvider.jsx";
import {set} from "react-hook-form";

function Favorites () {
    const { selectedTheme } = useContext(ThemeContext)
    const { authData } = useContext(AuthContext)

    const { getGameDetails, data:gameDetailData, loading:gameDetailLoading, error:gameDetailError } = useGetGameDetails();
    const { getUserFavorites, data:getUserFavoritesData} = useGetUserFavorites();


    const [ gameList, setGameList] = useState([]);

    const currentToken = authData.user && getToken()
    const tokenUsername = authData.user && getTokenUsername(currentToken)

    useEffect(() => {
        getUserFavorites(tokenUsername, currentToken)
        console.log("INITIAL LOAD")
    }, [])

    useEffect(() => {
        console.log(getUserFavoritesData?.favorite_games.forEach(function (item) {
            getGameDetails(item)
        }))
    }, [getUserFavoritesData])

    useEffect(() => {
        console.log(gameDetailData)

        gameList && setGameList(prevList =>
            prevList.some(game => game?.id === gameDetailData?.id) ?
                prevList :
                [...prevList, gameDetailData])

    }, [gameDetailData])

    return(
        <main className={`page-container ${selectedTheme} favorites-page-container`}>
            <section className={`section-inner-container favorite-games-section-inner-container`}>
                <h1>Favorites PAGINA</h1>

                {console.warn(gameList)}

            </section>
        </main>

    );
}

export default Favorites;