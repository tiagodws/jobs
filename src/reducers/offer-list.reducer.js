import { FETCH_OFFERS_REQUEST, FETCH_OFFERS_SUCCESS, FETCH_OFFERS_ERROR } from "../actions/types";

const INITIAL_STATE = {
    offers: [],
    loading: false,
    error: false,
};

function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_OFFERS_REQUEST:
            return { ...state, loading: true };
        case FETCH_OFFERS_SUCCESS:
            return { ...state, loading: false, error: undefined, offers: action.offers };
        case FETCH_OFFERS_ERROR:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}

export default reducer;
