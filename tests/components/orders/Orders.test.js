import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import Orders from "../../../src/components/orders/Orders";
import {Provider} from "react-redux";

describe("Orders specification", () => {
    it('Orders renders NewOrderStep2 and ItemList components', () => {
        const component = renderer.create(
            <Provider store={store}>
                <Orders />
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        expect((/Kolor:/g).test(JSON.stringify(tree))).toBeTruthy()
        expect((/Rozmiar:/g).test(JSON.stringify(tree))).toBeTruthy()
        expect((/Lista zamówień/g).test(JSON.stringify(tree))).toBeTruthy()
    })
})