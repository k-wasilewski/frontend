import {ADD_ORDER} from "./actions";

const initialState = {
    order: []
};

export default function newOrderReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_ORDER:
            return {
                ...state,
                order: action.data
            };
        default:
            return state;
    }
}