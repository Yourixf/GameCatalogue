import React from "react";
import './Navigation.css';
import joystick from "../../assets/navbar/joystick.png";

function Navigation () {
    return(
        <>
            <nav>
                <span className="company-section">
                    <img className="navbar-icon" src={joystick} alt="company-logo" />
                    <p className='company-title'>Game Catalogue</p>
                </span>
            </nav>
        </>
    );

}

export default Navigation;