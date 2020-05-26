export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

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