import {SET_NAME} from "./actions";

const initialState = {
    name: []
};

export default function setNameReducer(state = initialState, action) {
    switch(action.type) {
        case SET_NAME:
            return {
                ...state,
                name: action.data
            };
        default:
            return state;
    };
};