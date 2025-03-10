import {useApiCall } from "./useApiCall.js";
import {useContext, useEffect, useState} from "react";
import {useGetUserFavorites} from "./useUser.js";
import {getToken, getTokenUsername} from "../helpers/auth.js";
import {AuthContext} from "../context/AuthProvider.jsx";

// For cleaner code view
const BASE_URL = import.meta.env.VITE_RAWG_API_BASE_URL;
const API_KEY = `key=${import.meta.env.VITE_RAWG_API_KEY}`;


export function useGetGameList () {
    const { fetchData, data, loading, error } = useApiCall();

    async function getGameList (query='') {
        const response = await fetchData(
            `${BASE_URL}/games?${API_KEY}${query && `&search=${query}`}`,
            `GET`,
            null,
        );

        console.warn(response)
        return response;
    };
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

    async function getLastPage (lastPageNumber, query='') {
        const response = await fetchData(
            `${BASE_URL}/games?${API_KEY}&page=${lastPageNumber}${query && `&search=${query}`}`,
            `GET`,
            null
        );
        return response
    };
    return { getLastPage, data, loading, error}
}

export function useGetCurrentGameList (query='') {
    const [currentGameListData, setCurrentGameListData ] = useState()
    const [currentGameListLoading, setCurrentGameListLoading ] = useState()
    const [currentGameListError, setCurrentGameListError ] = useState()

    const { authData } = useContext(AuthContext)


    const { getGameList, data:gameListData, loading:gameListLoading, error:gameListError } = useGetGameList();
    const { getNextPreviousPage, data:nextPreviousPageData, loading:nextPreviousPageLoading, error:nextPreviousPageError } = useGetNextPreviousPage()
    const { getLastPage, data:lastPageData, loading:lastPageLoading, error:lastPageError } = useGetLastPage()
    const { getUserFavorites, data:userFavoritesData, loading:userFavoritesLoading, error:userFavoritesError} = useGetUserFavorites();


    useEffect(() => {
        getGameList(query)
        authData.user && getUserFavorites(getTokenUsername(getToken()), getToken())
    }, [query,])

    // for the data state
    useEffect(() => {
        if (gameListData)
            console.log(gameListData);
            setCurrentGameListData(gameListData)
        console.log(currentGameListData)
        if (userFavoritesData)
            console.log(userFavoritesData)
    }, [gameListData, userFavoritesData]);

    useEffect(() => {
        console.log(nextPreviousPageData)
        setCurrentGameListData(nextPreviousPageData)
    }, [nextPreviousPageData])

    useEffect(() => {
        console.log(lastPageData)
        setCurrentGameListData(lastPageData)
    }, [lastPageData])



    // for the loading state
    useEffect(() => {
        console.log(gameListLoading)
        setCurrentGameListLoading(gameListLoading)
    }, [gameListLoading])

    useEffect(() => {
        console.log(nextPreviousPageLoading)
        setCurrentGameListLoading(nextPreviousPageLoading)
    }, [nextPreviousPageLoading])

    useEffect(() => {
        console.log(lastPageLoading)
        setCurrentGameListLoading(lastPageLoading)
    }, [lastPageLoading])

    useEffect(() => {
        console.log(userFavoritesLoading)
        setCurrentGameListLoading(userFavoritesLoading)
    }, [userFavoritesLoading])

    // for the error state
    useEffect(() => {
        console.log(gameListError)
        setCurrentGameListError(gameListError)
    }, [gameListError])

    useEffect(() => {
        console.log(nextPreviousPageError)
        setCurrentGameListError(nextPreviousPageError)
    }, [nextPreviousPageError])

    useEffect(() => {
        console.log(lastPageError)
        setCurrentGameListError(lastPageError)
    }, [lastPageError])

    useEffect(() => {
        console.log(userFavoritesError)
        setCurrentGameListError(userFavoritesError)
    }, [userFavoritesError])

    function loadNextPage (url) {
        getNextPreviousPage(url)
    }

    function loadFirstPage (query='') {
        getGameList(query)
    }

    function getLastPageNumber () {
        return Math.floor(currentGameListData.count / 20)
    }

    function loadLastPage () {
        const lastPageNumber = getLastPageNumber()
        getLastPage(lastPageNumber, query)
    }

    function getCurrentPageNumber () {
        let currentPage = ""

        if (currentGameListData?.next) {
            const nextPageUrl = currentGameListData?.next?.split("&")
            currentPage = nextPageUrl[1]?.split("=")[1] - 1
        } else if (currentGameListData?.previous) {
            const previousPageUrl = currentGameListData?.previous?.split("&")
            currentPage = previousPageUrl[1]?.split("=")[1]
        }

        console.log(currentPage)

        return currentPage
    }

    // IN PROGRESS

    function checkFavorite (gameId) {
        if (authData.user){
            console.error(!!userFavoritesData?.favorite_games?.includes(Number(gameId)))
            return !!userFavoritesData?.favorite_games?.includes(Number(gameId))
        } else {
            return false
        }

    }


    return {
        currentGameListData,
        currentGameListLoading,
        currentGameListError,
        loadNextPage,
        loadFirstPage,
        getLastPageNumber,
        loadLastPage,
        getCurrentPageNumber,
        checkFavorite
    }

}
