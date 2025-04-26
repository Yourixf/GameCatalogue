import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { UserInfoContext } from "../context/UserInfoProvider.jsx";
import { profilePictures } from "../assets/profilePictures/profilePictures";

export function getProfilePictureSrc(rawInfo) {
    let filename = "defaultProfile.png";

    if (rawInfo) {
        try {
            const parsedInfo = typeof rawInfo === "string" ? JSON.parse(rawInfo) : rawInfo;
            filename = parsedInfo?.profile_picture || filename;
        } catch (e) {
            console.error("Fout bij het parsen van user info:", e);
        }
    }

    const match = profilePictures?.find(p => p.file === filename);
    return match?.src;
}

export function useAuthData () {
    const { authData } = useContext(AuthContext) ?? {};
    return authData ?? null;
}

export function useUserInfo () {
    const { userInfo } = useContext(UserInfoContext) ?? {};
    return userInfo ?? null;
}