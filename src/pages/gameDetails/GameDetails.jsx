import {useParams} from "react-router-dom";
import  {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {AuthContext} from "../../context/AuthProvider.jsx";
import {UserInfoContext} from "../../context/UserInfoProvider.jsx";
import {useGetGameDetails, useGetGameScreenshots} from "../../hooks/useGames.js";
import {useGetUserFavorites, useUpdateUserInfo} from "../../hooks/useUser.js";
import {getToken, getTokenUsername} from "../../helpers/auth.js";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";;
import Button from "../../components/button/Button.jsx";
import Metascore from "../../components/metascore/Metascore.jsx";
import GamePlatformIcons from "../../components/gamePlatformIcons/GamePlatformIcons.jsx";
import './GameDetails.css'


function GameDetails () {
    const { selectedTheme } = useContext(ThemeContext)
    const { authData } = useContext(AuthContext)
    const { userInfo } = useContext(UserInfoContext)


    const [mainGamePicture, setMainGamePicture] = useState();
    const [descriptionView, setDesccriptionView] = useState(false);

    const { getGameDetails, data:gameDetailData, loading:gameDetailLoading, error:gameDetailError } = useGetGameDetails();
    const { getGameScreenshots, data:gameScreenshotData, loading:gameScreenshotLoading, error:gameScreenshotError } = useGetGameScreenshots()
    const { updateUserInfo, data:updateUserInfoData} = useUpdateUserInfo();
    const { getUserFavorites, data:getUserFavoritesData} = useGetUserFavorites();

    const currentToken = authData.user && getToken()
    const tokenUsername = authData.user && getTokenUsername(currentToken)

    let {id} = useParams();
    id = parseInt(id);

    useEffect(() => {
        getGameDetails(id)
        getGameScreenshots(id)
    }, [id])

    useEffect(() => {
        if (gameDetailData && gameDetailData?.background_image ) {
            setMainGamePicture(gameDetailData?.background_image)
        }

    }, [gameDetailData])

    useEffect(() => {
        console.log(gameDetailData)
    }, [gameDetailData])

    useEffect(() => {
        console.log("updateUserInfoData veranderd:", updateUserInfoData, getUserFavoritesData);
        getUserFavorites(tokenUsername, currentToken)
    }, [updateUserInfoData,])


    function replaceMainGamePicture (image) {
        setMainGamePicture(image)
    }

    function changeDescriptionView () {
        setDesccriptionView(!descriptionView)
    }

    async function handleFavoriteClick() {
        if (!gameDetailData?.genres) return;

        const gameId = Number(id);
        const genres = gameDetailData.genres.map(genre => genre.slug);
        const isAlreadyFavorite = checkFavorite(gameId);

        const favoriteGames = {
            profile_picture: getUserFavoritesData?.profile_picture || "defaultProfile.png",
            favorite_games: typeof getUserFavoritesData?.favorite_games === "object" && !Array.isArray(getUserFavoritesData.favorite_games)
                ? { ...getUserFavoritesData.favorite_games }
                : {}
        };

        genres.forEach(genre => {
            if (!favoriteGames.favorite_games[genre]) {
                favoriteGames.favorite_games[genre] = [];
            }

            if (isAlreadyFavorite) {
                favoriteGames.favorite_games[genre] = favoriteGames.favorite_games[genre].filter(id => id !== gameId);
                if (favoriteGames.favorite_games[genre].length === 0) {
                    delete favoriteGames.favorite_games[genre];
                }
            } else {
                if (!favoriteGames.favorite_games[genre].includes(gameId)) {
                    favoriteGames.favorite_games[genre].push(gameId);
                }
            }
        });

        console.log("favoriteGames:", favoriteGames);

        const formData = {
            info: JSON.stringify(favoriteGames)
        };

        console.log("formData:", formData);

        await updateUserInfo(formData, currentToken, tokenUsername);
        userInfo.refreshUserInfo();
    }

    function checkFavorite () {
        if (!authData.user || !getUserFavoritesData?.favorite_games) return false;
        return Object.values(getUserFavoritesData.favorite_games).some(ids => ids.includes(Number(id)))
    }

    return (
        <main className={`page-container ${selectedTheme} game-detail-page-outer-container`}>
            <section className={"section-inner-container related-games-section-outer-container"}>

            </section>

            <span className={`status-message-wrapper`}>
                 <StatusMessage statusState={gameDetailLoading} type={"loading"} content={"Game info laden"}/>
                <StatusMessage statusState={gameScreenshotLoading} type={"loading"} content={"Game screenshot laden"}/>
                <StatusMessage statusState={gameDetailError} type={"error"} content={gameDetailError ?  gameDetailError?.response?.data : "er ging iets fout bij het ophalen van de game data..."}/>
                <StatusMessage statusState={gameScreenshotError} type={"error"} content={gameDetailError ?  gameDetailError?.response?.data : "er ging iets fout bij het ophalen van de game screenshot..."}/>
            </span>

            { gameDetailData &&
                <section className={`section-inner-container game-detail-section-inner-container ${selectedTheme} ${!gameDetailData?.background_image && !gameDetailData?.background_image_additional && "no-pictures"}`}>
                    <span className={`game-detail-section-wrapper ${!gameDetailData?.background_image && !gameDetailData?.background_image_additional && "no-pictures"}`}>

                        <span className={"section-title-wrapper"}>
                            <h2 className={`section-title game-detail-title`}>{gameDetailData.name}</h2>
                        </span>
                        <article className={`game-detail-card ${selectedTheme} ${!gameDetailData?.background_image && !gameDetailData?.background_image_additional && "no-pictures"}`}>

                            {/* when there is either a background image or additional image */}
                            {gameDetailData?.background_image || gameDetailData?.background_image_additional ?
                                <span className={`game-detail-card-image-section`}>
                                    <figure className={`game-detail-game-image-wrapper`}>
                                        <img className={`game-detail-game-image`} src={mainGamePicture} alt="game-image"/>
                                    </figure>

                                    {/* when there is either a additional image - TO DO: WHEN ONLY ADDITIONAL IS ALSO THE MAIN ONE */}
                                    {gameScreenshotData && gameScreenshotData?.results?.map(screenshot => ( screenshot.image !== gameDetailData?.background_image )) ?
                                        <span className={`game-screenshots-wrapper ${descriptionView ? `description-expended` : `description-unextended`}`}>

                                            <figure onClick={() => replaceMainGamePicture(gameDetailData?.background_image)}
                                                    className={`game-screenshot-figure`}>
                                                    <img className={`game-screenshot`} src={gameDetailData?.background_image}
                                                         alt="game screenshot"/>
                                            </figure>

                                            {gameDetailData?.background_image_additional && [
                                                <figure key={1}
                                                        onClick={() => replaceMainGamePicture(gameDetailData?.background_image_additional)}
                                                        className={`game-screenshot-figure`}>
                                                    <img className={`game-screenshot`}
                                                         src={gameDetailData?.background_image_additional}
                                                         alt="game screenshot"/>
                                                </figure>
                                            ]}

                                            {/*for when the additional image equals the main one*/}
                                            {gameScreenshotData ? gameScreenshotData?.results.map(screenshot => (

                                                screenshot.image !== gameDetailData?.background_image ?
                                                    <figure onClick={() => replaceMainGamePicture(screenshot.image)}
                                                            className={`game-screenshot-figure`} key={screenshot.id}>
                                                        <img className={`game-screenshot`} src={screenshot.image}
                                                             alt={`${gameDetailData?.name} screenshot`}/>
                                                    </figure>
                                                    :
                                                    null
                                            )) : <h3>Geen screenshots</h3>

                                            }
                                        </span>
                                        :
                                        null
                                    }
                                </span>
                                :
                                null

                            }


                            <span className={`game-detail-game-info-wrapper ${descriptionView ? `description-expended` : `description-unextended`}`}>
                                <div className={`game-detail-text-info game-description-wrapper`}>
                                    <h3 className={`game-detail-text-name`}>omschrijving</h3>
                                    <h3 onClick={changeDescriptionView}
                                        className={`game-detail-text-content game-description-text ${descriptionView ? `description-expended` : `description-unextended`}`}>{gameDetailData?.description_raw}</h3>
                                </div>

                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-name`}>uitgifte datum</h3>
                                    <h3 className={`game-detail-text-content`}>{gameDetailData?.released}</h3>
                                </div>
                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-name`}>metascore</h3>

                                    <Metascore className={`game-detail-text-content`}
                                               value={gameDetailData?.metacritic}/>
                                </div>
                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-name`}>gemiddelde speeltijd</h3>
                                    <h3 className={`game-detail-text-content`}>{gameDetailData?.playtime} uur</h3>
                                </div>

                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-name`}>makers</h3>
                                    {gameDetailData?.developers?.map(developer => (
                                        <h3 key={developer.id}
                                            className={`game-detail-text-content`}> {developer.name} </h3>
                                    ))}

                                </div>

                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-name`}>genre</h3>

                                    {gameDetailData.genres.map(genre => (
                                        <h3 key={genre.id} className={`game-detail-text-content`}>{genre.name}</h3>
                                    ))}

                                </div>

                                {gameDetailData && <GamePlatformIcons platforms={gameDetailData.parent_platforms} className={`game-detail-game-card-platforms`} />}
                            </span>
                        </article>

                        {authData.user && <span className={"section-footer-wrapper"}>
                            <Button onClick={handleFavoriteClick}
                                    className={`section-favorite-button`}
                                // content={"Voeg to aan favorieten"}
                                    content={checkFavorite() ? 'Verwijder van favorieten' : 'Voeg toe aan favorieten'}
                            />
                        </span>}
                    </span>
                </section>
            }
        </main>
    )
}

export default GameDetails;