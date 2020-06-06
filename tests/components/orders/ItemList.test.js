import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedItemList, { ItemList } from "../../../src/components/orders/ItemList";
import InListVisualization from "../../../src/components/visualization/InListVisualization";

describe("ItemList rendering specification", () => {
    it('renders header and ordered list', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedItemList/>
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        expect(tree.children[0].children[0]).toEqual('Lista zamówień');
        expect(tree.children[1].type).toBe('ol');
        expect(tree.children[1].props.start).toBe('1');
    });
});

describe("ItemList functional specification", () => {
    beforeEach(() => {
        configure({adapter: new Adapter()});
    });

    it('passes props to redux when componentWillReceiveProps', () => {
        const item = {id: 43, color: 'blue', size: 's'};

        let mockSetItems = jest.fn();
        const component = shallow(
            <ItemList items={[]} setItems={mockSetItems}/>
        );

        component.instance().UNSAFE_componentWillReceiveProps({
            item: item,
        });

        expect(mockSetItems).toHaveBeenCalled();

        component.unmount();
    });

    it('mapItems() maps array of elements to html list of elements', () => {
        const items = [[], [1, 'Niebieski', 'S']];

        const component = shallow(
            <ItemList items={[]}/>
        );

        const mappedItems = component.instance().mapItems(items);

        let result = [];
        const elem = (
            <li key='4234'>
                Kolor: Niebieski<br/>
                Rozmiar: S<br/>
                <InListVisualization key='33452' size='S' color='Niebieski'/>
            </li>
        );
        result.push(elem);

        expect(mappedItems.toString()).toContain(result);

        component.unmount();
    });
});