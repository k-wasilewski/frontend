import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import Orders from "../../../src/components/orders/Orders";
import {Provider} from "react-redux";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Visualization} from "../../../src/components/visualization/Visualization";
import ItemList from "../../../src/components/orders/ItemList";
import NewOrderStep2 from "../../../src/components/orders/NewOrderStep2";

describe("Orders rendering specification", () => {
    it('renders NewOrderStep2 and ItemList components', () => {
        const component = renderer.create(
            <Provider store={store}>
                <Orders />
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("Orders functional specification", () => {
    it('renders NewOrderStep2 and ItemList components', () => {
        configure({ adapter: new Adapter() });

        const component = mount(
            <Provider store={store}>
                <Orders />
            </Provider>
        );

        expect(component.find(NewOrderStep2).at(0)).toHaveLength(1);
        expect(component.find(ItemList).at(0)).toHaveLength(1);

        component.unmount();
    });
});