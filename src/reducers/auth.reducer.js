import { AUTH_REQUEST_FAIL, AUTH_REQUEST_SUCCESS, AUTH_USER_REQUEST, DEAUTH_USER } from "../actions/types";

const INITIAL_STATE = {
    token: JSON.parse(localStorage.getItem("TOKEN")),
    loading: false,
    error: false,
};

function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER_REQUEST:
            return { ...state, loading: true };
        case AUTH_REQUEST_SUCCESS:
            return { ...state, loading: false, error: undefined, token: action.token };
        case AUTH_REQUEST_FAIL:
            return { ...state, loading: false, error: action.error };
        case DEAUTH_USER:
            return { ...state, loading: false, error: undefined, token: undefined };
        default:
            return state;
    }
}

export default reducer;
