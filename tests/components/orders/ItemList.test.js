import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedItemList, { ItemList } from "../../../src/components/orders/ItemList";

describe("ItemList specification", () => {
    it('renders header and ordered list', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedItemList />
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        expect(tree.children[0].children[0]).toEqual('Lista zamówień')
        expect(tree.children[1].type).toBe('ol')
        expect(tree.children[1].props.start).toBe('1')
    })

    it('fewfewfwef', () => {
        configure({ adapter: new Adapter() });

        const component = shallow(
            <ItemList items = {[]}/>
        )


    })
})