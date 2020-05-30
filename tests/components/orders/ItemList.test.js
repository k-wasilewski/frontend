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

    it('should pass props to redux', () => {
        configure({ adapter: new Adapter() });
        const item = ['sample item']

        let mockSetItems = jest.fn()
        const component = shallow(
            <ItemList items={[item]} setItems={mockSetItems}/>
        )

        component.instance().UNSAFE_componentWillReceiveProps({
            item: item,
        })

        expect(mockSetItems).toHaveBeenCalled()
    })

    it('translateItems() should translate color and size to polish', () => {
        configure({ adapter: new Adapter() });
        const items = [[0, 'blue', 's'], [1, 'lightblue', 'xl']]

        const component = shallow(
            <ItemList items={[]}/>
        )

        const translatedItems = component.instance().translateItems(items)

        expect(translatedItems).toEqual([[],
            [undefined, 'Niebieski', 'S'], [undefined, 'Błękitny', 'XL']])
    })
})