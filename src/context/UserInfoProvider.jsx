import {createContext, useContext, useEffect, useState} from "react";
import StatusMessage from "../components/statusMessage/StatusMessage.jsx";
import {AuthContext} from "./AuthProvider.jsx";
import {useGetUserFavorites} from "../hooks/useUser.js";
import {getToken} from "../helpers/auth.js";

export const UserInfoContext = createContext(null)

function UserInfoProvider ({children}) {

    const { authData } = useContext(AuthContext)

    const [ userInfo, setUserInfo ] = useState({
        userInfoData: null,
        status: 'pending'
    })

    const { getUserFavorites, data:favoritesData } = useGetUserFavorites();

    useEffect(() => {
        console.warn("usernfoprovider!!!!")
        authData?.user && getUserFavorites(authData?.user?.username, getToken());
    }, [])

    useEffect(() => {
        console.warn(favoritesData)
        setUserInfo({
            userInfoData: favoritesData,
            status: "done"
        })

        console.warn(userInfo)
    }, [favoritesData])

    return (
        <UserInfoContext.Provider value={{userInfo}}>
            {userInfo.status === `pending`
                ? <StatusMessage type={"loading"} content={"PATAT..."} />
                : children
            }
        </UserInfoContext.Provider>
    )
}

export default UserInfoProvider