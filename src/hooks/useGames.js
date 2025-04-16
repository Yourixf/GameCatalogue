import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../context/AuthProvider.jsx";
import {UserInfoContext} from "../context/UserInfoProvider.jsx";
import {useApiCall } from "./useApiCall.js";
import {useGetUserFavorites} from "./useUser.js";
import {getToken, getTokenUsername} from "../helpers/auth.js";

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
            `${BASE_URL}/games?${API_KEY}${query && `&search=${query}`}${options && options !== 'false' ? `&${options}` : ''
            }`,
            `GET`,
            null,
        );
        // console.warn(options)
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
            }&page=${lastPageNumber}${query && `&search=${query}`}`,
            `GET`,
            null
        );
        // console.warn(options)
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
        console.warn(response)
        return response
    }
    return { getRecommendedGameList, data, loading, error }
}

export function useGetCurrentGameList (query='') {
    const { authData } = useContext(AuthContext)
    const { userInfo } = useContext(UserInfoContext)


    const [currentGameListData, setCurrentGameListData ] = useState()
    const [currentRecommendedGameListData, setCurrentRecommendedGameListData] = useState()
    const [currentGameListLoading, setCurrentGameListLoading ] = useState()
    const [currentGameListError, setCurrentGameListError ] = useState()
    const [sortingFilters, setSortingFilters] = useState({
        sort: '',
        genres: []
    })
    const [favoriteGenres, setFavoriteGenres ] = useState([]);
    const [queryState, setQueryState] = useState(query);

    const { getGameList, data:gameListData, loading:gameListLoading, error:gameListError } = useGetGameList();
    const { getRecommendedGameList, data:recommendedGameListData, loading:recommendedGameListLoading, error:recommendedGameListError} = useGetRecommendedGameList();
    const { getGameDetails, data:gameDetailData, loading:gameDetailLoading, error:gameDetailError } = useGetGameDetails()
    const { getNextPreviousPage, data:nextPreviousPageData, loading:nextPreviousPageLoading, error:nextPreviousPageError } = useGetNextPreviousPage()
    const { getLastPage, data:lastPageData, loading:lastPageLoading, error:lastPageError } = useGetLastPage()
    const { getUserFavorites, data:userFavoritesData, loading:userFavoritesLoading, error:userFavoritesError} = useGetUserFavorites();

    const lastFavRef = useRef(null);

    useEffect(() => {
        getGameList(queryState, getOptionFilters(sortingFilters));

        if (authData.user) {
            const token = getToken();
            const username = getTokenUsername(token);
            getUserFavorites(username, token);
        }
    }, [authData.user, queryState, sortingFilters]);



    // for the data state
    useEffect(() => {
        if (gameListData)
            // console.log(gameListData);
            setCurrentGameListData(gameListData)
    }, [gameListData, userFavoritesData, sortingFilters]);

    useEffect(() => {
        // console.log(nextPreviousPageData)
        setCurrentGameListData(nextPreviousPageData)
    }, [nextPreviousPageData])

    useEffect(() => {
        // console.log(lastPageData)
        setCurrentGameListData(lastPageData)
    }, [lastPageData])

    useEffect(() => {
        console.error(recommendedGameListData)
        setCurrentRecommendedGameListData(recommendedGameListData)
    }, [recommendedGameListData])

    useEffect(() => {
        applySortingFilters(sortingFilters)
    }, [sortingFilters])

    useEffect(() => {
        const currentFavorites = userInfo?.userInfoData?.favorite_games;

        const isChanged = JSON.stringify(currentFavorites) !== lastFavRef.current;

        if (isChanged && currentFavorites) {
            lastFavRef.current = JSON.stringify(currentFavorites);
            getFavoriteGenresGames();
        }

    }, [userInfo?.userInfoData?.favorite_games]);


    // for the loading state
    useEffect(() => {
        // console.log(gameListLoading)
        setCurrentGameListLoading(gameListLoading)
    }, [gameListLoading])

    useEffect(() => {
        // console.log(nextPreviousPageLoading)
        setCurrentGameListLoading(nextPreviousPageLoading)
    }, [nextPreviousPageLoading])

    useEffect(() => {
        // console.log(lastPageLoading)
        setCurrentGameListLoading(lastPageLoading)
    }, [lastPageLoading])

    useEffect(() => {
        // console.log(userFavoritesLoading)
        setCurrentGameListLoading(userFavoritesLoading)
    }, [userFavoritesLoading])

    useEffect(() => {
        // console.log(recommendedGameListLoading)
        setCurrentGameListLoading(recommendedGameListLoading)
    }, [recommendedGameListLoading])


    // for the error state
    useEffect(() => {
        // console.log(gameListError)
        setCurrentGameListError(gameListError)
    }, [gameListError])

    useEffect(() => {
        // console.log(nextPreviousPageError)
        setCurrentGameListError(nextPreviousPageError)
    }, [nextPreviousPageError])

    useEffect(() => {
        // console.log(lastPageError)
        setCurrentGameListError(lastPageError)
    }, [lastPageError])

    useEffect(() => {
        // console.log(userFavoritesError)
        setCurrentGameListError(userFavoritesError)
    }, [userFavoritesError])

    useEffect(() => {
        // console.log(recommendedGameListError)
        setCurrentGameListError(recommendedGameListError)
    }, [recommendedGameListError])

    // for the pagination
    function loadNextPage (url) {
        getNextPreviousPage(url)
    }

    function loadFirstPage (query='',) {
        getGameList(query, getOptionFilters(sortingFilters))
    }

    function getLastPageNumber () {
        // there is an hard limit for max pages from the API itself, which is 500
        // this only happens with api request contains custom arguments

        const pageMaxNumber = Math.floor(currentGameListData.count / 20);

        // this makes sure the user can't accidentally get an 404 error due to the max page restraints
        if (query || getOptionFilters(sortingFilters)) {
            if (pageMaxNumber > 500){
                return 500
            } else {
                return pageMaxNumber
            }
        } else {
            return pageMaxNumber;
        }
    }

    function loadLastPage () {
        const lastPageNumber = getLastPageNumber()
        getLastPage(lastPageNumber, query, getOptionFilters(sortingFilters))
    }

    // method that check what the current page number is from the response info
    function getCurrentPageNumber () {
        let currentPage = ""

        // checks response for the next data
        if (currentGameListData?.next) {
            // separates the URL by & char, checks for the page= part of the URL
            const nextPageUrl = currentGameListData?.next?.split("&")
            const hasPage = nextPageUrl.find(param => param.startsWith("page="))

            if (hasPage) {
                // gets page number from url
                currentPage = parseInt(hasPage.replace("page=", "")) - 1;
            } else {
                currentPage = nextPageUrl[1]?.split("=")[1] - 1
            }
        // if there isn't an next in the url, checks for a previous in the data
        } else if (currentGameListData?.previous) {
            //
            const previousPageUrl = currentGameListData?.previous?.split("&")
            currentPage = previousPageUrl[1]?.split("=")[1]
        }
        // console.log(currentPage)
        return currentPage
    }

    function checkFavorite(gameId) {
        if (!authData.user || !userFavoritesData?.favorite_games) return false;

        return Object.values(userFavoritesData.favorite_games)
            .some(genreList => genreList.includes(Number(gameId)));
    }


    // for the sort and filter options
    function handleSortingChange(newSort) {
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

        if (genreList?.length > 0) {
            sortingFilterList = `${sortingFilterList}&genres=${genreList}`
        }
        return sortingFilterList;
    }

    function applySortingFilters (options) {
        const sortingFilterList = getOptionFilters(options)

        getGameList(query, sortingFilterList)
    }

    async function getFavoriteGenresGames() {
        const genreObj = userInfo?.userInfoData?.favorite_games || {};
        const allGenres = Object.keys(genreObj);

        if (allGenres.length === 0) {
            setFavoriteGenres(null);
            return;
        }

        const formattedGenreList = `genres=${allGenres.join(',')}`;
        setFavoriteGenres(formattedGenreList);
        await getRecommendedGameList(formattedGenreList);
    }

    return {
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
        sortingFilters,
    }
}