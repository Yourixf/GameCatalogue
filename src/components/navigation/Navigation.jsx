import { useState, useContext } from "react";
import './Navigation.css';
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import joystick from "../../assets/navbar/joystick.png";
import home from "../../assets/navbar/home.png";
import favorite from "../../assets/navbar/favorite.png";
import recommended from "../../assets/navbar/recommended.png";
import search from "../../assets/navbar/search.png";
import lightmode from "../../assets/navbar/lightmode.png";
import defaultProfile from "../../assets/navbar/defaultProfile.png";
import Button from "../button/Button";
import CircleIcon from '../../components/circleIcon/CircleIcon';
import { ThemeContext } from "../../context/ThemeProvider.jsx";
import {AuthContext} from "../../context/AuthProvider.jsx";


function Navigation () {
    const navigate = useNavigate();
    const [dropdown, dropdownToggle] = useState(false);
    const { toggleTheme, selectedTheme } = useContext(ThemeContext)
    const { authData } = useContext(AuthContext)

    function dropdownClick () {
        console.log(dropdown);
        dropdownToggle(!dropdown);
        console.log(dropdown);
    }

    function handleClick () {
        navigate("/login")
    }

    function changeTheme () {
        console.log(selectedTheme)
        toggleTheme()
        console.log(selectedTheme)
    }

    function profileButton () {
        navigate("/profile")
    }

    return(
        <>
            <nav className={`navbar ${selectedTheme}`}>
                <NavLink to='/'>
                    <span className="company-section">
                        <img className={`company-icon`} src={joystick} alt="company-logo"/>
                        <p className={`company-title ${selectedTheme} state-three` }>Game Catalogue</p>
                    </span>
                </NavLink>

                <span className={"navbar-light-mode-wrapper" + " state-one"}>
                     <CircleIcon onClick={changeTheme} className={`light-mode-icon`} iconPictureSource={lightmode} />
                </span>

                <div className="nav-searchbar">
                    <input type="text" id="game-search-field" placeholder="Zoeken"/>

                    <button className={`navbar-search-icon-button ${selectedTheme}`}>
                        <img className="search-icon" src={search} alt="company-logo"/>
                    </button>
                </div>

                <ul className="state-one">
                    <li>
                        <NavLink to="/">
                            <CircleIcon className="home-icon" iconPictureSource={home}/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/recommendations">
                            <CircleIcon className="recommended-icon" iconPictureSource={recommended}/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favorites">
                            <CircleIcon className="favorite-icon" iconPictureSource={favorite}/>
                        </NavLink>
                    </li>
                </ul>



                {authData.user ?
                    <div className={"profile-section"}>
                        <p className={`user-username ${selectedTheme} state-one`}>{authData.user.username}</p>
                        <CircleIcon className={"profile-icon state-one"} onClick={profileButton}
                                    iconPictureSource={defaultProfile}/>
                    </div>
                    :
                    <div className={"profile-section"}>
                        <Button onClick={handleClick} className={"navbar-login-button" + " state-one"} content="login" shadow={false}/>
                    </div>

                }

                <div onClick={dropdownClick} className={`navbar-menu ${selectedTheme} ${[dropdown ? " navbar-menu-active" : ""]}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className={`${dropdown ? "navbar-dropdown-active" : "navbar-dropdown-inactive"} ${selectedTheme}` }>
                    <li className={dropdown ? "state-two" : ""}>
                        <span className={"navbar-light-mode-wrapper"}>
                     <CircleIcon onClick={changeTheme} className={`light-mode-icon`} iconPictureSource={lightmode} />
                        </span>
                    </li>
                    <li className={dropdown ? "state-two" : ""}>
                        <NavLink to="/">
                            <CircleIcon className="home-icon" iconPictureSource={home}/>
                        </NavLink>
                    </li>
                    <li className={dropdown ? "state-two" : ""}>
                        <NavLink to="/recommendations">
                            <CircleIcon className="recommended-icon" iconPictureSource={recommended}/>
                        </NavLink>
                    </li>
                    <li className={dropdown ? "state-two" : ""}>
                        <NavLink to="/favorites">
                            <CircleIcon className="favorite-icon" iconPictureSource={favorite}/>
                        </NavLink>
                    </li>
                    {authData.user ?
                        <div className={"profile-section"}>
                            <CircleIcon className={"profile-icon state-two"} onClick={profileButton}
                                        iconPictureSource={defaultProfile}/>

                            <li className={dropdown ? "state-two" : ""}>
                                <Button onClick={authData.logout} className={"navbar-logout-button" + " state-two"}
                                        content="logout"/>
                            </li>
                        </div>

                        :
                        <div className={"profile-section"}>
                            <Button onClick={handleClick} className={"navbar-login-button" + " state-two"} content="login" shadow={false}/>
                        </div>

                    }

                </div>
            </nav>
        </>
    );
}

export default Navigation;