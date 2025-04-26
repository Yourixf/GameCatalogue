import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import GamePlatformIcons from "../gamePlatformIcons/GamePlatformIcons.jsx";
import './GameCard.css';


function GameCard ({className="", gameTitle="", gameImage="", gamePlatforms="", gameId=null, favorite=false }) {
    const { selectedTheme } = useContext(ThemeContext)
    const navigate = useNavigate()

    function openDetails (id) {
        navigate('/game/' + id)
    }

    return (

        <article onClick={() => openDetails(gameId)} className={`game-card-main ${className} ${selectedTheme}`}>
            <figure className={"game-card-picture"}>

                {favorite && <span className={"game-text-label"}>favoriet</span>}
                <img className={"game-image"} src={gameImage} alt="game-image"/>
            </figure>
            <p className={`game-card-title`}>{gameTitle}</p>
            {gamePlatforms && <GamePlatformIcons platforms={gamePlatforms} />}
        </article>
    )
}

export default GameCard;