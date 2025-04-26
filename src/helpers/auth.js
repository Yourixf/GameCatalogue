import {jwtDecode} from "jwt-decode";

export function saveToken (token) {
    localStorage.setItem("token", token)
}

export function getToken () {
    return localStorage.getItem("token") ? localStorage.getItem("token") : "" ;
}

export function deleteToken () {
    localStorage.removeItem("token");
}

export function getTokenUsername (token) {
    const decoded = jwtDecode(token);
    return decoded.sub;
}

export function getTokenUserId (token) {
    return jwtDecode(token).userId
}
