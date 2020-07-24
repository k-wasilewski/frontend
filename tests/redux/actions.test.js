import React from 'react';
import * as actions from "../../src/redux/actions"

describe("redux/actions specification", () => {
    it('addItem action works as expected', () => {
        const item = 'sample item';
        const expectedAction = {
            type: actions.ADD_ITEM,
            data: item
        };
        expect(actions.addItem(item)).toEqual(expectedAction);
    });

    it('setItems action works as expected', () => {
        const items = 'sample items';
        const expectedAction = {
            type: actions.SET_ITEMS,
            data: items
        }
        expect(actions.setItems(items)).toEqual(expectedAction);
    });

    it('setName action works as expected', () => {
        const name = 'sample name';
        const expectedAction = {
            type: actions.SET_NAME,
            data: name
        };
        expect(actions.setName(name)).toEqual(expectedAction);
    });

    it('setAge action works as expected', () => {
        const age = 'sample age';
        const expectedAction = {
            type: actions.SET_AGE,
            data: age
        };
        expect(actions.setAge(age)).toEqual(expectedAction);
    });

    it('setResp action works as expected', () => {
        const resp = 'sample resp';
        const expectedAction = {
            type: actions.SET_RESP,
            data: resp
        };
        expect(actions.setResp(resp)).toEqual(expectedAction);
    });

    it('setUsername action works as expected', () => {
        const username = 'mock';
        const expectedAction = {
            type: actions.SET_USERNAME,
            data: username
        };
        expect(actions.setUsername(username)).toEqual(expectedAction);
    });
});