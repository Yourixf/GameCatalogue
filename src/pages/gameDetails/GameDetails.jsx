import './GameDetails.css'
import {useParams} from "react-router-dom";
import  {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {useGetGameDetails, useGetGameScreenshots} from "../../hooks/useGames.js";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import windwows from "../../assets/platforms/windows.png";
import playstation from "../../assets/platforms/playstation.png";
import xbox from "../../assets/platforms/xbox.png";
import apple from "../../assets/platforms/apple.png";
import android from "../../assets/platforms/android.png";
import nitendoswitch from "../../assets/platforms/nitendoswitch.png";
import Button from "../../components/button/Button.jsx";
import Metascore from "../../components/metascore/Metascore.jsx";
import GamePlatformIcons from "../../components/gamePlatformIcons/GamePlatformIcons.jsx";


function GameDetails () {
    const { selectedTheme } = useContext(ThemeContext)
    const { getGameDetails, data:gameDetailData, loading:gameDetailLoading, error:gameDetailError } = useGetGameDetails();
    const { getGameScreenshots, data:gameScreenshotData, loading:gameScreenshotLoading, error:gameScreenshotError } = useGetGameScreenshots()

    const [mainGamePicture, setMainGamePicture] = useState();
    const [descriptionView, setDesccriptionView] = useState(false);

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

    function changeDescriptionView () {
        setDesccriptionView(!descriptionView)
    }

    const platformIdList = {
        pc: [1],
        apple: [5, 4],
        playstation: [2],
        xbox: [3],
        android: [8],
        nitendo: [7]
    };

    const platformIconList = {
        pc: windwows,
        apple: apple,
        playstation: playstation,
        xbox: xbox,
        android: android,
        nitendo: nitendoswitch
    };


    // async function platformApiCall() {
    //     try{
    //         const response = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${import.meta.env.VITE_RAWG_API_KEY}`)
    //
    //         console.log(response)
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }

//platform.platform.id
    function getPlatforms (gamePlatform) {
        const matchedPlatforms = gamePlatform.filter(platform =>
            Object.values(platformIdList).some(list => list.includes(platform.platform.id))
        );

        console.log(matchedPlatforms)
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

                                <span
                                    className={`game-screenshots-wrapper ${descriptionView ? `description-expended` : `description-unextended`}`}>

                                    <figure onClick={() => replaceMainGamePicture(gameDetailData.background_image)}
                                            className={`game-screenshot-figure`}>
                                            <img className={`game-screenshot`} src={gameDetailData.background_image}
                                                 alt="test"/>
                                    </figure>

                                    {gameDetailData && gameDetailData.background_image_additional [
                                        <figure onClick={() => replaceMainGamePicture(gameDetailData.background_image_additional)}
                                        className={`game-screenshot-figure`}>
                                        <img className={`game-screenshot`} src={gameDetailData.background_image_additional}
                                        alt="test"/>
                                        </figure>
                                        ]
                                    }

                                    <figure
                                        onClick={() => replaceMainGamePicture(gameDetailData.background_image_additional)}
                                        className={`game-screenshot-figure`}>
                                            <img className={`game-screenshot`}
                                                 src={gameDetailData.background_image_additional}
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



                            <span
                                className={`game-detail-game-info-wrapper ${descriptionView ? `description-expended` : `description-unextended`}`}>
                                <div className={`game-detail-text-info game-description-wrapper`}>
                                    <h3 className={`game-detail-text-name`}>omschrijving</h3>
                                    <h3 onClick={changeDescriptionView} className={`game-detail-text-content game-description-text ${descriptionView? `description-expended`:`description-unextended`}`}>{gameDetailData.description_raw}</h3>
                                </div>

                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-name`}>uitgifte datum</h3>
                                    <h3 className={`game-detail-text-content`}>{gameDetailData.released}</h3>
                                </div>
                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-name`}>metascore</h3>

                                    <Metascore className={`game-detail-text-content`} value={gameDetailData.metacritic} />
                                </div>
                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-name`}>gemiddelde speeltijd</h3>
                                    <h3 className={`game-detail-text-content`}>{gameDetailData.playtime} uur</h3>
                                </div>

                                <div className={`game-detail-text-info`}>
                                    <h3 className={`game-detail-text-name`}>makers</h3>
                                    {gameDetailData.developers.map(developer => (
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