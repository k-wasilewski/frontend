import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedNewOrderStep1, { NewOrderStep1 } from "../../../src/components/orders/NewOrderStep1";
import {Summary} from "../../../src/components/summary/Summary";

describe("NewOrderStep1 specification", () => {
    it('should render a form with two inputs', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedNewOrderStep1 />
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const form = tree.children[0]
        expect(form.type).toEqual('form')

        const col2 = form.children[0].children[4]

        const nameInput = col2.children[0].children[0]
        expect(nameInput.props).toHaveProperty('id', 'nameInput' )
        expect(nameInput.props).toHaveProperty('type', 'text' )
        expect(nameInput.props).toHaveProperty('name', 'name' )

        const ageInput = col2.children[1].children[0]
        expect(ageInput.props).toHaveProperty('id', 'ageInput' )
        expect(ageInput.props).toHaveProperty('type', 'number' )
        expect(ageInput.props).toHaveProperty('name', 'age' )
    })

    it('functions getResponse, getError and redux functions setItems, setName, setAge ' +
        'should be invoked on componentDidMount', () => {
        configure({ adapter: new Adapter() });

        let mockSetItems = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()

        const getResponse = jest.spyOn(NewOrderStep1.prototype, 'getResponse');
        const getError = jest.spyOn(NewOrderStep1.prototype, 'getError');

        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}/>
        )

        component.instance().getResponse = jest.fn()
        component.instance().getError = jest.fn()
        component.update()

        expect(mockSetItems).toHaveBeenCalled()
        expect(mockSetName).toHaveBeenCalled()
        expect(mockSetAge).toHaveBeenCalled()
        expect(getResponse).toHaveBeenCalled()
        expect(getError).toHaveBeenCalled()
    })
})