import React from 'react';
import * as actions from "../../src/redux/actions"
import setNameReducer from "../../src/redux/setNameReducer";

describe("setNameReducer specification", () => {
    it('should return the initial state', () => {
        expect(setNameReducer(undefined, {})).toEqual({
            name: []
        })
    })

    it('should handle setName', () => {
        const name = 'sample name'
        expect(setNameReducer([], actions.setName(name))).toEqual({
            name: name
        })
    })
})