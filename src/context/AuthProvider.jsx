import {createContext, useEffect, useState} from "react";
import StatusMessage from "../components/statusMessage/StatusMessage.jsx";
import {getToken, getTokenUserInfo, getTokenUsername} from "../helpers/auth.js";
import {useGetUserInfo} from "../hooks/useUser.js";


export const AuthContext = createContext(null)

function AuthContextProvider ({ children }) {
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending',
    })

    useEffect(() => {
        //check of er een token in local storage staat.

        const currentToken = getToken();

        if (currentToken) {
            //zoja haal nieuwe dat op en zet deze in state:

            const tokenUsername = getTokenUsername(currentToken)
            const tokenUserInfo = useGetUserInfo(currentToken, tokenUsername)


            setAuthState({
                user: {
                    username: "pietje",
                    id: 1,
                },
                status: 'done',
            });
        }
        else{
            // zo nee
            setAuthState({
                user: null,
                status: 'done',
            });
        }



    }, []);

    const data = {
        ...authState,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {authState.status === 'pending'
                ? <StatusMessage type={"loading"} content={"Laden..."} />
                : children

            }
        </AuthContext.Provider>
    )
}