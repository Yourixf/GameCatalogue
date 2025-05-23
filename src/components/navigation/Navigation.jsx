import {useState, useContext} from "react";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {getProfilePictureSrc, useAuthData, useUserInfo} from "../../helpers/user.js";
import Button from "../button/Button";
import CircleIcon from '../../components/circleIcon/CircleIcon';
import Input from "../input/Input.jsx";
import joystick from "../../assets/navbar/joystick.png";
import home from "../../assets/navbar/home.png";
import favorite from "../../assets/navbar/favorite.png";
import recommended from "../../assets/navbar/recommended.png";
import search from "../../assets/navbar/search.png";
import lightmode from "../../assets/navbar/lightmode.png";
import './Navigation.css';


function Navigation () {
    const { toggleTheme, selectedTheme } = useContext(ThemeContext)
    const authData = useAuthData();
    const userInfo = useUserInfo();

    const navigate = useNavigate();

    const [dropdown, dropdownToggle] = useState(false);
    const [fieldMessage, setFieldMessage] = useState('zoeken');

    const { register, handleSubmit, formState: { errors }, reset } = useForm({mode:'onSubmit'})

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

    function handleFormSubmit(data) {
        // makes sure the query isn't empty
        if (data['game-search-field'].trim().length !== 0) {
            setFieldMessage("zoeken")
            navigate(`/results/` + data['game-search-field'])
        } else {
            reset()
            setFieldMessage("mag niet leeg zijn!")
        }
    }

    const profilePictureSrc = getProfilePictureSrc(userInfo?.userInfoData);

    return(

        <nav className={`navbar ${selectedTheme}`}>
            <NavLink to='/'>
                <span className="company-section">
                    <img className={`company-icon`} src={joystick} alt="company-logo"/>
                    <p className={`company-title ${selectedTheme} state-three` }>Game Catalogue</p>
                </span>
            </NavLink>

            <span className={"navbar-light-mode-wrapper" + " state-one"}>
                 <CircleIcon onClick={changeTheme} className={`light-mode-icon`} iconPictureSource={lightmode} title={"Thema wijzigen"}/>
            </span>

            <search className="nav-searchbar">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Input
                        type="text"
                        id="game-search-field"
                        placeholder={fieldMessage}

                        validationRules={{
                            required: {
                                value: true,
                            }
                        }}
                        register={register}
                        errors={errors}
                    />

                    <Button className={`navbar-search-icon-button ${selectedTheme}`} type={"submit"}>
                        <img className="search-icon" src={search} alt="company-logo"/>
                    </Button>
                </form>
            </search>

            <ul className="navbar-ul state-one">
                <li>
                    <NavLink to="/">
                        <CircleIcon className="home-icon" iconPictureSource={home} title={"Home pagina"}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/recommendations">
                        <CircleIcon className="recommended-icon" iconPictureSource={recommended} title={"Aanbevelingen pagina"}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/favorites">
                        <CircleIcon className="favorite-icon" iconPictureSource={favorite} title={"Favorieten pagina"}/>
                    </NavLink>
                </li>
            </ul>

            {authData?.user && userInfo ?
                <div className={"profile-section"}>
                    <p className={`user-username ${selectedTheme} state-one`}>{authData?.user?.username}</p>
                    <CircleIcon className={"profile-icon state-one"} onClick={profileButton} iconPictureSource={profilePictureSrc} title={"Profiel pagina"} />
                </div>
                :
                <div className={"profile-section"}>
                    <Button onClick={handleClick} className={"navbar-login-button" + " state-one"} content="inloggen" shadow={false}/>
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
                 <CircleIcon onClick={changeTheme} className={`light-mode-icon`} iconPictureSource={lightmode} title={"Thema wijzigen"} />
                    </span>
                </li>
                <li className={dropdown ? "state-two" : ""}>
                    <NavLink to="/">
                        <CircleIcon className="home-icon" iconPictureSource={home} title={"Home pagina"}/>
                    </NavLink>
                </li>
                <li className={dropdown ? "state-two" : ""}>
                    <NavLink to="/recommendations">
                        <CircleIcon className="recommended-icon" iconPictureSource={recommended} title={"Aanbevelingen pagina"}/>
                    </NavLink>
                </li>
                <li className={dropdown ? "state-two" : ""}>
                    <NavLink to="/favorites">
                        <CircleIcon className="favorite-icon" iconPictureSource={favorite} title={"Favorieten pagina"}/>
                    </NavLink>
                </li>
                {authData?.user ?
                    <div className={"profile-section"}>
                        <CircleIcon className={"profile-icon state-two"} onClick={profileButton} iconPictureSource={profilePictureSrc} title={"Profiel pagina"}/>

                        <li className={dropdown ? "state-two" : ""}>
                            <Button onClick={authData.logout} className={"navbar-logout-button" + " state-two"}
                                    content="uitloggen"/>
                        </li>
                    </div>
                    :
                    <div className={"profile-section"}>
                        <Button onClick={handleClick} className={"navbar-login-button" + " state-two"} content="inloggen" shadow={false}/>
                    </div>
                }
            </div>
        </nav>
    );
}

export default Navigation;