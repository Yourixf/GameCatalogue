import {useContext, useState} from 'react';
import './Results.css';
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import GameCard from "../../components/gameCard/GameCard.jsx";
import {useNavigate} from "react-router-dom";

function Results () {
    const { selectedTheme } = useContext(ThemeContext)
    const [gameData, setGameData] = useState(null)
    const navigate = useNavigate()

    const BASE_URL = import.meta.env.VITE_RAWG_API_BASE_URL;
    const RAWG_API_KEY = `key=${import.meta.env.VITE_RAWG_API_KEY}`;

    const RAWG_BASE_HEADERS = {
        'Content-type': 'application/json',
    }

    function openDetails (id) {
        navigate('/game/' + id)
    }

    async function getGames () {
        try {
            const result = await axios.get(
                `${BASE_URL}/games?${RAWG_API_KEY}`,
                {headers:RAWG_BASE_HEADERS}
            )
            console.log("Resultaat")
            console.log(result)
            setGameData(result.data)
            console.log(gameData)
        } catch (e) {
            console.log("Resultaat error")
            console.error(e)

        }
    }

    async function getPlatforms () {
        try {
            const result = await axios.get(
                `${BASE_URL}/platforms?${RAWG_API_KEY}`,
                {headers:RAWG_BASE_HEADERS}
            )
            console.log("Resultaat")
            console.log(result)
            setGameData(result.data)
            console.log(gameData)
        } catch (e) {
            console.log("Resultaat error")
            console.error(e)

        }
    }
    return (
        <main className={`page-container ${selectedTheme} recommendations-page-container`}>
            <div>
                <h1>results PAGINA</h1>
                <Button onClick={getGames} content={"alle games"}/>
                <Button onClick={getPlatforms} content={"alle platforms"}/>

                <section className={"temp-game-section"}>
                    {gameData && gameData.results.length > 0 ? gameData.results.map(game => (
                        <GameCard
                            key={game.id}
                            gameTitle={game.name}
                            gameImage={game.background_image}
                            gamePlatforms={game.platforms}
                            onClick={() => openDetails(game.id)}
                        />

                    )) :<h1>niks</h1> }
                </section>




            </div>
        </main>

    );
}

export default Results;