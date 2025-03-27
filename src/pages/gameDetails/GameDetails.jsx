import {useParams} from "react-router-dom";
import  {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {AuthContext} from "../../context/AuthProvider.jsx";
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
        let favoriteGames = { favorite_games: []}

        console.log(getUserFavoritesData)

        favoriteGames = getUserFavoritesData
        console.log(favoriteGames.favorite_games)
        console.log(favoriteGames.favorite_games.includes(Number(id)))

        if (favoriteGames?.favorite_games?.includes(Number(id))) {
            console.log("BEVAT INDERDAAD")

            console.log(favoriteGames)
            favoriteGames.favorite_games = favoriteGames.favorite_games.filter((game) => {
                console.log(game)
                return game !== Number(id)
            })
            // console.log(testlist)
            console.log(favoriteGames)

            let favoriteGamesString = JSON.stringify(favoriteGames)
            let formData = {
                info: favoriteGamesString
            }
            await updateUserInfo(formData, currentToken, tokenUsername)
        } else if (!favoriteGames?.favorite_games?.includes(Number(id))) {
            console.log("BEVAT NIET")
            favoriteGames.favorite_games.push(Number(id))
            let favoriteGamesString = JSON.stringify(favoriteGames)
            let formData = {
                info: favoriteGamesString
            }
            await updateUserInfo(formData, currentToken, tokenUsername)
        } else {
            console.log("ER GING WAT FOUT")
        }
    }

    function checkFavorite () {
        return !!getUserFavoritesData?.favorite_games?.includes(Number(id))
    }

    return (
        <main className={`page-container ${selectedTheme} game-detail-page-outer-container`}>
            <section className={"section-inner-container related-games-section-outer-container"}>

            </section>

            <span className={`status-message-wrapper`}>
                 <StatusMessage statusState={gameDetailLoading} type={"loading"} content={"Game info laden..."}/>
                <StatusMessage statusState={gameScreenshotLoading} type={"loading"} content={"Game screenshot laden..."}/>
                <StatusMessage statusState={gameDetailError} type={"error"} content={gameDetailError ?  gameDetailError?.response?.data : "er ging iets fout bij het ophalen van de game data..."}/>
                <StatusMessage statusState={gameScreenshotError} type={"error"} content={gameDetailError ?  gameDetailError?.response?.data : "er ging iets fout bij het ophalen van de game screenshot..."}/>
            </span>

            { gameDetailData &&
                <section className={`section-inner-container game-detail-section-inner-container ${selectedTheme}`}>
                    <span className={"game-detail-section-wrapper"}>

                        <span className={"section-title-wrapper"}>
                            <h2 className={`section-title game-detail-title`}>{gameDetailData.name}</h2>
                        </span>
                        <article className={`game-detail-card ${selectedTheme}`}>

                            {/* when there is either a background image or additional image */}
                            {gameDetailData?.background_image || gameDetailData?.background_image_additional ?
                                <span className={`game-detail-card-image-section`}>
                                    <figure className={`game-detail-game-image-wrapper`}>
                                        <img className={`game-detail-game-image`} src={mainGamePicture} alt="game-image"/>
                                    </figure>

                                    {/* when there is either a additional image - TO DO: WHEN ONLY ADDITIONAL IS ALSO THE MAIN ONE */}
                                    {gameScreenshotData && gameScreenshotData?.results.map(screenshot => ( screenshot.image !== gameDetailData.background_image )) ?
                                        <span className={`game-screenshots-wrapper ${descriptionView ? `description-expended` : `description-unextended`}`}>

                                            <figure onClick={() => replaceMainGamePicture(gameDetailData.background_image)}
                                                    className={`game-screenshot-figure`}>
                                                    <img className={`game-screenshot`} src={gameDetailData.background_image}
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

                                                screenshot.image !== gameDetailData.background_image ?
                                                    <figure onClick={() => replaceMainGamePicture(screenshot.image)}
                                                            className={`game-screenshot-figure`} key={screenshot.id}>
                                                        <img className={`game-screenshot`} src={screenshot.image}
                                                             alt={`${gameDetailData.name} screenshot`}/>
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
                                    <p onClick={changeDescriptionView}
                                        className={`game-detail-text-content game-description-text ${descriptionView ? `description-expended` : `description-unextended`}`}>{gameDetailData.description_raw}</p>
                                </div>

                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-name`}>uitgifte datum</h3>
                                    <p className={`game-detail-text-content`}>{gameDetailData.released}</p>
                                </div>
                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-name`}>metascore</h3>

                                    <Metascore className={`game-detail-text-content`}
                                               value={gameDetailData.metacritic}/>
                                </div>
                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-name`}>gemiddelde speeltijd</h3>
                                    <p className={`game-detail-text-content`}>{gameDetailData.playtime} uur</p>
                                </div>

                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-name`}>makers</h3>
                                    {gameDetailData.developers.map(developer => (
                                        <p key={developer.id}
                                            className={`game-detail-text-content`}> {developer.name} </p>
                                    ))}

                                </div>

                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-name`}>genre</h3>

                                    {gameDetailData.genres.map(genre => (
                                        <p key={genre.id} className={`game-detail-text-content`}>{genre.name}</p>
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