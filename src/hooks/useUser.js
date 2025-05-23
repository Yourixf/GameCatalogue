import { useApiCall } from "./useApiCall.js";

// For cleaner code view
const BASE_URL = import.meta.env.VITE_NOVI_API_BASE_URL;
const API_KEY = import.meta.env.VITE_NOVI_API_KEY;

export function useRegisterUser () {
    const { fetchData, data, loading, error} = useApiCall();

    async function registerUser (userData) {
        const response = await fetchData(
            `${BASE_URL}/users`,
            "POST",
            userData,
            { "X-Api-Key": `${API_KEY}` }
        );
        return response;
    };
    return { registerUser, data, loading, error};
}

export function useLoginUser () {
    const { fetchData, data, loading, error} = useApiCall();

    async function loginUser (userData) {
        const response = await fetchData(
            `${BASE_URL}/users/authenticate`,
            "POST",
            userData,
            { "X-Api-Key": `${API_KEY}` }
        );
        return response;
    };
    return { loginUser, data, loading, error };
}

export function useGetUserInfo () {
    const { fetchData, data, loading, error } = useApiCall();

    async function getUserInfo (currentToken, tokenUsername) {
        const response = await fetchData(
            `${BASE_URL}/users/${tokenUsername}`,
            "GET",
            null,
            { "X-Api-Key": `${API_KEY}`,
                "Authorization": `Bearer ${currentToken}`
            }
        );
        return response;
    };

    return { getUserInfo, data, loading, error };
}

export function useUpdateUserInfo () {
    const { fetchData, data, loading, error } = useApiCall();

    async function updateUserInfo (userData, currentToken, tokenUsername) {
        const response = await fetchData(
            `${BASE_URL}/users/${tokenUsername}`,
            "PUT",
            userData,
            { "X-Api-Key": `${API_KEY}`,
                "Authorization": `Bearer ${currentToken}`
            }
        );
        return response;
    };
    return { updateUserInfo, data, loading, error };
}


export function useGetUserFavorites () {
    const { fetchData, data, loading, error } = useApiCall();

    async function getUserFavorites (tokenUsername, currentToken) {
        const response = await fetchData(
            `${BASE_URL}/users/${tokenUsername}/info`,
            "GET",
            null,
            { "X-Api-Key": `${API_KEY}`,
                "Authorization": `Bearer ${currentToken}`
            }
        );
        return response;
    };
    return { getUserFavorites, data, loading, error };
}
