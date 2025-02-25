import './GameDetails.css'
import {useParams} from "react-router-dom";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../../context/ThemeProvider.jsx";


function GameDetails () {
    const [gameData, setGameData] = useState(null)
    const { selectedTheme } = useContext(ThemeContext)

    let {id} = useParams();
    id = parseInt(id);

    const BASE_URL = import.meta.env.VITE_RAWG_API_BASE_URL;
    const RAWG_API_KEY = `key=${import.meta.env.VITE_RAWG_API_KEY}`;

    const RAWG_BASE_HEADERS = {
        'Content-type': 'application/json',
    }

    useEffect(() => {
        getGameDetails(id).then(result => {
            console.log(result)
        })
    }, [])

    async function getGameDetails (id) {
        try {
            const result = await axios.get(
                `${BASE_URL}/games/${id}?${RAWG_API_KEY}`,
                {headers:RAWG_BASE_HEADERS}
            )
            console.log("Resultaat")
            console.log(result)
            setGameData(result.data)
            console.log(gameData)
            return result
        } catch (e) {
            console.log("Resultaat error")
            console.error(e)

        }
    }

    return (
        <main className={`page-container ${selectedTheme}`}>
            <article>

            </article>
        </main>

    )
}

export default GameDetails;