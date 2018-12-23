import store from "../shared/store";
import {
    AUTH_REQUEST_FAIL,
    AUTH_REQUEST_SUCCESS,
    AUTH_USER_REQUEST,
    FETCH_OFFERS_ERROR,
    FETCH_OFFERS_REQUEST,
    FETCH_OFFERS_SUCCESS,
    FETCH_OFFER_ERROR,
    FETCH_OFFER_REQUEST,
    FETCH_OFFER_SUCCESS,
} from "./types";
import moment from "moment";

const LOGIN_URL = `https://staging-main.zenjob.org/api/employee/v1/auth`;
const OFFERS_URL = `https://staging-main.zenjob.org/api/employee/v1/offers`;

export function fetchOffers() {
    return dispatch => {
        const headers = new Headers();
        const { token } = store.getState().auth;
        headers.append("Authorization", `${token.token_type} ${token.access_token}`);

        dispatch({
            type: FETCH_OFFERS_REQUEST,
        });

        return fetch(`${OFFERS_URL}`, { headers })
            .then(response => response.json().then(body => ({ response, body })))
            .then(({ response, body }) => {
                if (response.ok) {
                    dispatch({
                        type: FETCH_OFFERS_SUCCESS,
                        offers: body.offers,
                    });
                } else {
                    dispatch({
                        type: FETCH_OFFERS_ERROR,
                        error: body.error,
                    });
                }
            });
    };
}

export function fetchOffer(id) {
    return dispatch => {
        const headers = new Headers();
        const { token } = store.getState().auth;
        headers.append("Authorization", `${token.token_type} ${token.access_token}`);

        dispatch({
            type: FETCH_OFFER_REQUEST,
        });

        return fetch(`${OFFERS_URL}/${id}`, { headers })
            .then(response => response.json().then(body => ({ response, body })))
            .then(({ response, body }) => {
                if (response.ok) {
                    dispatch({
                        type: FETCH_OFFER_SUCCESS,
                        offer: body,
                    });
                } else {
                    dispatch({
                        type: FETCH_OFFER_ERROR,
                        error: body.error,
                    });
                }
            });
    };
}

export function authUser(username, password) {
    return dispatch => {
        dispatch({
            type: AUTH_USER_REQUEST,
        });

        return fetch(`${LOGIN_URL}`, { method: "POST", body: JSON.stringify({ username, password }) })
            .then(response => response.json().then(body => ({ response, body })))
            .then(({ response, body }) => {
                if (response.ok) {
                    dispatch({
                        type: AUTH_REQUEST_SUCCESS,
                        token: {
                            ...body,
                            expire_date: moment()
                                .add(body.expires_in, "seconds")
                                .toDate(),
                        },
                    });
                } else {
                    dispatch({
                        type: AUTH_REQUEST_FAIL,
                        error: body.error,
                    });
                }
            });
    };
}

export function deauthUser() {
    return { type: "DEAUTH_USER" };
}
