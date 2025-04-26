import {createContext, useEffect, useState} from "react";
import StatusMessage from "../components/statusMessage/StatusMessage.jsx";
import {deleteToken, getToken, getTokenUserId, getTokenUsername, saveToken} from "../helpers/auth.js";
import { useGetUserInfo} from "../hooks/useUser.js";

export const AuthContext = createContext(null)

function AuthContextProvider ({ children }) {
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending',
    })
    const { getUserInfo } = useGetUserInfo()

    async function login (token) {
        saveToken(token)
        const tokenUsername = getTokenUsername(token)
        const tokenUserId = getTokenUserId(token)
        try{
            const userData = await getUserInfo(token, tokenUsername)

            if (!userData) {
                throw new Error("AutProvider.jsx - 26 - User data is null")
            }

            setAuthState({
                user: {
                    username: `${userData?.data?.username}`,
                    email: `${userData?.data?.email}`,
                    info: `${userData?.data?.info}`,
                    id: tokenUserId,
                },
                status: 'done',
            });

        } catch (e) {
            console.log(e)

            setAuthState({
                user: null,
                status: 'done',
            });
        }
    }

    function logout () {
        deleteToken()

        setAuthState({
            user: null,
            status: 'done',
        });
    }

    useEffect(() => {
        const currentToken = getToken();

        if (currentToken) {
            login(currentToken)
        }
        else{
            setAuthState({
                user: null,
                status: 'done',
            });
        }
    }, []);

    const authData = {
        ...authState,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={{authData}}>
            {authState.status === 'pending'
                ? <StatusMessage type={"loading"} content={"Laden" } />
                : children
            }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;