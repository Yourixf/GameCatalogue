import {useContext, useState} from 'react';
import './Results.css';
import {ThemeContext} from "../../context/ThemeProvider.jsx";
import GameCard from "../../components/gameCard/GameCard.jsx";
import {useGetCurrentGameList, } from "../../hooks/useGames.js";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import SortingFilter from "../../components/sortingFilter/SortingFilter.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import {useParams} from "react-router-dom";

function Results () {
    const { selectedTheme } = useContext(ThemeContext)

    let {query} = useParams();

    const {
        currentGameListData,
        currentGameListLoading,
        currentGameListError,
        loadNextPage,
        loadFirstPage,
        getLastPageNumber,
        loadLastPage,
        getCurrentPageNumber,
        checkFavorite
    } = useGetCurrentGameList(query)


    return (
        <main className={`page-container ${selectedTheme} results-page-container`}>

            <StatusMessage statusState={currentGameListLoading} type={"loading"} content={"Laden..."}/>

            <StatusMessage statusState={currentGameListError} type={"error"}
                           content={currentGameListError ? currentGameListError?.message : "er ging iets fout..."}/>

            {currentGameListData &&
                <section className={`section-outer-container trending-games-outer-container`}>
                    <div className={`section-inner-container trending-games-inner-container`}>
                        <div className={"section-game-header"}>
                            <span className={`result-section-title-wrapper`}>
                                <h2 className={`section-title section-title-description `}>{currentGameListData?.count !== 0 ? "resultaten" : "Geen resultaten"} voor:</h2>
                                <h2 className={`section-title section-title-query`}>{query}</h2>
                            </span>

                            {currentGameListData?.count !== 0 ?
                            <span className={"sorting-filter-wrapper state-two"}>
                                <SortingFilter content={"Sorteer op:"} type={'sorting'}/>
                                <SortingFilter content={"Filter op:"} type={"filter"}/>
                            </span>
                            : null
                             }
                            <span className={"hidden-item"}></span>
                        </div>

                        {currentGameListData && <section className={"game-card-wrapper"}>
                            {currentGameListData && currentGameListData?.results.length > 0 && currentGameListData?.results.map(game => (
                                <GameCard
                                    key={game?.id}
                                    gameTitle={game?.name}
                                    gameImage={game?.background_image}
                                    gamePlatforms={game?.parent_platforms}
                                    gameId={game?.id}
                                    favorite={checkFavorite(game.id)}
                                />

                            ))}
                        </section>}
                        <StatusMessage statusState={currentGameListLoading} type={"loading"} content={"Laden..."}/>
                        {console.log(currentGameListData)}

                        { currentGameListData.count !== 0 ?
                            <Pagination
                            loadNextPage={currentGameListData?.next ? () => loadNextPage(currentGameListData?.next): null}
                            loadPreviousPage={currentGameListData?.previous ? () => loadNextPage(currentGameListData?.previous): null}
                            loadFirstPage={() => loadFirstPage(query)}
                            lastPageValue={getLastPageNumber()}
                            loadLastPage={loadLastPage}
                            currentPageValue={getCurrentPageNumber()}
                            />
                            :
                            null
                        }



                    </div>
                </section>
            }
        </main>

    );
}

export default Results;