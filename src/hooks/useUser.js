import { useApiCall } from "./useApiCall.js";
import {useContext, useEffect, useState} from "react";
import {getToken, getTokenUsername} from "../helpers/auth.js";
import {getProfilePictureSrc} from "../helpers/user.js";

// For cleaner code view
const BASE_URL = import.meta.env.VITE_NOVI_API_BASE_URL;
const API_KEY = import.meta.env.VITE_NOVI_API_KEY;

export function useRegisterUser () {
    const { fetchData, data, loading, error} = useApiCall();

    async function registerUser (userData) {
        const response = await fetchData(
            `${BASE_URL}/api/auth/signup`,
            "POST",
            userData,
            // { "X-Api-Key": `${API_KEY}` }
        );
        return response;
    };
    return { registerUser, data, loading, error};
}

export function useLoginUser () {
    const { fetchData, data, loading, error} = useApiCall();

    async function loginUser (userData) {
        const response = await fetchData(
            `${BASE_URL}/api/auth/signin`,
            "POST",
            userData,
            // { "X-Api-Key": `${API_KEY}` }
        );
        console.warn(response)
        return response;
    };
    return { loginUser, data, loading, error };
}

export function useGetUserInfo () {
    const { fetchData, data, loading, error } = useApiCall();

    async function getUserInfo (currentToken) {
        const response = await fetchData(
            `${BASE_URL}/api/user`,
            "GET",
            null,
            {
                // "X-Api-Key": `${API_KEY}`,
                "Authorization": `Bearer ${currentToken}`
            }
        );
        console.warn(response)
        return response;
    };

    return { getUserInfo, data, loading, error };
}

export function useUpdateUserInfo () {
    const { fetchData, data, loading, error } = useApiCall();

    async function updateUserInfo (userData, currentToken) {
        const response = await fetchData(
            `${BASE_URL}/users}`,
            "PUT",
            userData,
            {
                // "X-Api-Key": `${API_KEY}`,
                "Authorization": `Bearer ${currentToken}`
            }
        );
        console.warn(response);
        return response;
    };
    return { updateUserInfo, data, loading, error };
}

export function useUploadProfilePicture () {
    const { fetchData, data, loading, error } = useApiCall();

    async function uploadProfilePicture (profilePicture, currentToken, tokenUsername) {
        const formData = new FormData();
        formData.append("file", profilePicture);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }


        const response = await fetchData(
            `${BASE_URL}/users/${encodeURIComponent(tokenUsername)}/upload`,
            "POST",
            formData,
            {
                "Authorization": `Bearer ${currentToken}`
            }
        );

        return response;
    };
    return { uploadProfilePicture, data, loading, error};
}

export function useDownloadProfilePicture () {
    const { fetchData, data, loading, error } = useApiCall();

    async function downloadProfilePicture (currentToken, tokenUsername) {
        const response = await fetchData(
            `${BASE_URL}/users/${tokenUsername}/download`,
            "GET",
            null,
            {
                "accept":"*/*",
                "Authorization": `Bearer ${currentToken}`
            }
        );

        return response;
    };
    return { downloadProfilePicture, data, loading, error};
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

export function useGetCurrentUserInfo () {
    const { authData } = useContext(AuthContext);

    const [ currentUserInfoData, setCurrentUserInfoData ] = useState();
    const [ currentUserInfoLoading, setCurrentUserInfoLoading ] = useState();
    const [ currentUserProfilePicture, setCurrentUserProfilePicture ] = useState();

    const { getUserFavorites, data:getUserFavoritesData, loading:getUserFavoritesLoading, error:getUserFavoritesError } = useGetUserFavorites();

    useEffect(() => {
        // authData?.user && getUserFavorites(getTokenUsername(getToken()), getToken())
    },[])

    // for the data
    useEffect(() => {
        if (getUserFavoritesData) {
            setCurrentUserInfoData(getUserFavoritesData)
            setCurrentUserProfilePicture(getProfilePictureSrc(getUserFavoritesData))
        }
    }, [getUserFavoritesData]);

    useEffect(() => {
        setCurrentUserInfoLoading(getUserFavoritesLoading)
    }, [getUserFavoritesLoading])

    return currentUserInfoData;
}
