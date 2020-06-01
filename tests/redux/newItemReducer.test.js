import React from 'react';
import * as actions from "../../src/redux/actions"
import newItemReducer from "../../src/redux/newItemReducer";

describe("newItemReducer specification", () => {
    it('returns the initial state when no action has been called', () => {
        expect(newItemReducer(undefined, {})).toEqual({
            item: []
        });
    });

    it('returns state with item when addItem(item) action has been called', () => {
        const item = 'sample item'
        expect(newItemReducer([], actions.addItem(item))).toEqual({
            item: item
        });
    });
})