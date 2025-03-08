import {useContext, useEffect} from 'react';
import './Profile.css';
import CircleIcon from "../../components/circleIcon/CircleIcon.jsx";
import defaultProfile from "../../assets/navbar/defaultProfile.png";
import {AuthContext} from "../../context/AuthProvider.jsx";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useGetUserFavorites} from "../../hooks/useUser.js";
import {getToken, getTokenUsername} from "../../helpers/auth.js";

function Profile () {
    const navigate = useNavigate()
    const { authData } = useContext(AuthContext)
    const { selectedTheme } = useContext(ThemeContext)

    const { getUserFavorites, data:getUserFavoritesData, loading:getUserFavoritesLoading, error:getUserFavoritesError } = useGetUserFavorites();

    function changePassword () {
        navigate("/profile/changepassword")
    }
    // const currentToken = getToken();
    // const tokenUsername = getTokenUsername(currentToken);
    //
    // useEffect(() => {
    //     getUserFavorites(tokenUsername, currentToken);
    // }, []);
    //
    //
    // console.log(getUserFavoritesData)
    // console.log(getUserFavoritesData.value)

    const favoriteGames =  0;
    //
    // console.log("Favorieten in profiel:", favoriteGames);


    return (
        <main className={`page-container ${selectedTheme} profile-page-container`}>
            <div className={"inner-page-container"}>
                <article className={`profile-card ${selectedTheme}`}>

                    <div className={"profile-picture"}>
                        <CircleIcon iconPictureSource={defaultProfile}/>
                    </div>

                    <div className={"profile-content"}>
                        <h1 className={"profile-username"}>{authData.user.username}</h1>
                        <h2 className={"profile-email"}>{authData.user.email}</h2>

                        <span className={`profile-favorite-games-section`}>
                            <h2 className={"profile-favorite-amount"}>{} {favoriteGames}</h2>
                            <p className={"profile-favorite-text"}>Favorieten games</p>
                        </span>
                    </div>

                    <div className={"profile-buttons"}>
                        <Button content={"verander profiel foto"} />
                        <Button onClick={changePassword} content={"verander wachtwoord"} />
                        <Button onClick={authData.logout} content={"uitloggen"} />
                    </div>
                </article>
            </div>
        </main>
    );
}

export default Profile;