import React from 'react';
import * as actions from "../../src/redux/actions"
import newItemReducer from "../../src/redux/newItemReducer";

describe("newItemReducer specification", () => {
    it('should return the initial state', () => {
        expect(newItemReducer(undefined, {})).toEqual({
            item: []
        })
    })

    it('should handle addItem', () => {
        const item = 'sample item'
        expect(newItemReducer([], actions.addItem(item))).toEqual({
            item: item
        })
    })
})