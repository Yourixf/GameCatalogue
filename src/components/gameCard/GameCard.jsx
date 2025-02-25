import './GameCard.css';

import android from '../../assets/platforms/android.png'
import apple from '../../assets/platforms/apple.png'
import playstation from '../../assets/platforms/playstation.png'
import nitendoswitch from '../../assets/platforms/nitendoswitch.png'
import windwows from '../../assets/platforms/windows.png'
import xbox from '../../assets/platforms/xbox.png'
import pubgImg from '../../assets/TEMPGAMEBACKGROUND.png'
import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {amd} from "globals";


function GameCard ({className="", gameTitle="", gameImage="", gamePlatforms="", onClick=null }) {
    const { selectedTheme } = useContext(ThemeContext)

    console.log(gamePlatforms)

    const platformIdList = {
        pc: [4],
        apple: [5],
        playstation: [187, 18, 16, 15, 27, 19, 17],
        xbox: [1, 186, 14, 80],
        android: [21],
        nitendo: [7, 8, 9, 13, 10, 11, 105, 83, 24, 43, 26]
    };
    const platformIconList = {
        pc: windwows,
        apple: apple,
        playstation: playstation,
        xbox: xbox,
        android: android,
        nitendo: nitendoswitch
    };

    // const platformList = {
    //
    // }
    //WIP

    return (

        <article onClick={onClick} className={`game-card-main ${className} ${selectedTheme}`}>

            <figure className={"game-card-picture"}>
                <span className={"game-text-label"}>favoriet</span>
                <img className={"game-image"} src={gameImage} alt="game-image"/>
            </figure>
            <div className={`game-card-title`}>{gameTitle}</div>
            <figure className={"game-card-platforms"}>
                {gamePlatforms && gamePlatforms.length > 0 ? gamePlatforms.map(platform => (
                    console.log(platform.platform.id),
                    console.log(platformIdList.playstation),
                    console.log(
                    platformIdList.pc.includes(platform.platform.id))

                )) :
                    <h3>geen platform</h3>

                }

                <img className={"platform-icon"}  src={windwows} alt="windows-icon"/>
                <img className={"platform-icon"} src={playstation} alt="playstation-icon"/>
                <img className={"platform-icon"} src={xbox} alt="xbox-icon"/>
                <img className={"platform-icon"} src={apple} alt="apple-icon"/>
                <img className={"platform-icon"} src={android} alt="android-icon"/>
                <img className={"platform-icon"} src={nitendoswitch} alt="nitendoswitch-icon"/>
            </figure>

        </article>
    )
}

export default GameCard;