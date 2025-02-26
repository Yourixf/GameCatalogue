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
    const { fetchData, data, loading, error } = useApiCall()

    async function getGameDetails (id) {
        const response = await fetchData(
            `${BASE_URL}/games/${id}?${API_KEY}`,
            `GET`,
            null
        );
        console.log(response)
        return response;
    };
    return { getGameDetails, data, loading, error }
}