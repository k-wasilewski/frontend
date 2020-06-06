import React from 'react';
import TranslateItems from "../../src/func/TranslateItems";

describe("TranslateItems functional specification", () => {
    it('TranslateItems() translates color and size to polish', () => {
        const items = [{id: 0, color: 'blue', size: 's'},
            {id: 1, color: 'lightblue', size: 'xl'}];

        TranslateItems(items)

        expect(items).toEqual([{id: 0, color: 'Niebieski', size: 'S'},
            {id: 1, color: 'Błękitny', size: 'XL'}]);
    });
});