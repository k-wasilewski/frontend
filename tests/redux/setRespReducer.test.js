import React from 'react';
import * as actions from "../../src/redux/actions"
import setRespReducer from "../../src/redux/setRespReducer";

describe("setRespReducer specification", () => {
    it('returns the initial state when no action has been called', () => {
        expect(setRespReducer(undefined, {})).toEqual({
            resp: []
        })
    })

    it('returns state with resp when setResp(resp) action has been called', () => {
        const resp = 'sample resp'
        expect(setRespReducer([], actions.setResp(resp))).toEqual({
            resp: resp
        })
    })
})