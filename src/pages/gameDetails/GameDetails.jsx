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
            console.log(result)
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

            <section className={`section-inner-container game-detail-section-inner-container`}>
                <div className={`section-inner-container recommended-section-inner ${selectedTheme}`}>
                        <span className={"recommended-section-wrapper"}>

                            <span className={"section-title-wrapper"}>
                                <h2 className={`section-title recommended-title`}>PUBG</h2>
                            </span>
                            <article className={`recommended-card ${selectedTheme}`}>
                                <figure className={`recommended-game-image-wrapper`}>
                                <img className={`recommended-game-image`} src={pubgImg} alt="game-image"/>
                            </figure>
                            <span className={`recommended-game-info-wrapper`}>
                                <div className={`recommended-text-info`}>
                                    <h3 className={`recommended-text-description`}>omschrijving</h3>
                                    <h3 className={`recommended-text-content`}>omschrijving</h3>
                                </div>

                                <div className={`recommended-text-info`}>
                                    <h3 className={`recommended-text-description`}>Uitgifte datum</h3>
                                    <h3 className={`recommended-text-content`}>23 maart 2017</h3>
                                </div>
                                <div className={`recommended-text-info`}>
                                    <h3 className={`recommended-text-description`}>Metascore</h3>
                                    <h3 className={`recommended-text-content`}>81</h3>
                                </div>
                                <div className={`recommended-text-info`}>
                                    <h3 className={`recommended-text-description`}>playtime</h3>
                                    <h3 className={`recommended-text-content`}>playtime</h3>
                                </div>

                                <div className={`recommended-text-info`}>
                                    <h3 className={`recommended-text-description`}>creators</h3>
                                    <h3 className={`recommended-text-content`}>creators</h3>
                                </div>

                                <div className={`recommended-text-info`}>
                                    <h3 className={`recommended-text-description`}>genre</h3>
                                    <h3 className={`recommended-text-content`}>gere</h3>
                                </div>

                                <figure className={"recommended-game-card-platforms"}>
                                    <img className={"platform-icon"} src={windwows} alt="windows-icon"/>
                                    <img className={"platform-icon"} src={playstation} alt="playstation-icon"/>
                                    <img className={"platform-icon"} src={xbox} alt="xbox-icon"/>
                                    <img className={"platform-icon"} src={apple} alt="apple-icon"/>
                                    <img className={"platform-icon"} src={android} alt="android-icon"/>
                                    <img className={"platform-icon"} src={nitendoswitch} alt="nitendoswitch-icon"/>
                                </figure>
                            </span>
                            </article>
                            <nav className={`recommended-pagination`} aria-label={"recommended games pagination"}>
                                <span className={`recommended-pagination-other currently-selected`}
                                      aria-label={"game-1"}></span>
                                <span className={`recommended-pagination-other`} aria-label={"game 2"}></span>
                                <span className={`recommended-pagination-other`} aria-label={"game 3"}></span>
                                <span className={`recommended-pagination-other`} aria-label={"game 4"}></span>
                                <span className={`recommended-pagination-other`} aria-label={"game 5"}></span>
                                <span className={`recommended-pagination-other`} aria-label={"game 6"}></span>
                            </nav>
                        </span>
                </div>
            </section>

        </main>

    )
}

export default GameDetails;