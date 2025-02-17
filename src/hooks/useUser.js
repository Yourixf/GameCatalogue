import { useApiCall } from "./useApiCall.js";
import {getToken, getTokenUsername, saveToken} from "../helpers/auth.js";

// For cleaner code view
const BASE_URL = import.meta.env.VITE_NOVI_API_BASE_URL;
const API_KEY = import.meta.env.VITE_NOVI_API_KEY;

export function useRegisterUser () {
    const { fetchData, data, loading, error} = useApiCall();

    function registerUser (userData) {
        fetchData(
            `${BASE_URL}/users`,
            "POST",
            userData,
            { "X-Api-Key": `${API_KEY}` }
        );
    };

    return { registerUser, data, loading, error};
}

export function useLoginUser () {
    const { fetchData, data, loading, error} = useApiCall();

    function loginUser (userData) {
        fetchData(
            `${BASE_URL}/users/authenticate`,
            "POST",
            userData,
            { "X-Api-Key": `${API_KEY}` }
        );
        // token wordt nu automatisch in local storage gezet
        data && saveToken(data.jwt)
    };

    return { loginUser, data, loading, error };
}

export function useGetUserInfo () {
    const { fetchData, data, loading, error } = useApiCall();


    function getUserInfo (currentToken, tokenUsername) {
        fetchData(
            `${BASE_URL}/users/${tokenUsername}`,
            "GET",
            null,
            { "X-Api-Key": `${API_KEY}`,
                "Authorization": `Bearer ${currentToken}`
            }
        );
    };

    return { getUserInfo, data, loading, error }
}