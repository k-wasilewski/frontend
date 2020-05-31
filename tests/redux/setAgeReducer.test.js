import React from 'react';
import * as actions from "../../src/redux/actions"
import setAgeReducer from "../../src/redux/setAgeReducer";

describe("setAgeReducer specification", () => {
    it('returns the initial state when no action has been called', () => {
        expect(setAgeReducer(undefined, {})).toEqual({
            age: []
        })
    })

    it('returns state with age when setAge(age) action has been called', () => {
        const age = 'sample age'
        expect(setAgeReducer([], actions.setAge(age))).toEqual({
            age: age
        })
    })
})