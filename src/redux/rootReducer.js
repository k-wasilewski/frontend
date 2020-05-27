import { combineReducers } from "redux";
import newItemReducer from "./newItemReducer";
import setItemsReducer from "./setItemsReducer";
import setAgeReducer from "./setAgeReducer";
import setNameReducer from "./setNameReducer";
import setRespReducer from "./setRespReducer";

export default combineReducers({
    newItemReducer,
    setItemsReducer,
    setAgeReducer,
    setNameReducer,
    setRespReducer
});