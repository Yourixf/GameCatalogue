import {useEffect, useRef, useState} from "react";
import {useApiCall } from "./useApiCall.js";
import {useGetUserFavorites} from "./useUser.js";
import {getToken, getTokenUsername} from "../helpers/auth.js";
import {useAuthData, useUserInfo} from "../helpers/user.js";

// For cleaner code view
const BASE_URL = import.meta.env.VITE_RAWG_API_BASE_URL;
const API_KEY = `key=${import.meta.env.VITE_RAWG_API_KEY}`;

// custom hook for Get game list api call, which checks for parameters value and applies them
export function useGetGameList () {
    // gets base fetch api logic from useApiCall
    const { fetchData, data, loading, error } = useApiCall();

    async function getGameList (query='', options='') {
        // used fetchData from main api call method, gives required parts as an argument
        const response = await fetchData(
            `${BASE_URL}/games?${API_KEY}${query ? `&search=${query}` : ``}${options && options !== 'false' ? `&${options}` : ''
            }`,
            `GET`,
            null,
        );

        return response;
    };
    // returns info for state management
    return { getGameList, data, loading, error }
}

export function useGetGameDetails () {
    const { fetchData, data, loading, error } = useApiCall();

    async function getGameDetails (id) {
        const response = await fetchData(
            `${BASE_URL}/games/${id}?${API_KEY}`,
            `GET`,
            null
        );
        return response;
    };
    return { getGameDetails, data, loading, error }
}

export function useGetGameScreenshots () {
    const { fetchData, data, loading, error } = useApiCall();

    async function getGameScreenshots (id) {
        const response = await fetchData(
            `${BASE_URL}/games/${id}/screenshots?${API_KEY}`,
            `GET`,
            null
        );
        return response
    }
    return { getGameScreenshots, data, loading, error }
}

export function useGetNextPreviousPage () {
    const {fetchData, data, loading, error } = useApiCall();

    async function getNextPreviousPage (url) {
        const response = await fetchData(
            `${url}`,
            `GET`,
            null
        );
        return response
    };
    return { getNextPreviousPage, data, loading, error}
}

export function useGetLastPage () {
    const {fetchData, data, loading, error } = useApiCall();

    async function getLastPage (lastPageNumber, query='', options='') {
        const response = await fetchData(
            `${BASE_URL}/games?${API_KEY}${options && options !== 'false' ? `&${options}` : ''
            }&page=${lastPageNumber}${query ? `&search=${query}` : ``}`,
            `GET`,
            null
        );
        return response
    };
    return { getLastPage, data, loading, error}
}

export function useGetRecommendedGameList () {
    const {fetchData, data, loading, error } = useApiCall();

    async function getRecommendedGameList (options) {
        const response = await fetchData(
            `${BASE_URL}/games?${API_KEY}${options && options !== 'false' ? `&${options}` : ''
            }`,
            "GET",
            null
        )
        return response
    }
    return { getRecommendedGameList, data, loading, error }
}

