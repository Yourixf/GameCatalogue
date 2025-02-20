import {useContext, useState} from 'react';
import './Test.css';
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import {getToken, getTokenUserId, getTokenUsername, saveToken, validateToken} from "../../helpers/auth.js";
import {useGetUserInfo, useUploadProfilePicture} from "../../hooks/useUser.js";
import {AuthContext} from "../../context/AuthProvider.jsx";

import lightmode from "../../assets/navbar/lightmode.png";

function Test () {
    const [jwtToken, setJWTToken] = useState("")
    const NOVI_BASE_API_ENDPOINT = "https://api.datavortex.nl/gamecatalogue";
    const { getUserInfo, data } = useGetUserInfo()
    const {uploadProfilePicture } = useUploadProfilePicture()
    const { authData } = useContext(AuthContext)


    const noviBaseHeaders = {
        'Content-type': 'application/json',
        'X-Api-Key': `${import.meta.env.VITE_NOVI_API_KEY}`,
        "Authorization": `Bearer ${jwtToken}`
    };

    const testUserDataBody = {
        username: "youriuser",
        password: "12345678",

    }


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
            console.log(result)

            saveToken(tempJWTToken)
            console.log(tempJWTToken)

        }
        catch (e) {
            console.log(e)
        }
    }

    async function getUserInfoTest() {
        try {
            const result = await axios.get(`${NOVI_BASE_API_ENDPOINT}/users/youriuser`, {headers:noviBaseHeaders});
            console.log(result)

            const tokenUsername = getTokenUsername(jwtToken)
            console.log("current username:"+ tokenUsername)
            getUserInfo(jwtToken, tokenUsername)
            console.log("dat zou dan moeten zijn: 1234", data)



            console.log(
                await data.username,
                await data.email,
            )
        }
        catch (e) {
            console.log(e)
        }
    }


    function randomTest () {
        console.log(getTokenUserId(jwtToken))
    }

    function logthisuserOut () {
        authData.logout()
        console.log("logouit uitgevoerd")
    }

    function validateTokenForMe () {
        const currentToken = getToken()
        validateToken(currentToken)

    }

    function uploadProfilePic () {
        const currentToken = getToken()
        console.log(currentToken)
        const tokenUsername = getTokenUsername(currentToken)
        console.log(tokenUsername)
        const profilePicture =  `https://yt3.googleusercontent.com/ytc/AIdro_mGfLWTNObiKBPVx_I45IMevDWgxzLbpcyqPM8ynAyyVyQ=s160-c-k-c0x00ffffff-no-rj`;
        console.log(profilePicture)

        uploadProfilePicture(profilePicture, currentToken, tokenUsername)


    }
    return(
        <>
            <div>
                <h1>Test PAGINA</h1>

                <Button onClick={testAPI} content={"testapi"}></Button>
                <Button onClick={getJWTToken} content={"get jwt token"}></Button>
                <Button onClick={getUserInfoTest} content={"Get User info"}/>
                <Button onClick={randomTest} content={"Random test"}/>
                <Button onClick={logthisuserOut} content={"log uit"}/>
                <Button onClick={validateTokenForMe} content={"Validate token"}/>
                <Button onClick={uploadProfilePic} content={"upload profiel foto"}/>
                <p className={"tokenTest"}>{jwtToken}</p>
            </div>
        </>

    );
}

export default Test;