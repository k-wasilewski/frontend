import React from 'react';
import * as actions from "../../src/redux/actions"
import setNameReducer from "../../src/redux/setNameReducer";

describe("setNameReducer specification", () => {
    it('returns the initial state when no action has been called', () => {
        expect(setNameReducer(undefined, {})).toEqual({
            name: []
        });
    });

    it('returns state with name when setName(name) action has been called', () => {
        const name = 'sample name'
        expect(setNameReducer([], actions.setName(name))).toEqual({
            name: name
        });
    });
});