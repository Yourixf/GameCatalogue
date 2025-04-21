import {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import CircleIcon from "../../components/circleIcon/CircleIcon.jsx";
import {AuthContext} from "../../context/AuthProvider.jsx";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {useGetCurrentUserInfo, useGetUserFavorites, useUploadProfilePicture} from "../../hooks/useUser.js";
import {getToken, getTokenUsername} from "../../helpers/auth.js";
import { profilePictures } from "../../assets/profilePictures/profilePictures.js";
import Button from "../../components/button/Button.jsx";
import defaultProfile from "../../assets/profilePictures/defaultProfile.png";
import './Profile.css';
import {getProfilePictureSrc} from "../../helpers/user.js";
import {UserInfoContext} from "../../context/UserInfoProvider.jsx";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";

function Profile () {
    const { authData } = useContext(AuthContext)
    const { selectedTheme } = useContext(ThemeContext)
    const { userInfo } = useContext(UserInfoContext)


    const navigate = useNavigate()

    const { getUserFavorites, data:getUserFavoritesData, loading:getUserFavoritesLoading, error:getUserFavoritesError } = useGetUserFavorites();


    const currentToken = getToken()
    const tokenUsername = getTokenUsername(currentToken)

    useEffect(() => {
        authData?.user && getUserFavorites(tokenUsername, currentToken);
    }, []);

    useEffect(() => {
        console.warn(getUserFavoritesData)
    }, [getUserFavoritesData])

    function changePassword () {
        navigate("/profile/changepassword")
    }

    function favoriteClick () {
        navigate("/favorites")
    }

    function changeProfilePicture () {
        navigate("/profile/changeprofilepicture")
    }

    const profilePictureSrc = getProfilePictureSrc(userInfo?.userInfoData);

    return (
        <main className={`page-container ${selectedTheme} profile-page-container`}>
            <div className={"inner-page-container"}>
                <article className={`profile-card ${selectedTheme}`}>

                    { getUserFavoritesError || getUserFavoritesLoading &&
                        <span className={`status-message-wrapper`}>
                            <StatusMessage statusState={getUserFavoritesLoading} type={"loading"} content={"User info laden"}/>

                            <StatusMessage statusState={getUserFavoritesError} type={"error"}
                                   content={getUserFavoritesError ? getUserFavoritesError?.response?.data : "Er ging iets fout bij het ophalen van de user info data..."}/>

                        </span> }

                    <div className={"profile-picture"} onClick={changeProfilePicture}>
                        <CircleIcon iconPictureSource={profilePictureSrc}/>
                    </div>
                    <div className={"profile-content"}>
                        <h1 className={"profile-username"}>{authData?.user?.username}</h1>
                        <h2 className={"profile-email"}>{authData?.user?.email}</h2>

                        <span onClick={favoriteClick} className={`profile-favorite-games-section`}>
                            <h2 className="profile-favorite-amount">
                                {[...new Set(
                                  Object.values(getUserFavoritesData?.favorite_games || {})
                                      .flat()
                                )].length}
                            </h2>

                            <p className={"profile-favorite-text"}>Favorieten games</p>
                        </span>
                    </div>
                    <div className={"profile-buttons"}>
                        <Button onClick={changeProfilePicture} content={"verander profiel foto"}/>
                        <Button onClick={changePassword} content={"verander wachtwoord"}/>
                        <Button onClick={authData.logout} content={"uitloggen"}/>
                    </div>
                </article>
            </div>
        </main>
    );
}

export default Profile;