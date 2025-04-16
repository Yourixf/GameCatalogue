import {createContext, useContext, useEffect, useState} from "react";
import StatusMessage from "../components/statusMessage/StatusMessage.jsx";
import {AuthContext} from "./AuthProvider.jsx";
import {useGetUserFavorites} from "../hooks/useUser.js";
import {getToken} from "../helpers/auth.js";

export const UserInfoContext = createContext({
    userInfoData: null,
    status: 'pending'})

function UserInfoProvider ({children}) {

    const { authData } = useContext(AuthContext)

    const [ userInfoState, setUserInfoState ] = useState({
        userInfoData: null,
        status: 'pending',
    })

    const { getUserFavorites, data:favoritesData } = useGetUserFavorites();

    useEffect(() => {
        if (authData?.status === "done") {
            if (authData?.user) {
                getUserFavorites(authData?.user?.username, getToken());
            } else {
                setUserInfoState({
                    userInfoData: null,
                    status: "done"
                });
            }
        }
    }, [authData]);

    useEffect(() => {
        if (favoritesData) {
            setUserInfoState({
                userInfoData: favoritesData,
                status: "done"
            });
        }
    }, [favoritesData]);

    function refreshUserInfo () {
        if (authData?.user) {
            getUserFavorites(authData?.user?.username, getToken());
        }
    }

    const userInfo = ({
        ...userInfoState,
        refreshUserInfo,
    })

    return (
        <UserInfoContext.Provider value={{userInfo}}>
            {userInfo.status === `pending`
                ? <StatusMessage type={"loading"} content={"User info laden "}/>
                : children
            }
        </UserInfoContext.Provider>
    )
}

export default UserInfoProvider