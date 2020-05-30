import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedNewOrderStep2, { NewOrderStep2 } from "../../../src/components/orders/NewOrderStep2";
import {NewOrderStep1} from "../../../src/components/orders/NewOrderStep1";

describe("NewOrderStep2 specification", () => {
    it('should render a form with select, radio, and two buttons', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedNewOrderStep2 />
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const form = tree.children[0]
        expect(form.type).toEqual('form')

        const col1 = form.children[1].children[0]

        const btn1 = col1.children[5]
        expect(btn1.children[0]).toEqual('Zapisz')
        const btn2 = col1.children[6]
        expect(btn2.children[0]).toEqual('Wyślij')

        const col2 = form.children[1].children[1]

        const select = col2.children[0].children[0]
        expect(select.props).toHaveProperty('id', 'color' )
        expect(select.props).toHaveProperty('name', 'color' )

        const radio1 = col2.children[1]
        expect(radio1.props).toHaveProperty('id', 's' )
        expect(radio1.props).toHaveProperty('type', 'radio' )
        expect(radio1.props).toHaveProperty('name', 'size' )
        const radio4 = col2.children[4]
        expect(radio4.props).toHaveProperty('id', 'm' )
        expect(radio4.props).toHaveProperty('type', 'radio' )
        expect(radio4.props).toHaveProperty('name', 'size' )
        const radio7 = col2.children[7]
        expect(radio7.props).toHaveProperty('id', 'l' )
        expect(radio7.props).toHaveProperty('type', 'radio' )
        expect(radio7.props).toHaveProperty('name', 'size' )
        const radio10 = col2.children[10]
        expect(radio10.props).toHaveProperty('id', 'xl' )
        expect(radio10.props).toHaveProperty('type', 'radio' )
        expect(radio10.props).toHaveProperty('name', 'size' )
    })

    it('colorOnChange is invoked and changes state on colorInput value change', () => {
        configure({ adapter: new Adapter() });

        const event = {
            preventDefault() {},
            target: { value: 'some value' }
        };

        const component = shallow(
            <NewOrderStep2 />
        )

        const colorInput = component.find('#color')

        expect(component.state('color')).toEqual('')
        colorInput.simulate('change', event)
        expect(component.state('color')).toEqual('some value')
    })

    it('sizeOnChange is invoked and changes state on sizeInput value change', () => {
        configure({ adapter: new Adapter() });

        const event = {
            preventDefault() {},
            target: { value: 'some value' }
        };

        const component = shallow(
            <NewOrderStep2 />
        )

        expect(component.state('size')).toEqual('')
        const sizeInputS = component.find('#s')
        sizeInputS.simulate('change', event)
        expect(component.state('size')).toEqual('some value')
        const sizeInputM = component.find('#m')
        sizeInputS.simulate('change', event)
        expect(component.state('size')).toEqual('some value')
        const sizeInputL = component.find('#l')
        sizeInputS.simulate('change', event)
        expect(component.state('size')).toEqual('some value')
        const sizeInputXL = component.find('#xl')
        sizeInputS.simulate('change', event)
        expect(component.state('size')).toEqual('some value')
    })
})