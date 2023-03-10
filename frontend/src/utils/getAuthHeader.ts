import Cookies from "js-cookie"

export function getAuthHeader() {
    const jwt = Cookies.get('JWT');

    return {
        token: jwt
    }
}