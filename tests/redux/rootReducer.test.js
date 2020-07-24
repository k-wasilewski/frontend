import React from 'react';
import rootReducer from "../../src/redux/rootReducer";
import { createStore } from 'redux';

describe("rootReducer specification", () => {
    it('combines all the reducers', () => {
        const store = createStore(rootReducer);

        expect(store.getState().newItemReducer).toHaveProperty('item');
        expect(store.getState().setAgeReducer).toHaveProperty('age');
        expect(store.getState().setItemsReducer).toHaveProperty('items');
        expect(store.getState().setNameReducer).toHaveProperty('name');
        expect(store.getState().setRespReducer).toHaveProperty('resp');
        expect(store.getState().setUsernameReducer).toHaveProperty('username');
    });
});