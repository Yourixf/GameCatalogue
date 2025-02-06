import React from "react";
import './Navigation.css';
import {NavLink} from "react-router-dom";
import joystick from "../../assets/navbar/joystick.png";
import home from "../../assets/navbar/home.png";
import favorite from "../../assets/navbar/favorite.png";
import recommended from "../../assets/navbar/recommended.png";
import search from "../../assets/navbar/search.png";
import lightmode from "../../assets/navbar/lightmode.png";


function Navigation () {
    const [dropdown, dropdownToggle] = React.useState(false);

    function dropdownClick () {
        console.log(dropdown);
        dropdownToggle(!dropdown);
        console.log(dropdown);
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
                     <button className="navbar-ligt-mode-button navbar-icon-circle">
                        <img className="navbar-icon" src={lightmode} alt="company-logo"/>
                     </button>
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
                            <div className="navbar-icon-circle">
                                <img className="navbar-icon" src={home} alt="home-logo"/>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/recommendations">
                            <div className="navbar-icon-circle">
                                <img className="navbar-icon" src={recommended} alt="recommended-logo"/>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favorites">
                            <div className="navbar-icon-circle">
                                <img className="navbar-icon" src={favorite} alt="favorite-logo"/>
                            </div>
                        </NavLink>
                    </li>
                </ul>

                <button className={"login-button" + " state-one"}>
                    login
                </button>

                <div onClick={dropdownClick} className={"navbar-menu" + [dropdown ? " navbar-menu-active" : ""]}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className={dropdown ? "navbar-dropdown-active" : "navbar-dropdown-inactive"}>
                    <li className={dropdown ? "state-two" : ""}>
                          <span className={"navbar-light-mode-wrapper"}>
                              <button className="navbar-ligt-mode-button navbar-icon-circle">
                                  <img className="navbar-icon" src={lightmode} alt="company-logo"/>
                             </button>
                          </span>

                    </li>
                    <li className={dropdown ? "state-two" : ""}>
                        <NavLink to="/">
                            <div className="navbar-icon-circle">
                                <img className="navbar-icon" src={home} alt="home-logo"/>
                            </div>
                        </NavLink>
                    </li>
                    <li className={dropdown ? "state-two" : ""}>
                        <NavLink to="/recommendations">
                            <div className="navbar-icon-circle">
                                <img className="navbar-icon" src={recommended} alt="recommended-logo"/>
                            </div>
                        </NavLink>
                    </li>
                    <li className={dropdown ? "state-two" : ""}>
                        <NavLink to="/favorites">
                            <div className="navbar-icon-circle">
                                <img className="navbar-icon" src={favorite} alt="favorite-logo"/>
                            </div>
                        </NavLink>

                    </li>
                    <li className={dropdown ? "state-two" : ""}>
                        <button className={"login-button"}>
                            login
                        </button>
                    </li>

                </div>
            </nav>
        </>
    );
}

export default Navigation;