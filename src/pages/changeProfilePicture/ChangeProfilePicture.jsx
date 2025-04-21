import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {UserInfoContext} from "../../context/UserInfoProvider.jsx";
import {useGetUserFavorites, useUpdateUserInfo} from "../../hooks/useUser.js";
import {getToken, getTokenUsername} from "../../helpers/auth.js";
import CircleIcon from "../../components/circleIcon/CircleIcon.jsx";
import Button from "../../components/button/Button.jsx";
import { profilePictures } from "../../assets/profilePictures/profilePictures.js";
import './ChangeProfilePicture.css';
import {getProfilePictureSrc} from "../../helpers/user.js";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";


function ChangeProfilePicture () {
    const { selectedTheme } = useContext(ThemeContext)
    const { userInfo } = useContext(UserInfoContext)

    const [profilePicture, setProfilePicture ] = useState();

    const navigate = useNavigate();

    const { getUserFavorites, data:getUserFavoritesData, loading:getUserFavoritesLoading, error:getUserFavoritesError } = useGetUserFavorites();
    const { updateUserInfo, data:updateUserInfoData } = useUpdateUserInfo();

    const currentToken = getToken()
    const tokenUsername = getTokenUsername(currentToken)

    const currentProfilePicture =  userInfo?.userInfoData?.profile_picture;
    let initialProfilePicture;

    useEffect(() => {
        getUserFavorites(tokenUsername, currentToken);
    }, []);

    useEffect(() => {
        // console.warn("getUserFavoritesData:", getUserFavoritesData);
        const rawInfo = getUserFavoritesData;

        if (rawInfo) {
           const parsedInfo = typeof rawInfo === "string" ? JSON.parse(rawInfo) : rawInfo;
           setProfilePicture(parsedInfo?.profile_picture || "defaultProfile.png");
           initialProfilePicture = parsedInfo?.profile_picture || "defaultProfile.png";
        }
    }, [getUserFavoritesData]);

    useEffect(() => {
        userInfo.refreshUserInfo()
    }, [updateUserInfoData])

    function cancelButton () {
        navigate('/profile');
    }

    function changeProfilePicture (picture) {
        if (picture !== initialProfilePicture) {
            setProfilePicture(picture)
        }
    }

    function submitNewPicture () {
        let userInfoData = {
            favorite_games: getUserFavoritesData?.favorite_games,
            profile_picture: `${profilePicture}`
        }

        let userInfoString = JSON.stringify(userInfoData)

        let formData = {
            info: userInfoString
        }

        updateUserInfo(formData, currentToken, tokenUsername)
    }

    return (
        <main className={`page-container ${selectedTheme}`}>

            <section className={`change-profile-picture-card ${selectedTheme}`}>

                <section className={`title-section`}>
                    <h1 className={`section-title`}>Kies een profiel foto</h1>
                </section>

                { getUserFavoritesError || getUserFavoritesLoading &&
                <span className={`status-message-wrapper`}>
                    <StatusMessage statusState={getUserFavoritesLoading} type={"loading"} content={"User info laden"}/>

                    <StatusMessage statusState={getUserFavoritesError} type={"error"}
                               content={getUserFavoritesError ? getUserFavoritesError?.response?.data : "Er ging iets fout bij het ophalen van de user info data..."}/>

                </span> }

                <section className={`profile-picture-section`}>
                    <section className={`profile-picture-section`}>
                        {profilePictures.map(picture => (
                            <article
                                key={picture.label}
                                className={`profile-picture`}
                                onClick={() => changeProfilePicture(picture.file)}
                            >
                                <CircleIcon
                                    title={picture.label}
                                    className={profilePicture === picture.file ? "currently-selected" : ""}
                                    iconPictureSource={picture.src}
                                />
                            </article>
                        ))}
                    </section>
                </section>

                <section className={`button-section`}>
                    {currentProfilePicture !== profilePicture &&
                        <Button onClick={submitNewPicture} className={"confirm-button"} content={"bevestig"}
                                type={"submit"}/>
                    }

                    <Button onClick={cancelButton} className={"cancel-button"} content={`Terug naar profiel`}/>
                </section>

            </section>
        </main>
    )
}

export default ChangeProfilePicture;