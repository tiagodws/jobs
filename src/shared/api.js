import moment from "moment";

import { getAuthHeader } from "./auth";

const BASE_URL = `https://staging-main.zenjob.org/api/employee/v1`;
const LOGIN_URL = `${BASE_URL}/auth`;
const OFFERS_URL = `${BASE_URL}/offers`;

export function fetchOffers() {
    const headers = new Headers();
    headers.append("Authorization", getAuthHeader());
    return fetch(`${OFFERS_URL}`, { headers }).then(response => response.json().then(body => ({ response, body })));
}

export function fetchOffer(id) {
    const headers = new Headers();
    headers.append("Authorization", getAuthHeader());
    return fetch(`${OFFERS_URL}/${id}`, { headers }).then(response => response.json().then(body => ({ response, body })));
}

export function login(username, password) {
    return fetch(`${LOGIN_URL}`, { method: "POST", body: JSON.stringify({ username, password }) }).then(response =>
        response.json().then(body => {
            if (response.ok) {
                body.expire_date = moment()
                    .add(body.expires_in, "seconds")
                    .toDate();
            }
            return { response, body };
        })
    );
}
