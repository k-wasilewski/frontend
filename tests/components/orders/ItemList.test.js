import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedItemList, { ItemList } from "../../../src/components/orders/ItemList";
import InListVisualization from "../../../src/components/visualization/InListVisualization";

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

    it('passes props to redux when componentWillReceiveProps', () => {
        configure({ adapter: new Adapter() });
        const item = [43, 'blue', 's']

        let mockSetItems = jest.fn()
        const component = shallow(
            <ItemList items={[]} setItems={mockSetItems}/>
        )

        component.instance().UNSAFE_componentWillReceiveProps({
            item: item,
        })

        expect(mockSetItems).toHaveBeenCalled()
    })

    it('translateItems() translates color and size to polish', () => {
        configure({ adapter: new Adapter() });
        const items = [[0, 'blue', 's'], [1, 'lightblue', 'xl']]

        const component = shallow(
            <ItemList items={[]}/>
        )

        const translatedItems = component.instance().translateItems(items)

        expect(translatedItems).toEqual([[],
            [0, 'Niebieski', 'S'], [1, 'Błękitny', 'XL']])
    })

    it('mapItems() maps array of elements to html list of elements', () => {
        configure({ adapter: new Adapter() });
        const items = [[], [1, 'Niebieski', 'S']]

        const component = shallow(
            <ItemList items={[]}/>
        )

        const mappedItems = component.instance().mapItems(items)

        let result = []
        const elem = (
            <li key='4234'>
                Kolor: Niebieski<br/>
                Rozmiar: S<br/>
                <InListVisualization key='33452' size='S' color='Niebieski'/>
            </li>
        )
        result.push(elem)

        expect(mappedItems.toString()).toContain(result)
    })
})