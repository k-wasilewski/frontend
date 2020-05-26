export const ADD_ORDER = 'ADD_ORDER';
export const SET_NAME = 'SET_NAME';
export const SET_AGE = 'SET_AGE';
export const SET_ORDERS = 'SET_ORDERS';
export const SET_RESP = 'SET_RESP';

export function addOrder(order) {
    return {
        type: ADD_ORDER,
        data: order
    }
}

export function setOrders(orders) {
    return {
        type: SET_ORDERS,
        data: orders
    }
}

export function setName(name) {
    return {
        type: SET_NAME,
        data: name
    }
}

export function setAge(age) {
    return {
        type: SET_AGE,
        data: age
    }
}

export function setResp(resp) {
    return {
        type: SET_RESP,
        data: resp
    }
}