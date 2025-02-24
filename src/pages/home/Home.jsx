import React, {useContext} from 'react';
import './Home.css';

import Button from '../../components/button/Button';
import recommended from "../../assets/navbar/recommended.png";
import CircleIcon from '../../components/circleIcon/CircleIcon';
import GameCard from "../../components/gameCard/GameCard.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import SortingFilter from "../../components/sortingFilter/SortingFilter.jsx";
import {AuthContext} from "../../context/AuthProvider.jsx";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import windwows from "../../assets/platforms/windows.png";
import playstation from "../../assets/platforms/playstation.png";
import xbox from "../../assets/platforms/xbox.png";
import apple from "../../assets/platforms/apple.png";
import android from "../../assets/platforms/android.png";
import nitendoswitch from "../../assets/platforms/nitendoswitch.png";
import pubgImg from '../../assets/TEMPGAMEBACKGROUND.png'

function Home () {
    const { selectedTheme } = useContext(ThemeContext)
    const { authData } = useContext(AuthContext)

    return(
        <main className='main-section'>


            <section className={`section-outer-container recommended-section-outer`}>
                <div className={`section-inner-container recommended-section-inner ${selectedTheme}`}>
                    <p className={`section-title recommended-title`}>Aanbevolen voor jou</p>
                    <div className={`recommended-card ${selectedTheme}`}>
                        <figure className={`recommended-game-image-wrapper`}>
                            <img className={`recommended-game-image`} src={pubgImg} alt="game-image"/>

                        </figure>

                        <span className={`recommended-game-info-wrapper`}>
                            <div className={`recommended-text-info`}>
                                <p className={`recommended-text-description`}>Titel</p>
                                <p className={`recommended-text-content`}>Pubg</p>
                            </div>

                            <div className={`recommended-text-info`}>
                                <p className={`recommended-text-description`}>Uitgifte datum</p>
                                <p className={`recommended-text-content`}>23 maart 2017</p>
                            </div>
                            <div className={`recommended-text-info`}>
                                <p className={`recommended-text-description`}>Metascore</p>
                                <p className={`recommended-text-content`}>81</p>
                            </div>
                            <figure className={"recommended-game-card-platforms"}>
                                <img className={"platform-icon"} src={windwows} alt="windows-icon"/>
                                <img className={"platform-icon"} src={playstation} alt="playstation-icon"/>
                                <img className={"platform-icon"} src={xbox} alt="xbox-icon"/>
                                <img className={"platform-icon"} src={apple} alt="apple-icon"/>
                                <img className={"platform-icon"} src={android} alt="android-icon"/>
                                <img className={"platform-icon"} src={nitendoswitch} alt="nitendoswitch-icon"/>
                            </figure>
                        </span>
                    </div>
                    <div className={`recommended-pagination`}>
                        <span className={`recommended-pagination-other currently-selected`}></span>
                        <span className={`recommended-pagination-other`}></span>
                        <span className={`recommended-pagination-other`}></span>
                        <span className={`recommended-pagination-other`}></span>
                        <span className={`recommended-pagination-other`}></span>
                        <span className={`recommended-pagination-other`}></span>


                    </div>
                </div>

            </section>


            <section className={`section-outer-container trending-games`}>
                <div className={`section-inner-container trending-games-section-inner`}>
                    <div>
                        <p className={`section-title`}>
                            Uitgelicht
                        </p>

                    </div>
                    <div className={`game-card-wrapper`}>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>

                    </div>

                </div>
            </section>

            {/*<h1>HOME </h1>*/}
            {/*<SortingFilter type={`sorting`} content={`Sorteer op:`}/>*/}
            {/*<SortingFilter type={`filter`} content={`Filter op:`}/>*/}
            {/*<GameCard/>*/}
            {/*<Pagination/>*/}


        </main>

    );
}

export default Home;