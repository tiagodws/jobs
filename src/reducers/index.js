import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import offerList from "./offer-list.reducer";
import OfferDetail from "./offer-detail.reducer";
import auth from "./auth.reducer";

const rootReducer = combineReducers({
    form,
    offerList,
    OfferDetail,
    auth,
});

export default rootReducer;
