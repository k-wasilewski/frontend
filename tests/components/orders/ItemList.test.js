import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedItemList, { ItemList } from "../../../src/components/orders/ItemList";

describe("ItemList specification", () => {
    it('renders edwede', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedItemList />
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();


    })

    it('fewfewfwef', () => {
        configure({ adapter: new Adapter() });

        const component = shallow(
            <ItemList items = {[]}/>
        )


    })
})