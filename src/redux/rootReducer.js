import { combineReducers } from "redux";
import newOrderReducer from "./newOrderReducer";
import setOrdersReducer from "./setOrdersReducer";
import setAgeReducer from "./setAgeReducer";
import setNameReducer from "./setNameReducer";

export default combineReducers({
    newOrderReducer,
    setOrdersReducer,
    setAgeReducer,
    setNameReducer
});