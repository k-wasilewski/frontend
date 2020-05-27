import {SET_ITEMS} from "./actions";

const initialState = {
    items: []
};

export default function setItemsReducer(state = initialState, action) {
    switch(action.type) {
        case SET_ITEMS:
            return {
                ...state,
                items: action.data
            };
        default:
            return state;
    }
}