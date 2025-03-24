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

function Profile () {
    const { authData } = useContext(AuthContext)
    const { selectedTheme } = useContext(ThemeContext)

    const navigate = useNavigate()

    const { getUserFavorites, data:getUserFavoritesData, loading:getUserFavoritesLoading, error:getUserFavoritesError } = useGetUserFavorites();

    const {
        currentUserInfoData,
        currentUserInfoLoading,
        currentUserProfilePicture
    } = useGetCurrentUserInfo()

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

    const profilePictureSrc = getProfilePictureSrc(getUserFavoritesData);

    return (
        <main className={`page-container ${selectedTheme} profile-page-container`}>
            <div className={"inner-page-container"}>
                <article className={`profile-card ${selectedTheme}`}>
                    <div className={"profile-picture"}>
                        <CircleIcon iconPictureSource={profilePictureSrc}/>
                    </div>
                    <div className={"profile-content"}>
                        <h1 className={"profile-username"}>{authData?.user?.username}</h1>
                        <h2 className={"profile-email"}>{authData?.user?.email}</h2>

                        {console.log(currentUserInfoData)}
                        <span onClick={favoriteClick} className={`profile-favorite-games-section`}>
                            <h2 className={"profile-favorite-amount"}>{} {getUserFavoritesData?.favorite_games?.length ? getUserFavoritesData?.favorite_games?.length : 0 }</h2>
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