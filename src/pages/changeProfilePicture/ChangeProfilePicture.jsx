import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {useGetUserFavorites, useUpdateUserInfo} from "../../hooks/useUser.js";
import {getToken, getTokenUsername} from "../../helpers/auth.js";
import CircleIcon from "../../components/circleIcon/CircleIcon.jsx";
import Button from "../../components/button/Button.jsx";
import { profilePictures } from "../../assets/profilePictures/profilePictures.js";
import './ChangeProfilePicture.css';


function ChangeProfilePicture () {
    const { selectedTheme } = useContext(ThemeContext)

    const [profilePicture, setProfilePicture ] = useState();

    const navigate = useNavigate();

    const { getUserFavorites, data:getUserFavoritesData, loading:getUserFavoritesLoading, error:getUserFavoritesError } = useGetUserFavorites();
    const { updateUserInfo } = useUpdateUserInfo();


    const currentToken = getToken()
    const tokenUsername = getTokenUsername(currentToken)
    let initialProfilePicture;

    useEffect(() => {
        getUserFavorites(tokenUsername, currentToken);
    }, []);

    useEffect(() => {
        console.log(profilePicture)
    }, [profilePicture])

    useEffect(() => {
        console.warn("getUserFavoritesData:", getUserFavoritesData);
        const rawInfo = getUserFavoritesData;

        if (rawInfo) {
           const parsedInfo = typeof rawInfo === "string" ? JSON.parse(rawInfo) : rawInfo;
           setProfilePicture(parsedInfo?.profile_picture || "defaultProfile.png");
           initialProfilePicture = parsedInfo?.profile_picture || "defaultProfile.png";
        }
    }, [getUserFavoritesData]);


    function cancelButton () {
        navigate('/profile');
    }

    function changeProfilePicture (picture) {
        console.warn("AANGEROEEPEEEE")

        picture !== initialProfilePicture && setProfilePicture(picture)
    }

    function submitNewPicture () {
        let userInfo = {
            favorite_games: getUserFavoritesData?.favorite_games,
            profile_picture: `${profilePicture}`
        }

        let userInfoString = JSON.stringify(userInfo)

        let formData = {
            info: userInfoString
        }

        console.warn(formData)

        updateUserInfo(formData, currentToken, tokenUsername)
    }

    return (
        <main className={`page-container ${selectedTheme}`}>

            <section className={`change-profile-picture-card ${selectedTheme}`}>

                <section className={`title-section`}>
                    <h1 className={`section-title`}>Kies een profiel foto</h1>
                </section>

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
                    <Button onClick={submitNewPicture} className={"confirm-button"} content={"bevestig"} type={"submit"}/>
                    <Button onClick={cancelButton} className={"cancel-button"} content={`Terug naar profiel`}/>
                </section>

            </section>
        </main>
    )
}

export default ChangeProfilePicture;