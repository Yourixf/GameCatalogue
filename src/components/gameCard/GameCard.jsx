import './GameCard.css';
import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import GamePlatformIcons from "../gamePlatformIcons/GamePlatformIcons.jsx";
import {useNavigate} from "react-router-dom";


function GameCard ({className="", gameTitle="", gameImage="", gamePlatforms="", gameId=null }) {
    const { selectedTheme } = useContext(ThemeContext)
    const navigate = useNavigate()

    function openDetails (id) {
        navigate('/game/' + id)
    }

    return (

        <article onClick={() => openDetails(gameId)} className={`game-card-main ${className} ${selectedTheme}`}>
            <figure className={"game-card-picture"}>
                <span className={"game-text-label"}>favoriet</span>
                <img className={"game-image"} src={gameImage} alt="game-image"/>
            </figure>
            <div className={`game-card-title`}>{gameTitle}</div>
            {gamePlatforms && <GamePlatformIcons platforms={gamePlatforms} />}
        </article>
    )
}

export default GameCard;