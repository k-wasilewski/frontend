import {SET_CN} from "./actions";

const initialState = {
    client: ''
};

export default function clientReducer(state = initialState, action) {
    switch(action.type) {
        case SET_CN:
            return {
                ...state,
                client: action.data
            };
        default:
            return state;
    }
}