import {SET_ORDERS} from "./actions";

const initialState = {
    orders: []
};

export default function setOrdersReducer(state = initialState, action) {
    switch(action.type) {
        case SET_ORDERS:
            return {
                ...state,
                orders: action.data
            };
        default:
            return state;
    }
}