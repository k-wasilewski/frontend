import {ADD_ITEM} from "./actions";

const initialState = {
    item: []
};

export default function newItemReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_ITEM:
            return {
                ...state,
                item: action.data
            };
        default:
            return state;
    };
};