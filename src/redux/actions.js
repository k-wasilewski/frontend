export const ADD_ORDER = 'ADD_ORDER';

export function addOrder(order) {
    return {
        type: ADD_ORDER,
        data: order
    }
}