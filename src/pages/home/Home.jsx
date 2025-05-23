import {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {useAuthData, useUserInfo} from "../../helpers/user.js";
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
    const userInfo = useUserInfo();
    const authData = useAuthData();

    const navigate = useNavigate();

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

    function handleRecommendedDetailClick () {
        navigate('/game/' + currentRecommendedGameListData?.results[currentRecommended].id )
    }

    return(
        <main className={`page-container ${selectedTheme} home-page-container`}>

            {authData.user && userInfo && currentRecommendedGameListData &&
                <section className={`section-outer-container recommended-section-outer`}>
                    <div className={`section-inner-container recommended-section-inner ${selectedTheme}`}>
                        <span className={"recommended-section-wrapper"}>

                            <span className={"section-title-wrapper recommended-card-title-wrapper"}>
                                <h2 className={`section-title recommended-title`}>Aanbevolen voor jou</h2>
                            </span>
                            <article onClick={handleRecommendedDetailClick} className={`recommended-card ${selectedTheme}`}>
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
                                <span onClick={() => setCurrentRecommended(0)} className={`recommended-pagination-other ${currentRecommended === 0 && `currently-selected`}` }
                                      aria-label={"game-1"}></span>
                                <span onClick={() => setCurrentRecommended(1)} className={`recommended-pagination-other ${currentRecommended === 1 && `currently-selected`}`} aria-label={"game 2"}></span>
                                <span onClick={() => setCurrentRecommended(2)} className={`recommended-pagination-other ${currentRecommended === 2 && `currently-selected`}`} aria-label={"game 3"}></span>
                                <span onClick={() => setCurrentRecommended(3)} className={`recommended-pagination-other ${currentRecommended === 3 && `currently-selected`}`} aria-label={"game 4"}></span>
                                <span onClick={() => setCurrentRecommended(4)} className={`recommended-pagination-other ${currentRecommended === 4 && `currently-selected`}`} aria-label={"game 5"}></span>
                                <span onClick={() => setCurrentRecommended(5)} className={`recommended-pagination-other ${currentRecommended === 5 && `currently-selected`}`} aria-label={"game 6"}></span>
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
                        <div className={"section-title-wrapper"}>
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