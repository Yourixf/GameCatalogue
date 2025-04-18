import {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthProvider.jsx";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {UserInfoContext} from "../../context/UserInfoProvider.jsx";
import GameCard from "../../components/gameCard/GameCard.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import SortingFilter from "../../components/sortingFilter/SortingFilter.jsx";
import {useGetCurrentGameList} from "../../hooks/useGames.js";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import GamePlatformIcons from "../../components/gamePlatformIcons/GamePlatformIcons.jsx";
import Metascore from "../../components/metascore/Metascore.jsx";
import './Home.css';

function Home () {
    const { selectedTheme } = useContext(ThemeContext)
    const { authData } = useContext(AuthContext)
    const { userInfo } = useContext(UserInfoContext)

    const [ currentRecommended, setCurrentRecommended ] = useState(0);

    const {
        currentGameListData,
        currentRecommendedGameListData,
        currentGameListLoading,
        currentGameListError,
        loadNextPage,
        loadFirstPage,
        getLastPageNumber,
        loadLastPage,
        getCurrentPageNumber,
        checkFavorite,
        handleFilterChange,
        handleSortingChange,
        sortingFilters
    } = useGetCurrentGameList()

    console.log(currentGameListData)

    return(
        <main className={`page-container ${selectedTheme} home-page-container`}>

            {authData.user && userInfo && currentRecommendedGameListData &&
                <section className={`section-outer-container recommended-section-outer`}>
                    <div className={`section-inner-container recommended-section-inner ${selectedTheme}`}>
                        <span className={"recommended-section-wrapper"}>

                            <span className={"section-title-wrapper recommended-card-title-wrapper"}>
                                <h2 className={`section-title recommended-title`}>Aanbevolen voor jou</h2>
                            </span>
                            <article className={`recommended-card ${selectedTheme}`}>
                                <figure className={`recommended-game-image-wrapper`}>
                                <img className={`recommended-game-image`} src={currentRecommendedGameListData?.results[currentRecommended].background_image} alt="game-image"/>
                                </figure>
                                <span className={`recommended-game-info-wrapper`}>
                                    <div className={`recommended-text-info`}>
                                        <h3 className={`recommended-text-description`}>Titel</h3>
                                        <h3 className={`recommended-text-content`}>{currentRecommendedGameListData?.results[currentRecommended].name}</h3>
                                    </div>

                                    <div className={`recommended-text-info`}>
                                        <h3 className={`recommended-text-description`}>Uitgifte datum</h3>
                                        <h3 className={`recommended-text-content`}>{currentRecommendedGameListData?.results[currentRecommended].released}</h3>
                                    </div>
                                    <div className={`recommended-text-info`}>
                                        <h3 className={`recommended-text-description`}>Metascore</h3>
                                        <Metascore className={`game-detail-text-content`}
                                               value={currentRecommendedGameListData?.results[currentRecommended].metacritic}/>
                                    </div>
                                    <GamePlatformIcons platforms={currentRecommendedGameListData?.results[currentRecommended].parent_platforms} className={` recommended-game-card-platforms game-detail-game-card-platforms`} />
                                
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

            <StatusMessage statusState={currentGameListLoading} type={"loading"} content={"Laden"}/>

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
                                <SortingFilter
                                    onApplyFilters={handleSortingChange}
                                    content={"Sorteer op:"}
                                    type={'sorting'}
                                    selectedFilters={sortingFilters?.sort}
                                />
                                <SortingFilter
                                    onApplyFilters={handleFilterChange}
                                    content={"Filter op:"}
                                    type={"filter"}
                                    selectedFilters={sortingFilters?.genres}
                                />
                            </span>
                            <span className={"hidden-item"}></span>
                        </div>

                        {currentGameListData && <section className={"game-card-wrapper"}>
                            {currentGameListData && currentGameListData?.results?.length > 0 && currentGameListData?.results?.map(game => (
                                <GameCard
                                    key={game?.id}
                                    gameTitle={game?.name}
                                    gameImage={game?.background_image}
                                    gamePlatforms={game?.parent_platforms}
                                    gameId={game?.id}
                                    favorite={checkFavorite(game?.id)}
                                />

                            ))}
                        </section>}

                        <StatusMessage statusState={currentGameListLoading} type={"loading"} content={"Laden"}/>

                        <Pagination
                            loadNextPage={currentGameListData?.next ? () => loadNextPage(currentGameListData?.next) : null}
                            loadPreviousPage={currentGameListData?.previous ? () => loadNextPage(currentGameListData?.previous) : null}
                            loadFirstPage={() => loadFirstPage()}
                            lastPageValue={getLastPageNumber()}
                            loadLastPage={() => loadLastPage()}
                            currentPageValue={getCurrentPageNumber()}
                        />
                    </div>
                </section>
            }
        </main>
    );
}


export default Home;