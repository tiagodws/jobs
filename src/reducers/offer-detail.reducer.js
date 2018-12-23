import { FETCH_OFFER_REQUEST, FETCH_OFFER_SUCCESS, FETCH_OFFER_ERROR } from "../actions/types";

const INITIAL_STATE = {
    offer: undefined,
    loading: false,
    error: false,
};

function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_OFFER_REQUEST:
            return { ...state, loading: true };
        case FETCH_OFFER_SUCCESS:
            return { ...state, loading: false, error: undefined, offer: action.offer };
        case FETCH_OFFER_ERROR:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}

export default reducer;
