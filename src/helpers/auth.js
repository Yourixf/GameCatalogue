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

// TO DO, IMPORTANT
export function validateToken (token) {
    console.log("test")
}

export function getTokenUsername (token) {
    const decoded = jwtDecode(token);
    return decoded.sub;
}

export function getTokenUserId (token) {
    return jwtDecode(token).userId
}

