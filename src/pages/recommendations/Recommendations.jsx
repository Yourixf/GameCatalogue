import {useContext} from 'react';
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import {UserInfoContext} from "../../context/UserInfoProvider.jsx";
import {useGetCurrentGameList} from "../../hooks/useGames.js";
import GameCard from "../../components/gameCard/GameCard.jsx";
import StatusMessage from '../../components/statusMessage/StatusMessage.jsx';
import SortingFilter from "../../components/sortingFilter/SortingFilter.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import './Recommendations.css';

function Recommendations () {
    const { selectedTheme } = useContext(ThemeContext)
    const { userInfo } = useContext(UserInfoContext)

    const {
        currentRecommendedGameListData,
        currentGameListLoading,
        currentGameListError,
        loadNextPage,
        loadFirstPage,
        getLastPageNumber,
        loadLastPage,
        getCurrentPageNumber,
        checkFavorite,
        handleSortingChange,
        sortingFilters
    } = useGetCurrentGameList()

    return (
        <main className={`page-container ${selectedTheme} recommendations-page-container`}>
            {!currentGameListLoading &&
                [...new Set(Object.values(userInfo.userInfoData?.favorite_games || {}).flat())].length === 0
                &&
                <StatusMessage statusState={true} type={"error"}
                               content={currentGameListError ? currentGameListError?.message : "Je hebt geen aanbevelingen."}/>
            }

            {currentRecommendedGameListData && !currentGameListError &&
                <section className={`section-outer-container recommended-games-outer-container`}>
                    <div className={`section-inner-container recommended-games-inner-container`}>
                        <div className={"section-title-wrapper"}>
                            <h2 className={`section-title`}>
                                Aanbevelingen
                            </h2>
                            <span className={"sorting-filter-wrapper state-two"}>
                            <SortingFilter
                                onApplyFilters={handleSortingChange}
                                content={"Sorteer op:"}
                                type={'sorting'}
                                selectedFilters={sortingFilters?.sort}
                                listType={"recommended"}
                            />

                        </span>
                            <span className={"hidden-item"}></span>
                        </div>

                        <StatusMessage statusState={currentGameListLoading} type={"loading"} content={"Laden"}/>

                        <StatusMessage statusState={currentGameListError} type={"error"}
                                       content={currentGameListError ? currentGameListError?.message : "er ging iets fout..."}/>

                        {currentRecommendedGameListData && <section className={"game-card-wrapper"}>
                            {currentRecommendedGameListData && currentRecommendedGameListData?.results?.length > 0 && currentRecommendedGameListData?.results?.map(game => (
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
                            loadNextPage={currentRecommendedGameListData?.next ? () => loadNextPage(currentRecommendedGameListData?.next, "recommended") : null}
                            loadPreviousPage={currentRecommendedGameListData?.previous ? () => loadNextPage(currentRecommendedGameListData?.previous, "recommended") : null}
                            loadFirstPage={() => loadFirstPage(null, "recommended")}
                            lastPageValue={getLastPageNumber("recommended")}
                            loadLastPage={() => loadLastPage("recommended")}
                            currentPageValue={getCurrentPageNumber("recommended")}
                            listType={"recommended"}
                        />
                    </div>
                </section>
                }
        </main>
    );
}

export default Recommendations;