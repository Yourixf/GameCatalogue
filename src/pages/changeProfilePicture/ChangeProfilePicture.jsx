import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {useGetUserFavorites} from "../../hooks/useUser.js";
import {getToken, getTokenUsername} from "../../helpers/auth.js";
import CircleIcon from "../../components/circleIcon/CircleIcon.jsx";
import Button from "../../components/button/Button.jsx";
import defaultProfile from "../../assets/profilePictures/defaultProfile.png";
import boy1 from "../../assets/profilePictures/boy1.png";
import boy2 from "../../assets/profilePictures/boy2.png";
import cat1 from "../../assets/profilePictures/cat1.png";
import cat2 from "../../assets/profilePictures/cat2.png";
import devil from "../../assets/profilePictures/devil.png";
import dog1 from "../../assets/profilePictures/dog1.png";
import dog2 from "../../assets/profilePictures/dog2.png";
import evilGood from "../../assets/profilePictures/evilGood.png";
import frankenstein from "../../assets/profilePictures/frankenstein.png";
import man1 from "../../assets/profilePictures/man1.png";
import man2 from "../../assets/profilePictures/man2.png";
import woman1 from "../../assets/profilePictures/woman1.png";
import woman2 from "../../assets/profilePictures/woman2.png";
import './ChangeProfilePicture.css';


function ChangeProfilePicture () {
    const { selectedTheme } = useContext(ThemeContext)

    const [profilePicture, setProfilePicture ] = useState();

    const navigate = useNavigate();

    const { getUserFavorites, data:getUserFavoritesData, loading:getUserFavoritesLoading, error:getUserFavoritesError } = useGetUserFavorites();

    const currentToken = getToken()
    const tokenUsername = getTokenUsername(currentToken)

    useEffect(() => {
        getUserFavorites(tokenUsername, currentToken);
    }, []);

    useEffect(() => {
        console.warn("getUserFavoritesData:", getUserFavoritesData);

        const rawInfo = getUserFavoritesData;

        if (rawInfo) {
           const parsedInfo = typeof rawInfo === "string" ? JSON.parse(rawInfo) : rawInfo;
           setProfilePicture(parsedInfo?.profile_picture || "defaultProfile.png");
        }
    }, [getUserFavoritesData]);

    const profilePictures = [
        { label: "defaultProfile", file: "defaultProfile.png", src: defaultProfile },
        { label: "boy1", file: "boy1.png", src: boy1 },
        { label: "boy2", file: "boy2.png", src: boy2 },
        { label: "cat1", file: "cat1.png", src: cat1 },
        { label: "cat2", file: "cat2.png", src: cat2 },
        { label: "devil", file: "devil.png", src: devil },
        { label: "dog1", file: "dog1.png", src: dog1 },
        { label: "dog2", file: "dog2.png", src: dog2 },
        { label: "frankenstein", file: "frankenstein.png", src: frankenstein },
        { label: "evilGood", file: "evilGood.png", src: evilGood },
        { label: "man1", file: "man1.png", src: man1 },
        { label: "man2", file: "man2.png", src: man2 },
        { label: "woman1", file: "woman1.png", src: woman1 },
        { label: "woman2", file: "woman2.png", src: woman2 }
    ];


    function cancelButton () {
        navigate('/profile');
    }

    function changeProfilePicture () {
        console.warn("AANGEROEEPEEEE")
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
                    <Button className={"confirm-button"} content={"bevestig"} type={"submit"}/>
                    <Button onClick={cancelButton} className={"cancel-button"} content={`Terug naar profiel`}/>

                    <Button content={"test"} onClick={() => console.log(profilePicture)}/>
                </section>

            </section>
        </main>
    )
}

export default ChangeProfilePicture;