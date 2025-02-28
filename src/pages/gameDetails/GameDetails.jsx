import './GameDetails.css'
import {useParams} from "react-router-dom";
import React, {useContext, useEffect} from "react";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {useGetGameDetails} from "../../hooks/useGames.js";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import GameCard from "../../components/gameCard/GameCard.jsx";
import pubgImg from "../../assets/TEMPGAMEBACKGROUND.png";
import windwows from "../../assets/platforms/windows.png";
import playstation from "../../assets/platforms/playstation.png";
import xbox from "../../assets/platforms/xbox.png";
import apple from "../../assets/platforms/apple.png";
import android from "../../assets/platforms/android.png";
import nitendoswitch from "../../assets/platforms/nitendoswitch.png";


function GameDetails () {
    const { selectedTheme } = useContext(ThemeContext)
    const { getGameDetails, data, loading, error } = useGetGameDetails();

    let {id} = useParams();
    id = parseInt(id);


    useEffect(() => {
        gameDetails(id).then(result => {
            console.log("data", data)
        })
    }, [])


    async function gameDetails (id) {
        await getGameDetails(id)
    }

    // for the game pictures : https://api.rawg.io/docs/#operation/games_screenshots_list

    return (
        <main className={`page-container ${selectedTheme} game-detail-page-outer-container`}>

            <section className={"section-inner-container related-games-section-outer-container"}>
 
            </section>

            <section className={`section-inner-container game-detail-section-inner-container ${selectedTheme}`}>

                <span className={"game-detail-section-wrapper"}>

                    <span className={"section-title-wrapper"}>
                        <h2 className={`section-title game-detail-title`}>NAAM</h2>
                    </span>
                    <article className={`game-detail-card ${selectedTheme}`}>
                        <figure className={`game-detail-game-image-wrapper`}>
                            <img className={`game-detail-game-image`} src={pubgImg} alt="game-image"/>
                        </figure>
                        <span className={`game-detail-game-info-wrapper`}>
                            <div className={`game-detail-text-info`}>
                                <h3 className={`game-detail-text-description`}>omschrijving</h3>
                                <h3 className={`game-detail-text-content`}></h3>
                            </div>

                            <div className={`game-detail-text-info`}>
                                <h3 className={`game-detail-text-description`}>Uitgifte datum</h3>
                                <h3 className={`game-detail-text-content`}>23 maart 2017</h3>
                            </div>
                            <div className={`game-detail-text-info`}>
                                <h3 className={`game-detail-text-description`}>Metascore</h3>
                                <h3 className={`game-detail-text-content`}>81</h3>
                            </div>
                            <div className={`game-detail-text-info`}>
                                <h3 className={`game-detail-text-description`}>playtime</h3>
                                <h3 className={`game-detail-text-content`}>playtime</h3>
                            </div>

                            <div className={`game-detail-text-info`}>
                                <h3 className={`game-detail-text-description`}>creators</h3>
                                <h3 className={`game-detail-text-content`}>creators</h3>
                            </div>

                            <div className={`game-detail-text-info`}>
                                <h3 className={`game-detail-text-description`}>genre</h3>
                                <h3 className={`game-detail-text-content`}>gere</h3>
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
                </span>
            </section>

        </main>

    )
}

export default GameDetails;