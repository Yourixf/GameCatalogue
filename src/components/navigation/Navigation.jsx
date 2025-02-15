import { useState } from "react";
import './Navigation.css';
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import joystick from "../../assets/navbar/joystick.png";
import home from "../../assets/navbar/home.png";
import favorite from "../../assets/navbar/favorite.png";
import recommended from "../../assets/navbar/recommended.png";
import search from "../../assets/navbar/search.png";
import lightmode from "../../assets/navbar/lightmode.png";
import Button from "../button/Button";
import CircleIcon from '../../components/circleIcon/CircleIcon';

function Navigation () {
    const navigate = useNavigate();
    const [dropdown, dropdownToggle] = useState(false);

    function dropdownClick () {
        console.log(dropdown);
        dropdownToggle(!dropdown);
        console.log(dropdown);
    }

    function handleClick () {
        navigate("/login")
    }

    // TO DO:
    // 1: profiel icon en username toevoegen indien ingelogd
    // 2: light mode functie koppelen

    return(
        <>
            <nav>
                <NavLink to='/'>
                    <span className="company-section">
                        <img className="company-icon" src={joystick} alt="company-logo"/>
                        <p className={"company-title" + " state-three" }>Game Catalogue</p>
                    </span>
                </NavLink>

                <span className={"navbar-light-mode-wrapper" + " state-one"}>
                     <CircleIcon className="light-mode-icon" iconPictureSource={lightmode} />
                </span>

                <div className="nav-searchbar">
                    <input type="text" id="game-search-field" placeholder="Zoeken"/>

                    <button className="navbar-search-icon-button">
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

                <Button onClick={handleClick} className={"navbar-login-button" + " state-one"} content="login" shadow={false}/>

                <div onClick={dropdownClick} className={"navbar-menu" + [dropdown ? " navbar-menu-active" : ""]}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className={dropdown ? "navbar-dropdown-active" : "navbar-dropdown-inactive"}>
                    <li className={dropdown ? "state-two" : ""}>
                        <span className={"navbar-light-mode-wrapper"}>
                            <CircleIcon className="light-mode-icon" iconPictureSource={lightmode} />
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
                    <li className={dropdown ? "state-two" : ""}>
                        <Button onClick={handleClick} className={"navbar-login-button" + " state-two"} content="login"/>
                    </li>
                </div>
            </nav>
        </>
    );
}

export default Navigation;