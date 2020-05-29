import React from 'react';
import * as actions from "../../src/redux/actions"
import setAgeReducer from "../../src/redux/setAgeReducer";

describe("setAgeReducer specification", () => {
    it('should return the initial state', () => {
        expect(setAgeReducer(undefined, {})).toEqual({
            age: []
        })
    })

    it('should handle setAge', () => {
        const age = 'sample age'
        expect(setAgeReducer([], actions.setAge(age))).toEqual({
            age: age
        })
    })
})