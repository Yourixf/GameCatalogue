import {useContext } from 'react';
import './Home.css';
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
import {useGetCurrentGameList} from "../../hooks/useGames.js";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";

function Home () {
    const { selectedTheme } = useContext(ThemeContext)
    const { authData } = useContext(AuthContext)

    const {
        currentGameListData,
        currentGameListLoading,
        currentGameListError,
        loadNextPage,
        loadFirstPage,
        getLastPageNumber,
        loadLastPage,
        getCurrentPageNumber
    } = useGetCurrentGameList()


    return(
        <main className={`page-container ${selectedTheme} home-page-container`}>

            { authData.user &&
                <section className={`section-outer-container recommended-section-outer`}>
                    <div className={`section-inner-container recommended-section-inner ${selectedTheme}`}>
                        <span className={"recommended-section-wrapper"}>

                            <span className={"section-title-wrapper"}>
                                <h2 className={`section-title recommended-title`}>Aanbevolen voor jou</h2>
                            </span>
                            <article className={`recommended-card ${selectedTheme}`}>
                                <figure className={`recommended-game-image-wrapper`}>
                                <img className={`recommended-game-image`} src={pubgImg} alt="game-image"/>
                                </figure>
                                <span className={`recommended-game-info-wrapper`}>
                                    <div className={`recommended-text-info`}>
                                        <h3 className={`recommended-text-description`}>Titel</h3>
                                        <h3 className={`recommended-text-content`}>Pubg</h3>
                                    </div>

                                    <div className={`recommended-text-info`}>
                                        <h3 className={`recommended-text-description`}>Uitgifte datum</h3>
                                        <h3 className={`recommended-text-content`}>23 maart 2017</h3>
                                    </div>
                                    <div className={`recommended-text-info`}>
                                        <h3 className={`recommended-text-description`}>Metascore</h3>
                                        <h3 className={`recommended-text-content`}>81</h3>
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
                            </article>
                            <nav className={`recommended-pagination`} aria-label={"recommended games pagination"}>
                                <span className={`recommended-pagination-other currently-selected`}
                                      aria-label={"game-1"}></span>
                                <span className={`recommended-pagination-other`} aria-label={"game 2"}></span>
                                <span className={`recommended-pagination-other`} aria-label={"game 3"}></span>
                                <span className={`recommended-pagination-other`} aria-label={"game 4"}></span>
                                <span className={`recommended-pagination-other`} aria-label={"game 5"}></span>
                                <span className={`recommended-pagination-other`} aria-label={"game 6"}></span>
                            </nav>
                        </span>
                    </div>

                </section>
            }
            <StatusMessage statusState={currentGameListLoading} type={"loading"} content={"Laden..."}/>

            <StatusMessage statusState={currentGameListError} type={"error"}
                           content={currentGameListError ? currentGameListError?.message : "er ging iets fout..."}/>
            {currentGameListData &&
                <section className={`section-outer-container trending-games-outer-container`}>
                    <div className={`section-inner-container trending-games-inner-container`}>
                        <div className={"section-game-header"}>
                            <h2 className={`section-title`}>
                                Uitgelicht
                            </h2>
                            <span className={"sorting-filter-wrapper state-two"}>
                            <SortingFilter content={"Sorteer op:"} type={'sorting'}/>
                            <SortingFilter content={"Filter op:"} type={"filter"}/>
                        </span>

                            <span className={"hidden-item"}></span>
                        </div>

                        {currentGameListData &&  <section className={"game-card-wrapper"}>
                            {currentGameListData && currentGameListData?.results.length > 0 ? currentGameListData?.results.map(game => (
                                <GameCard
                                    key={game?.id}
                                    gameTitle={game?.name}
                                    gameImage={game?.background_image}
                                    gamePlatforms={game?.parent_platforms}
                                    gameId={game?.id}
                                />

                            )) : <h1>niks</h1>}
                        </section>}
                        {/*<StatusMessage statusState={nextPreviousPageLoading} type={"loading"} content={"Laden..."}/>*/}

                        {/*<StatusMessage statusState={nextPreviousPageError} type={"error"}*/}
                        {/*               content={nextPreviousPageError ? nextPreviousPageError.response.data : "er ging iets fout..."}/>*/}

                        {/*<StatusMessage statusState={lastPageLoading} type={"loading"} content={"Laden..."}/>*/}

                        {/*<StatusMessage statusState={lastPageError} type={"error"}*/}
                        {/*               content={lastPageError ? lastPageError.response.data : "er ging iets fout..."}/>*/}
                        <Pagination
                            loadNextPage={currentGameListData?.next ? () => loadNextPage(currentGameListData?.next): null}
                            loadPreviousPage={currentGameListData?.previous ? () => loadNextPage(currentGameListData?.previous): null}
                            loadFirstPage={loadFirstPage}
                            lastPageValue={getLastPageNumber()}
                            loadLastPage={loadLastPage}
                            currentPageValue={getCurrentPageNumber()}

                        />


                    </div>
                </section>
            }

        </main>

    );
}

export default Home;