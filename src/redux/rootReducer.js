import { combineReducers } from "redux";
import newOrderReducer from "./newOrderReducer";
import setOrdersReducer from "./setOrdersReducer";

export default combineReducers({
    newOrderReducer,
    setOrdersReducer
});