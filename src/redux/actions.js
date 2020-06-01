export const ADD_ITEM = 'ADD_ITEM';
export const SET_NAME = 'SET_NAME';
export const SET_AGE = 'SET_AGE';
export const SET_ITEMS = 'SET_ITEMS';
export const SET_RESP = 'SET_RESP';

export function addItem(item) {
    return {
        type: ADD_ITEM,
        data: item
    };
};

export function setItems(items) {
    return {
        type: SET_ITEMS,
        data: items
    };
};

export function setName(name) {
    return {
        type: SET_NAME,
        data: name
    };
};

export function setAge(age) {
    return {
        type: SET_AGE,
        data: age
    };
};

export function setResp(resp) {
    return {
        type: SET_RESP,
        data: resp
    };
};