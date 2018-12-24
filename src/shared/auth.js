import moment from "moment";

export const STORAGE_ID = "TOKEN";

export function getTokenData() {
    try {
        const tokenData = JSON.parse(localStorage.getItem(STORAGE_ID));
        return tokenData;
    } catch (err) {
        console.error("Error getting token data.", err);
        deauthUser();
    }
}

export function checkAuthentication() {
    const tokenData = getTokenData();
    const valid = tokenData && moment().isBefore(tokenData.expire_date);
    return valid;
}

export function getAuthHeader() {
    const tokenData = getTokenData();
    return `${tokenData.token_type} ${tokenData.access_token}`;
}

export function authUser(tokenData) {
    localStorage.setItem(STORAGE_ID, JSON.stringify(tokenData));
}

export function deauthUser() {
    localStorage.removeItem(STORAGE_ID);
}
