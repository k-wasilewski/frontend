import {SET_RESP} from "./actions";

const initialState = {
    resp: []
};

export default function setRespReducer(state = initialState, action) {
    switch(action.type) {
        case SET_RESP:
            return {
                ...state,
                resp: action.data
            };
        default:
            return state;
    };
};