import {useContext, useState} from 'react';
import './Test.css';
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import {getToken, getTokenUserId, getTokenUsername, saveToken, validateToken} from "../../helpers/auth.js";
import {
    useGetUserInfo,
    useUploadProfilePicture,
    useDownloadProfilePicture,
    useUpdateUserInfo
} from "../../hooks/useUser.js";
import {AuthContext} from "../../context/AuthProvider.jsx";
import lightmode from "../../assets/navbar/lightmode.png";
import testProfile from "../../assets/testProfile.jpg"
import CircleIcon from '../../components/circleIcon/CircleIcon.jsx';
import Input from '../../components/input/Input.jsx';

function Test () {
    const [jwtToken, setJWTToken] = useState("")
    const NOVI_BASE_API_ENDPOINT = "https://api.datavortex.nl/gamecatalogue";
    const { getUserInfo, data } = useGetUserInfo()
    const {uploadProfilePicture } = useUploadProfilePicture()
    const {downloadProfilePicture } = useDownloadProfilePicture()
    const { authData } = useContext(AuthContext)
    const autoHeaderToken = getToken()

    const noviBaseHeaders = {
        'Content-type': 'application/json',
        'X-Api-Key': `${import.meta.env.VITE_NOVI_API_KEY}`,
        "Authorization": `Bearer ${jwtToken}`
    };


    const noviBaseHeaders2 = {
        "accept":"*/*",
        "Content-type":'multipart/form-data',
        "Authorization": `Bearer ${autoHeaderToken}`
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
    const profilePicture =  `https://yt3.googleusercontent.com/ytc/AIdro_mGfLWTNObiKBPVx_I45IMevDWgxzLbpcyqPM8ynAyyVyQ=s160-c-k-c0x00ffffff-no-rj`;
    


    async function uploadProfilePic () {  
        const profilePicture2 = `${testProfile}`
        const profilePicture3 = `${lightmode}`

        const formData = new FormData();
        formData.append("file", profilePicture3); 

        console.log(formData)
        // uploadProfilePicture(profilePicture, currentToken, tokenUsername)

        try {
            const result = await axios.post(
                `${NOVI_BASE_API_ENDPOINT}/users/youriuser/upload`, 
                formData,
                {headers:noviBaseHeaders2}
            );
            console.log(result)           
        }
        catch (e) {
            console.log(e)
        }
    }
     





    function downloadProfilePic () {
        const currentToken = getToken()
        console.log(currentToken)
        const tokenUsername = getTokenUsername(currentToken)
        console.log(tokenUsername)
        
        console.log(profilePicture)

        const profilePicture2 = `${testProfile}`
        const profilePicture3 = `${lightmode}`


        
        downloadProfilePicture(currentToken, tokenUsername)
    }

    function onChangeTest (e) {
        console.log(e.target.value)
        
    }    


    const [file, setFile] = useState("leeg");

    function handleFileClick (e) {
        console.log("IK BEN GEKLIKT")
        console.log(e.target.files[0])

        const testFile = e.target.files[0]
        console.log("variabel test:")
        console.log(testFile)



        console.log("origine state file:")
        console.log(file)

        setFile(testFile)

        console.log("state file is:")

        console.log(file)
    }

    const { updateUserInfo} = useUpdateUserInfo();

    function resetFavorites () {
        let userInfo = {favorite_games: []}
        let userInfoString = JSON.stringify(userInfo)

        let formData = {
            info: userInfoString
        }

        updateUserInfo(formData, getToken(), getTokenUsername(getToken()))


    }

    return(
        <>
            <main>
                <h1>Test PAGINA</h1>
                <CircleIcon iconPictureSource={testProfile}/>
                <CircleIcon iconPictureSource={profilePicture}/>

                <Button onClick={testAPI} content={"testapi"}></Button>
                <Button onClick={getJWTToken} content={"get jwt token"}></Button>
                <Button onClick={getUserInfoTest} content={"Get User info"}/>
                <Button onClick={randomTest} content={"Random test"}/>
                <Button onClick={logthisuserOut} content={"log uit"}/>
                <Button onClick={validateTokenForMe} content={"Validate token"}/>
                <Button onClick={uploadProfilePic} content={"upload profiel foto"}/>
                <Button onClick={downloadProfilePic} content={"download profiel foto"}/>

                <input onChange={onChangeTest} type="input" />
                <Input type='file' className='file-test' onChange={handleFileClick} />

                <Button onClick={resetFavorites} content={"reset favorites"}/>

                <p className={"tokenTest"}>{jwtToken}</p>
            </main>
        </>

    );
}

export default Test;