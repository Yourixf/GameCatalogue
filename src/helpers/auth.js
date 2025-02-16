import {jwtDecode} from "jwt-decode";

export function saveToken (token) {
    localStorage.setItem("token", token)
}

export function getToken () {
    return localStorage.getItem("token");
}

export function deleteToken () {
    localStorage.removeItem("token");
}

export function validateToken (token) {
    console.log("test")
}

export function getTokenUsername (token) {
    const decoded = jwtDecode(token);
    return decoded.sub;
}

export function getTokenUserInfo (token) {
    // const currentToken = token;
    // const tokenUsername = getTokenUsername(currentToken)
    //
    // const infor = getUserInfo(currentToken, tokenUsername);
    // console.log("test gettokenuserinfo")
    // console.log(getUserInfo)
}