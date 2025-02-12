// import React from 'react';
// import './Recommendations.css';
import axios from "axios";

import Button from "../../components/button/Button.jsx";

function Test () {
    const noviBaseApiEndpoint = "https://api.datavortex.nl/gamecatalogue";
    const noviBaseHeaders = {
        'Content-type': 'application/json',
        'X-Api-Key':import.meta.env.VITE_NOVI_API_KEY
    };

    const noviBaseHeaders2 = {
        'Content-Type': 'application/json',
        'X-Api-Key': 'gamecatalogue:QCNnRs9yfPCbZmu2BT3h'
    }


    async function testAPI() {
        try {
            const result = await axios.get(`${noviBaseApiEndpoint}/info`, {
                'Content-Type': 'application/json',
                'X-Api-Key': 'gamecatalogue:QCNnRs9yfPCbZmu2BT3h'
            });
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