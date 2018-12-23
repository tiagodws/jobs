import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "../reducers";
import moment from "moment";
import { deauthUser } from "../actions";

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

store.subscribe(() => {
    const token = store.getState().auth.token;
    const isExpired = token && moment().isAfter(token.expire_date);
    if (!isExpired) localStorage.setItem("TOKEN", JSON.stringify(store.getState().auth.token));
    else {
        localStorage.removeItem("TOKEN");
        deauthUser();
    }
});

export default store;
