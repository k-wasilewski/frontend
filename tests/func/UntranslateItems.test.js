import React from 'react';
import UntranslateItems from "../../src/func/UntranslateItems";

describe("UntranslateItems functional specification", () => {
    it('TranslateItems() translates color and size to polish', () => {
        const items = [{id: 0, color: 'Niebieski', size: 'S'},
            {id: 1, color: 'Błękitny', size: 'XL'}, {id: 2, color: 'Granatowy', size: 'L'}];

        UntranslateItems(items)

        expect(items).toEqual([{id: 0, color: 'blue', size: 's'},
            {id: 1, color: 'lightblue', size: 'xl'}, {id: 2, color: 'darkblue', size: 'l'}]);
    });
});