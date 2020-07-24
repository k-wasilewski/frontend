import React from 'react';
import * as actions from "../../src/redux/actions"
import setUsernameReducer from "../../src/redux/setUsernameReducer";

describe("setUsernameReducer specification", () => {
    it('returns the initial state when no action has been called', () => {
        expect(setUsernameReducer(undefined, {})).toEqual({
            username: null
        });
    });

    it('returns state with resp when setUsername(username) action has been called', () => {
        const username = 'mock'
        expect(setUsernameReducer([], actions.setUsername(username))).toEqual({
            username: username
        });
    });
});