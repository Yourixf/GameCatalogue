import './GameDetails.css'
import {useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {useGetGameDetails, useGetGameScreenshots} from "../../hooks/useGames.js";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import GameCard from "../../components/gameCard/GameCard.jsx";
import pubgImg from "../../assets/TEMPGAMEBACKGROUND.png";
import windwows from "../../assets/platforms/windows.png";
import playstation from "../../assets/platforms/playstation.png";
import xbox from "../../assets/platforms/xbox.png";
import apple from "../../assets/platforms/apple.png";
import android from "../../assets/platforms/android.png";
import nitendoswitch from "../../assets/platforms/nitendoswitch.png";
import Button from "../../components/button/Button.jsx";


function GameDetails () {
    const { selectedTheme } = useContext(ThemeContext)
    const { getGameDetails, data:gameDetailData, loading:gameDetailLoading, error:gameDetailError } = useGetGameDetails();
    const { getGameScreenshots, data:gameScreenshotData, loading:gameScreenshotLoading, error:gameScreenshotError } = useGetGameScreenshots()

    const [mainGamePicture, setMainGamePicture] = useState();

    let {id} = useParams();
    id = parseInt(id);

    useEffect(() => {
        getGameDetails(id)
        getGameScreenshots(id)


    }, [id])

    useEffect(() => {
        if (gameDetailData && gameDetailData.background_image) {
            setMainGamePicture(gameDetailData.background_image)
        }
    }, [gameDetailData])

    useEffect(() => {
        console.log("data updated:", gameDetailData);
    }, [gameDetailData]);


    function replaceMainGamePicture (image) {
        setMainGamePicture(image)
    }

    // for the game pictures : https://api.rawg.io/docs/#operation/games_screenshots_list

    return (
        <main className={`page-container ${selectedTheme} game-detail-page-outer-container`}>
            <section className={"section-inner-container related-games-section-outer-container"}>
 
            </section>

            <StatusMessage statusState={gameDetailLoading} type={"loading"} content={"Laden..."}/>

            <StatusMessage statusState={gameDetailError} type={"error"} content={gameDetailError ?  gameDetailError.response.data : "er ging iets fout..."}/>

            { gameDetailData &&

                <section className={`section-inner-container game-detail-section-inner-container ${selectedTheme}`}>

                    <span className={"game-detail-section-wrapper"}>

                        <span className={"section-title-wrapper"}>
                            <h2 className={`section-title game-detail-title`}>{gameDetailData.name}</h2>
                        </span>
                        <article className={`game-detail-card ${selectedTheme}`}>
                            <span className={`game-detail-card-image-section`}>
                                <figure className={`game-detail-game-image-wrapper`}>
                                    <img className={`game-detail-game-image`} src={mainGamePicture} alt="game-image"/>
                                </figure>

                                <span className={`game-screenshots-wrapper`}>

                                    <figure onClick={() => replaceMainGamePicture(gameDetailData.background_image)}
                                            className={`game-screenshot-figure`}>
                                            <img className={`game-screenshot`} src={gameDetailData.background_image}
                                                 alt="test"/>
                                    </figure>
                                    {gameScreenshotData ? gameScreenshotData.results.map(screenshot => (

                                        <figure onClick={() => replaceMainGamePicture(screenshot.image)}
                                                className={`game-screenshot-figure`} key={screenshot.id}>
                                            <img className={`game-screenshot`} src={screenshot.image}
                                                 alt={`${gameDetailData.name} screenshot`}/>
                                        </figure>
                                    )) : <h3>Geen screenshots</h3>

                                    }
                                </span>

                            </span>



                            <span className={`game-detail-game-info-wrapper`}>
                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-description`}>omschrijving</h3>
                                    <h3 className={`game-detail-text-content`}></h3>
                                </div>

                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-description`}>Uitgifte datum</h3>
                                    <h3 className={`game-detail-text-content`}>{gameDetailData.released}</h3>
                                </div>
                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-description`}>Metascore</h3>
                                    <h3 className={`game-detail-text-content`}>{gameDetailData.metacritic}</h3>
                                </div>
                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-description`}>Gemiddelde speeltijd</h3>
                                    <h3 className={`game-detail-text-content`}>{gameDetailData.playtime} uur</h3>
                                </div>

                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-description`}>Makers</h3>
                                    {gameDetailData.developers.map(developer => (
                                        <h3 key={developer.id}
                                            className={`game-detail-text-content`}> {developer.name} </h3>
                                    ))}

                                </div>

                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-description`}>genre</h3>

                                    {gameDetailData.genres.map(genre => (
                                        <h3 key={genre.id} className={`game-detail-text-content`}>{genre.name}</h3>
                                    ))}


                                </div>

                                <figure className={"game-detail-game-card-platforms"}>
                                    <img className={"platform-icon"} src={windwows} alt="windows-icon"/>
                                    <img className={"platform-icon"} src={playstation} alt="playstation-icon"/>
                                    <img className={"platform-icon"} src={xbox} alt="xbox-icon"/>
                                    <img className={"platform-icon"} src={apple} alt="apple-icon"/>
                                    <img className={"platform-icon"} src={android} alt="android-icon"/>
                                    <img className={"platform-icon"} src={nitendoswitch} alt="nitendoswitch-icon"/>
                                </figure>
                            </span>
                        </article>
                        <span className={"section-footer-wrapper"}>
                            <Button className={`section-favorite-button`} content={"Voeg to aan favorieten"}/>
                        </span>
                    </span>
                </section>
            }

        </main>

    )
}

export default GameDetails;