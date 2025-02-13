import './GameCard.css';

import android from '../../assets/platforms/android.png'
import apple from '../../assets/platforms/apple.png'
import playstation from '../../assets/platforms/playstation.png'
import nitendoswitch from '../../assets/platforms/nitendoswitch.png'
import windwows from '../../assets/platforms/windows.png'
import xbox from '../../assets/platforms/xbox.png'
import pubgImg from '../../assets/TEMPGAMEBACKGROUND.png'

function GameCard () {
    return (

        <div className={"game-card-main"}>

            <div className={"game-card-picture"}>
                <span className={"game-favorite-label"}>favoriet</span>
                <img className={"game-image"} src={pubgImg} alt="game-image"/>
            </div>
            <div className={"game-card-title"}>PlayerUnknown’s Battlegrounds</div>
            <div className={"game-card-platforms"}>
                <img className={"platform-icon"}  src={windwows} alt="windows-icon"/>
                <img className={"platform-icon"} src={playstation} alt="playstation-icon"/>
                <img className={"platform-icon"} src={xbox} alt="xbox-icon"/>
                <img className={"platform-icon"} src={apple} alt="apple-icon"/>
                <img className={"platform-icon"} src={android} alt="android-icon"/>
                <img className={"platform-icon"} src={nitendoswitch} alt="nitendoswitch-icon"/>
            </div>

        </div>
    )
}

export default GameCard;