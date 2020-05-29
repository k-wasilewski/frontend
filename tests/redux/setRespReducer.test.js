import React from 'react';
import * as actions from "../../src/redux/actions"
import setRespReducer from "../../src/redux/setRespReducer";

describe("setRespReducer specification", () => {
    it('should return the initial state', () => {
        expect(setRespReducer(undefined, {})).toEqual({
            resp: []
        })
    })

    it('should handle setName', () => {
        const resp = 'sample resp'
        expect(setRespReducer([], actions.setResp(resp))).toEqual({
            resp: resp
        })
    })
})