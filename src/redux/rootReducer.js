import { combineReducers } from "redux";
import newItemReducer from "./newItemReducer";
import setItemsReducer from "./setItemsReducer";
import setAgeReducer from "./setAgeReducer";
import setNameReducer from "./setNameReducer";
import setRespReducer from "./setRespReducer";
import setUsernameReducer from "./setUsernameReducer";

export default combineReducers({
    newItemReducer,
    setItemsReducer,
    setAgeReducer,
    setNameReducer,
    setRespReducer,
    setUsernameReducer
});