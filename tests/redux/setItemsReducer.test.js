import React from 'react';
import * as actions from "../../src/redux/actions"
import setItemsReducer from "../../src/redux/setItemsReducer";

describe("setItemsReducer specification", () => {
    it('should return the initial state', () => {
        expect(setItemsReducer(undefined, {})).toEqual({
            items: []
        })
    })

    it('should handle setItems', () => {
        const items = 'sample items'
        expect(setItemsReducer([], actions.setItems(items))).toEqual({
            items: items
        })
    })
})