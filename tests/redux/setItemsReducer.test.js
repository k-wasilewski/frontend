import React from 'react';
import * as actions from "../../src/redux/actions"
import setItemsReducer from "../../src/redux/setItemsReducer";

describe("setItemsReducer specification", () => {
    it('returns the initial state when no action has been called', () => {
        expect(setItemsReducer(undefined, {})).toEqual({
            items: []
        });
    });

    it('returns state with items when setItems(items) action has been called', () => {
        const items = 'sample items'
        expect(setItemsReducer([], actions.setItems(items))).toEqual({
            items: items
        });
    });
});