export function useGetCurrentGameList (query='') {
    const authData = useAuthData();
    const userInfo = useUserInfo();

    const [currentGameListData, setCurrentGameListData ] = useState()
    const [currentRecommendedGameListData, setCurrentRecommendedGameListData] = useState()
    const [currentGameListLoading, setCurrentGameListLoading ] = useState()
    const [currentGameListError, setCurrentGameListError ] = useState()
    const [sortingFilters, setSortingFilters] = useState({
        sort: '',
        genres: []
    })
    const [queryState, setQueryState] = useState(query);

    const gameListType = useRef("main");

    const {
        getGameList,
        data:gameListData,
        loading:gameListLoading,
        error:gameListError } = useGetGameList();

    const {
        getRecommendedGameList,
        data:recommendedGameListData,
        loading:recommendedGameListLoading,
        error:recommendedGameListError} = useGetRecommendedGameList();

    const {
        getNextPreviousPage,
        data:nextPreviousPageData,
        loading:nextPreviousPageLoading,
        error:nextPreviousPageError } = useGetNextPreviousPage()

    const {
        getLastPage,
        data:lastPageData,
        loading:lastPageLoading,
        error:lastPageError } = useGetLastPage()

    const {
        getUserFavorites,
        data:userFavoritesData,
        loading:userFavoritesLoading,
        error:userFavoritesError} = useGetUserFavorites();

    const lastFavRef = useRef(null);

    useEffect(() => {
        if (gameListType.current === "main"){
            getGameList(queryState, getOptionFilters(sortingFilters));
        } else if (gameListType.current === "recommended") {
            getRecommendedGameList(`${getOptionFilters(sortingFilters)}${getFavoriteGameGenres()}`)
        }

        if (authData.user) {
            const token = getToken();
            const username = getTokenUsername(token);
            getUserFavorites(username, token);
        }
    }, [authData.user, queryState, sortingFilters]);

    // for the data state
    useEffect(() => {
        if (gameListData){
            setCurrentGameListData(gameListData)
        }
    }, [gameListData, userFavoritesData, sortingFilters]);

    useEffect(() => {
        if (!nextPreviousPageData) return

        if (gameListType.current === "recommended") {
            setCurrentRecommendedGameListData(nextPreviousPageData)
        } else {
            setCurrentGameListData(nextPreviousPageData)
        }
    }, [nextPreviousPageData])

    useEffect(() => {
        if (!lastPageData) return

        if (gameListType.current === "recommended") {
            setCurrentRecommendedGameListData(lastPageData)
        } else if (gameListType.current === "main") {
            setCurrentGameListData(lastPageData)
        }
    }, [lastPageData])

    useEffect(() => {
        setCurrentRecommendedGameListData(recommendedGameListData)
    }, [recommendedGameListData])

    useEffect(() => {
        applySortingFilters(sortingFilters, gameListType.current)
    }, [sortingFilters])

    useEffect(() => {
        const currentFavorites = userInfo?.userInfoData?.favorite_games;

        const isChanged = JSON.stringify(currentFavorites) !== lastFavRef.current;

        if (isChanged && currentFavorites && Object.keys(currentFavorites).length > 0) {
            lastFavRef.current = JSON.stringify(currentFavorites);
            getFavoriteGenresGames();
        }
    }, [userInfo?.userInfoData?.favorite_games]);


    // for the loading state
    useEffect(() => {
        setCurrentGameListLoading(gameListLoading)
    }, [gameListLoading])

    useEffect(() => {
        setCurrentGameListLoading(nextPreviousPageLoading)
    }, [nextPreviousPageLoading])

    useEffect(() => {
        setCurrentGameListLoading(lastPageLoading)
    }, [lastPageLoading])

    useEffect(() => {
        setCurrentGameListLoading(userFavoritesLoading)
    }, [userFavoritesLoading])

    useEffect(() => {
        setCurrentGameListLoading(recommendedGameListLoading)
    }, [recommendedGameListLoading])


    // for the error state
    useEffect(() => {
        setCurrentGameListError(gameListError)
    }, [gameListError])

    useEffect(() => {
        setCurrentGameListError(nextPreviousPageError)
    }, [nextPreviousPageError])

    useEffect(() => {
        setCurrentGameListError(lastPageError)
    }, [lastPageError])

    useEffect(() => {
        setCurrentGameListError(userFavoritesError)
    }, [userFavoritesError])

    useEffect(() => {
        setCurrentGameListError(recommendedGameListError)
    }, [recommendedGameListError])

    // for the pagination
    function loadNextPage (url, type = "main") {
        gameListType.current = type;
        getNextPreviousPage(url)
    }

    function loadFirstPage (query='', type = "main") {
        gameListType.current = type;

        if (gameListType.current === "main") {
            getGameList(query, getOptionFilters(sortingFilters))
        } else if (gameListType.current === "recommended") {
            getRecommendedGameList(getFavoriteGameGenres())
        }
    }

    function getLastPageNumber (type = "main") {
        // there is an hard limit for max pages from the API itself, which is 500
        // this only happens with api request contains custom arguments
        // Also loading over page 500 often gives 502 timeout error
        gameListType.current = type;
        let pageMaxNumber;

        if (gameListType.current === "main"){
            pageMaxNumber = Math.floor(currentGameListData.count / 20);
        } else  if (gameListType.current === "recommended") {
            pageMaxNumber = Math.floor(currentRecommendedGameListData.count / 20);
        }
        // this makes sure the user can't accidentally get an 404 error due to the
        // max page restraints or get an timeout error
        if (pageMaxNumber > 500){
            return 500
        } else {
            return pageMaxNumber
        }
    }

    function loadLastPage (type = "main") {
        gameListType.current = type;
        let lastPageNumber;

        if (gameListType.current === "main") {
            lastPageNumber = getLastPageNumber()
            getLastPage(lastPageNumber, query, getOptionFilters(sortingFilters))
        } else if (gameListType.current === "recommended") {
            lastPageNumber = getLastPageNumber("recommended")
            getLastPage(lastPageNumber, null,  getFavoriteGameGenres())
        }
    }

    // method that check what the current page number is from the response info
    function getCurrentPageNumber (type = "main") {
        gameListType.current = type;

        let currentPage = ""
        let gameListDataLocal;

        // sets appropriate dataset
        if (gameListType.current === "main") {
            gameListDataLocal = currentGameListData;
        } else if (gameListType.current === "recommended") {
            gameListDataLocal = currentRecommendedGameListData
        }

        // checks response for the next data
        if (gameListDataLocal?.next) {
            // separates the URL by & char, checks for the page= part of the URL
            const nextPageUrl = gameListDataLocal?.next?.split("&")
            const hasPage = nextPageUrl.find(param => param.startsWith("page="))

            if (hasPage) {
                // gets page number from url
                currentPage = parseInt(hasPage.replace("page=", "")) - 1;
            } else {
                currentPage = nextPageUrl[1]?.split("=")[1] - 1
            }
        // if there isn't an next in the url, checks for a previous in the data
        } else if (gameListDataLocal?.previous) {
            // splits url and gets current page number
            const previousPageUrl = gameListDataLocal?.previous?.split("&")
            currentPage = previousPageUrl[1]?.split("=")[1]
        }
        return currentPage
    }

    function checkFavorite(gameId) {
        if (!authData.user || !userFavoritesData?.favorite_games) return false;

        return Object.values(userFavoritesData.favorite_games)
            .some(genreList => genreList.includes(Number(gameId)));
    }

    // for the sort and filter options
    function handleSortingChange(newSort, type= "main") {
        gameListType.current = type;
        setSortingFilters(prevFilters => ({ ...prevFilters, sort: newSort }));
    }

    function handleFilterChange(newGenres) {
        setSortingFilters(prevFilters => ({ ...prevFilters, genres: newGenres }));
    }

    function getOptionFilters(options) {
        let sortingFilterList = '';
        const genreList= [];

        // checks if the options object sort key has a value, if so, truthy: adds to sortingFilterList
        if (options?.sort) {
            sortingFilterList = sortingFilterList + `ordering=${options?.sort}`;
        }

        // check is the option object genre has a value, truthy: adds to sortingFilterList
        if (options?.genres){
            options?.genres?.map(genre => (
                genreList?.push(`${genre}`)
            ))
        }

        // formats the genrelist
        if (genreList?.length > 0) {
            sortingFilterList = `${sortingFilterList}&genres=${genreList.join(',')}`
        }
        return sortingFilterList;
    }

    function applySortingFilters(options, type = "main") {
        gameListType.current = type;

        let query = type === "main" ? queryState : null;

        let orderingPart = '';
        if (options?.sort) {
            orderingPart = `ordering=${options.sort}`;
        }

        let genresPart = '';
        if (type === "recommended") {
            const favGenres = getFavoriteGameGenres();
            if (favGenres) genresPart = favGenres;
        } else if (type === "main" && options?.genres?.length > 0) {
            genresPart = `genres=${options.genres.join(',')}`;
        }

        let fullOptions = [orderingPart, genresPart].filter(Boolean).join('&');

        if (type === "recommended") {
            getRecommendedGameList(fullOptions);
        } else {
            getGameList(query, fullOptions);
        }
    }

    function getFavoriteGameGenres () {
        const genreObj = userInfo?.userInfoData?.favorite_games || {};
        const allGenres = Object.keys(genreObj);

        if (allGenres.length === 0) {
            return null
        }

        const formattedGenreList = `genres=${allGenres.join(',')}`;
        return formattedGenreList;
    }

    async function getFavoriteGenresGames() {
        const genreData = getFavoriteGameGenres()

        if (!genreData) {
            return
        }
        await getRecommendedGameList(getFavoriteGameGenres());
    }

    return {
        currentGameListData,
        currentRecommendedGameListData,
        recommendedGameListLoading,
        recommendedGameListError,
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
        sortingFilters,
        setQueryState,
    }
}