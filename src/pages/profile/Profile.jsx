import {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import CircleIcon from "../../components/circleIcon/CircleIcon.jsx";
import {AuthContext} from "../../context/AuthProvider.jsx";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {useGetUserFavorites, useUploadProfilePicture} from "../../hooks/useUser.js";
import {getToken, getTokenUsername} from "../../helpers/auth.js";
import Button from "../../components/button/Button.jsx";
import defaultProfile from "../../assets/navbar/defaultProfile.png";
import './Profile.css';

function Profile () {
    const { authData } = useContext(AuthContext)
    const { selectedTheme } = useContext(ThemeContext)

    const [selectedFile, setSelectedFile] = useState(null);


    const navigate = useNavigate()

    const { getUserFavorites, data:getUserFavoritesData, loading:getUserFavoritesLoading, error:getUserFavoritesError } = useGetUserFavorites();
    const { uploadProfilePicture, loading } = useUploadProfilePicture();

    const currentToken = getToken()
    const tokenUsername = getTokenUsername(currentToken)

    useEffect(() => {
        getUserFavorites(tokenUsername, currentToken);
    }, []);

    function changePassword () {
        navigate("/profile/changepassword")
    }

    function favoriteClick () {
        navigate("/favorites")
    }

    function handleFileChange(e) {
        setSelectedFile(e.target.files[0]);
    }

    async function handleUploadClick() {
        const token = getToken();
        const username = getTokenUsername(token);



        if (selectedFile && username && token) {
            await uploadProfilePicture(selectedFile, token, tokenUsername);
        }
    }

    return (
        <main className={`page-container ${selectedTheme} profile-page-container`}>
            <div className={"inner-page-container"}>
                <article className={`profile-card ${selectedTheme}`}>
                    <div className={"profile-picture"}>
                        <CircleIcon iconPictureSource={defaultProfile}/>
                    </div>
                    <div className={"profile-content"}>
                        <h1 className={"profile-username"}>{authData?.user?.username}</h1>
                        <h2 className={"profile-email"}>{authData?.user?.email}</h2>

                        <span onClick={favoriteClick} className={`profile-favorite-games-section`}>
                            <h2 className={"profile-favorite-amount"}>{} {getUserFavoritesData?.favorite_games?.length ? getUserFavoritesData?.favorite_games?.length : 0 }</h2>
                            <p className={"profile-favorite-text"}>Favorieten games</p>
                        </span>
                    </div>
                    <div className={"profile-buttons"}>
                        <input type="file" accept="image/*" onChange={handleFileChange}/>
                        <button onClick={handleUploadClick} disabled={loading || !selectedFile}>
                            {loading ? "Uploaden..." : "Upload profielfoto"}
                        </button>

                        <Button content={"verander profiel foto"}/>
                        <Button onClick={changePassword} content={"verander wachtwoord"}/>
                        <Button onClick={authData.logout} content={"uitloggen"}/>
                    </div>
                </article>
            </div>
        </main>
    );
}

export default Profile;