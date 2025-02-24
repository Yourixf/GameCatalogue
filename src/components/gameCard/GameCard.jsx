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

/* in data would be the, data object itself > results object > platforms list with object in
 > sepperate platform object(s) :
 "platforms": [
{
"platform": {
"id": 0,
"slug": "string",
"name": "string"
},
"released_at": "string",
"requirements": {
"minimum": "string",
"recommended": "string"
}
}
]
*  */

// when adding API data, i will add the code for the dynamic part.
function GameCard ({className="" }) {
    const { selectedTheme } = useContext(ThemeContext)


    return (

        <article className={`game-card-main ${className} ${selectedTheme}`}>

            <div className={"game-card-picture"}>
                <span className={"game-text-label"}>favoriet</span>
                <img className={"game-image"} src={pubgImg} alt="game-image"/>
            </div>
            <div className={`game-card-title`}>PlayerUnknown’s Battlegrounds</div>
            <div className={"game-card-platforms"}>
                <img className={"platform-icon"}  src={windwows} alt="windows-icon"/>
                <img className={"platform-icon"} src={playstation} alt="playstation-icon"/>
                <img className={"platform-icon"} src={xbox} alt="xbox-icon"/>
                <img className={"platform-icon"} src={apple} alt="apple-icon"/>
                <img className={"platform-icon"} src={android} alt="android-icon"/>
                <img className={"platform-icon"} src={nitendoswitch} alt="nitendoswitch-icon"/>
            </div>

        </article>
    )
}

export default GameCard;