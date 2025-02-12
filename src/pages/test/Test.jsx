// import React from 'react';
// import './Recommendations.css';
import axios from "axios";
import Button from "../../components/button/Button.jsx";

function Test () {
    const randomJoke = "https://api.chucknorris.io/jokes/random";

    const NOVI_BASE_API_ENDPOINT = "https://api.datavortex.nl/gamecatalogue";

    const noviBaseHeaders = {
        'Content-type': 'application/json',
        'X-Api-Key': `${import.meta.env.VITE_NOVI_API_KEY}`,
    };

    async function testAPI() {
        try {
            const result = await axios.get(`${NOVI_BASE_API_ENDPOINT}/info`, {headers:noviBaseHeaders});
            console.log(result)
        }
        catch (e) {
            console.log(e)
        }
    }

    return(
        <>
            <div>
                <h1>Test PAGINA</h1>

                <Button onClick={testAPI} content={"testapi"}></Button>
            </div>
        </>

    );
}

export default Test;