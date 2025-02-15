import { useApiCall } from "./useApiCall.js";

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
    };

    return { loginUser, data, loading, error };
}