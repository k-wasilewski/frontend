import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedNewOrderStep1, { NewOrderStep1 } from "../../../src/components/orders/NewOrderStep1";

describe("NewOrderStep1 rendering specification", () => {
    it('renders a form with two inputs', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedNewOrderStep1/>
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const form = tree.children[0];
        expect(form.type).toEqual('form');

        const col2 = form.children[0].children[4];

        const nameInput = col2.children[0].children[0];
        expect(nameInput.props).toHaveProperty('id', 'nameInput');
        expect(nameInput.props).toHaveProperty('type', 'text');
        expect(nameInput.props).toHaveProperty('name', 'name');

        const ageInput = col2.children[1].children[0];
        expect(ageInput.props).toHaveProperty('id', 'ageInput');
        expect(ageInput.props).toHaveProperty('type', 'number');
        expect(ageInput.props).toHaveProperty('name', 'age');
    });
});

describe("NewOrderStep1 functional specification", () => {
    let mockSetItems;
    let mockSetName;
    let mockSetAge;

    beforeEach(() => {
        configure({adapter: new Adapter()});
        mockSetItems = jest.fn();
        mockSetName = jest.fn();
        mockSetAge = jest.fn();
    });

    it('functions getResponse(), getError() and redux functions setItems(), setName(), ' +
        'setAge() are invoked when componentDidMount', () => {
        const getResponse = jest.spyOn(NewOrderStep1.prototype, 'getResponse');
        const getError = jest.spyOn(NewOrderStep1.prototype, 'getError');

        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}/>
        );

        expect(mockSetItems).toHaveBeenCalled();
        expect(mockSetName).toHaveBeenCalled();
        expect(mockSetAge).toHaveBeenCalled();
        expect(getResponse).toHaveBeenCalled();
        expect(getError).toHaveBeenCalled();

        component.unmount();
    });

    it('name input changes color to red when value is incorrect', () => {
        const mockNameRef = jest.spyOn(React, 'createRef')

        const correctInputEvent = {
            preventDefault() {},
            target: { value: 'Kuba' }
        };

        const incorrectInputEvent = {
            preventDefault() {},
            target: { value: 'jfu876vVJH$^*d' }
        };

        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName}
                           setAge={mockSetAge} />
        );

        const mockNameInput = (<input type='text' />);
        mockNameRef.mockReturnValue({
            current: mockNameInput
        });

        const nameInput = component.find('#nameInput');

        setTimeout(function () {
            nameInput.simulate('change', incorrectInputEvent);
            expect(mockNameRef).toHaveBeenCalled();
            expect(mockNameInput.props.style.color==='red');
            nameInput.simulate('change', correctInputEvent);
            expect(mockNameRef).toHaveBeenCalled();
            expect(mockNameInput.props.style.color==='black');

            component.unmount();
        }, 4000);
    });

    it('age input changes color to red when value is incorrect', () => {
        const mockAgeRef = jest.spyOn(React, 'createRef');

        const correctInputEvent = {
            preventDefault() {},
            target: { value: '30' }
        };

        const incorrectInputEvent = {
            preventDefault() {},
            target: { value: '11' }
        };

        const event = {
            preventDefault() {},
            target: { value: 'some value' }
        };

        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge} />
        );

        const mockAgeInput = (<input type='number' />);
        mockAgeRef.mockReturnValue({
            current: mockAgeInput
        });

        const ageInput = component.find('#ageInput');

        setTimeout(function () {
            ageInput.simulate('change', incorrectInputEvent);
            expect(mockAgeRef).toHaveBeenCalled();
            expect(mockAgeInput.props.style.color==='red');
            ageInput.simulate('change', correctInputEvent);
            expect(mockAgeRef).toHaveBeenCalled();
            expect(mockAgeInput.props.style.color==='black');

            component.unmount();
        }, 4000);
    });

    it('errorMsg is displayed when state value: error is present', () => {
        const mockErrorRef = jest.spyOn(React, 'createRef');

        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge} />
        );

        const mockErrorMsg = (<p id='nameAgeError' />);
        mockErrorRef.mockReturnValue({
            current: mockErrorMsg
        });

        setTimeout(function () {
            component.setState({
                error: 'sample error'
            });
            expect(mockErrorRef).toHaveBeenCalled();
            expect(mockErrorMsg.props.style.display==='block');

            component.unmount();
        }, 4000);
    });

    it('getResponse() returns the errorMsg when the prop: resp contains string ' +
        'error', () => {
        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}
                resp='error: sample resp' />
        );

        let result = component.instance().getResponse();
        expect(result).toEqual('sample resp');

        component.unmount();
    });

    it('getResponse() returns the prop: resp when it doesnt contain string ' +
        'error', () => {
        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}
                           resp='sample resp' />
        );

        let result = component.instance().getResponse();
        expect(result).toEqual('sample resp');

        component.unmount();
    });

    it('handleSubmit() sets state value: error to errorMsg when age is empty', () => {
        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}
                age=''/>
        );

        component.instance().getError = jest.fn();
        component.update();

        component.instance().handleSubmit();

        expect(component.state('error')).toEqual('Należy podać wymagane dane');

        component.unmount();
    });

    it('handleSubmit() sets state value: error to errorMsg when name is empty', () => {
        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}
                           name=''/>
        );

        component.instance().getError = jest.fn();
        component.update();

        component.instance().handleSubmit();

        expect(component.state('error')).toEqual('Należy podać wymagane dane');

        component.unmount();
    });

    it('handleSubmit() sets state value: error to errorMsg when age is invalid', () => {
        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge} />
        );

        component.instance().getError = jest.fn();
        component.update();

        component.setState({
            name: 'Kuba',
            age: 12,
            nameValid: true,
            ageValid: false
        });
        component.instance().handleSubmit();

        expect(component.state('error')).toEqual('Należy podać wiek w przedziale 18-100');

        component.unmount();
    });

    it('handleSubmit() sets state value: error to errorMsg when name is invalid', () => {
        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge} />
        );

        component.instance().getError = jest.fn();
        component.update();

        component.setState({
            name: 'hi28*73*^',
            age: 32,
            ageValid: true,
            nameValid: false
        });
        component.instance().handleSubmit();

        expect(component.state('error')).toEqual('Imię może zawierać tylko jeden wyraz, ' +
            'musi być pisane z wielkiej litery, bez cyfr i znaków specjalnych');

        component.unmount();
    });
});