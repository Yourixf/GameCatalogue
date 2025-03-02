import {useApiCall } from "./useApiCall.js";

// For cleaner code view
const BASE_URL = import.meta.env.VITE_RAWG_API_BASE_URL;
const API_KEY = `key=${import.meta.env.VITE_RAWG_API_KEY}`;

export function useGetGameList () {
    const { fetchData, data, loading, error } = useApiCall();

    async function getGameList () {
        const response = await fetchData(
            `${BASE_URL}/games?${API_KEY}`,
            `GET`,
            null
        );
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

export function useGetGameSearchList () {
    const { fetchData, data, loading, error } = useApiCall();

    async function getGameSearchList (title) {
        const response = await fetchData(
        `${BASE_URL}/games?search=${title}&${API_KEY}`,
        `GET`,
        null
        );
        return response
    };
    return { getGameSearchList, data, loading, error }
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

    async function getLastPage (lastPageNumber) {
        const response = await fetchData(
            `${BASE_URL}/games?${API_KEY}&page=${lastPageNumber}`,
            `GET`,
            null
        );
        return response
    };
    return { getLastPage, data, loading, error}
}