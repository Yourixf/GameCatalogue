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

// TO DO, IMPORTANT
export function validateToken (token) {
    // youri van beuzekom expired: eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJ1c2VySWQiOjg1NSwiYXBwbGljYXRpb25OYW1lIjoiZ2FtZWNhdGFsb2d1ZSIsInN1YiI6IllvdXJpIHZhbiBCZXV6ZWtvbSIsImlhdCI6MTc0MDA2NjczMSwiZXhwIjoxNzQwOTMwNzMxfQ.ylmADKQ0orKoAsyEhF_PlE2I4WseJtGymNbg00tX-2k
    const decodedExp = jwtDecode(token);
    const tokenExpTime = decodedExp.exp;

    console.log("validated token:")
    console.log(tokenExpTime)

}

export function getTokenUsername (token) {
    const decoded = jwtDecode(token);
    return decoded.sub;
}

export function getTokenUserId (token) {
    return jwtDecode(token).userId
}

