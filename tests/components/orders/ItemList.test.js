import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedItemList, { ItemList } from "../../../src/components/orders/ItemList";
import InListVisualization from "../../../src/components/visualization/InListVisualization";

describe("ItemList rendering specification", () => {
    it('ItemList is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedItemList/>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("ItemList functional specification", () => {
    let component;

    beforeEach(() => {
        configure({adapter: new Adapter()});
    });

    afterEach(() => {
       component.unmount();
    });

    it('renders header and ordered list', () => {
        component = shallow(
            <ItemList />
        );

        expect(component.find('h3').text()).toEqual('Lista zamówień');
        expect(component.find('ol')).toHaveLength(1);
    });

    it('passes props to redux when componentWillReceiveProps', () => {
        const item = {id: 43, color: 'blue', size: 's'};

        const mockSetItems = jest.fn();
        component = shallow(
            <ItemList items={[]} setItems={mockSetItems}/>
        );

        component.instance().UNSAFE_componentWillReceiveProps({
            item: item,
        });

        expect(mockSetItems).toHaveBeenCalled();
    });

    it('mapItems() maps array of elements to html list of elements', () => {
        const items = [[], [1, 'Niebieski', 'S']];

        component = shallow(
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
    });
});