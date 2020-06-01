import {SET_AGE} from "./actions";

const initialState = {
    age: []
};

export default function setAgeReducer(state = initialState, action) {
    switch(action.type) {
        case SET_AGE:
            return {
                ...state,
                age: action.data
            };
        default:
            return state;
    };
};