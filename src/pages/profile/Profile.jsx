import {useContext} from 'react';
import './Profile.css';
import CircleIcon from "../../components/circleIcon/CircleIcon.jsx";
import defaultProfile from "../../assets/navbar/defaultProfile.png";
import {AuthContext} from "../../context/AuthProvider.jsx";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import Button from "../../components/button/Button.jsx";

function Profile () {
    const { authData } = useContext(AuthContext)
    const { selectedTheme } = useContext(ThemeContext)


    return(
        <div className={"inner-page-container"}>
            <div className={`profile-card ${selectedTheme}`}>

                <div className={"profile-picture"}>
                    <CircleIcon iconPictureSource={defaultProfile}/>
                </div>

                    <div className={"profile-content"}>
                        <h1>{authData.user.username}</h1>
                        <h2>{authData.user.email}</h2>

                        <span className={`profile-favorite-games-section`}>
                            <h2>{authData.user.info}</h2>
                            <p>Favorieten games</p>
                        </span>
                    </div>

                    <div className={"profile-buttons"}>
                        <Button content={"verander profiel foto"} />
                        <Button content={"verander wachtwoord"} />
                        <Button onClick={authData.logout} content={"uitloggen"} />
                    </div>
            </div>
        </div>
    
    );
}

export default Profile;