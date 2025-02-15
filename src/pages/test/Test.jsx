import React from 'react';
import './Test.css';
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import { jwtDecode  } from 'jwt-decode';

function Test () {
    const [jwtToken, setJWTToken] = React.useState("")
    const NOVI_BASE_API_ENDPOINT = "https://api.datavortex.nl/gamecatalogue";

    const noviBaseHeaders = {
        'Content-type': 'application/json',
        'X-Api-Key': `${import.meta.env.VITE_NOVI_API_KEY}`,
        "Authorization": `Bearer ${jwtToken}`
    };

    const testUserDataBody = {
        username: "youriuser",
        password: "12345678",

    }

    // const decoded = jwtDecode(testToken);
    // console.log(decoded)

    async function testAPI() {
        try {
            const result = await axios.get(`${NOVI_BASE_API_ENDPOINT}/users/youriuser/info`, {headers:noviBaseHeaders});
            console.log(result)
        }
        catch (e) {
            console.log(e)
        }
    }

    async function getJWTToken() {
        try {
            const result = await axios.post(`${NOVI_BASE_API_ENDPOINT}/users/authenticate`, testUserDataBody, {headers:noviBaseHeaders});
            const tempJWTToken = result.data.jwt;
            setJWTToken(tempJWTToken)
            console.log(tempJWTToken)
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
                <Button onClick={getJWTToken} content={"get jwt token"}></Button>
                <p className={"tokenTest"}>{jwtToken}</p>
            </div>
        </>

    );
}

export default Test;