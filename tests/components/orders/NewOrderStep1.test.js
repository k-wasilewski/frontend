import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedNewOrderStep1, { NewOrderStep1 } from "../../../src/components/orders/NewOrderStep1";

describe("NewOrderStep1 rendering specification", () => {
    it('NewOrderStep1 is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedNewOrderStep1/>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("NewOrderStep1 functional specification", () => {
    let mockSetItems;
    let mockSetName;
    let mockSetAge;
    let component;

    beforeEach(() => {
        configure({adapter: new Adapter()});
        mockSetItems = jest.fn();
        mockSetName = jest.fn();
        mockSetAge = jest.fn();
    });

    afterEach(() => {
        component.unmount();
    });

    it('renders a form with two inputs', () => {
        component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}/>
        );

        expect(component.find('input[type="number"]')).toHaveLength(1);
        expect(component.find('input[type="text"]')).toHaveLength(1);
        expect(component.find('form')).toHaveLength(1);
    });

    it('functions getResponse(), getError() and redux functions setItems(), setName(), ' +
        'setAge() are invoked when componentDidMount', () => {
        const getResponse = jest.spyOn(NewOrderStep1.prototype, 'getResponse');
        const getError = jest.spyOn(NewOrderStep1.prototype, 'getError');

        component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}/>
        );

        expect(mockSetItems).toHaveBeenCalledWith([]);
        expect(mockSetName).toHaveBeenCalledWith('');
        expect(mockSetAge).toHaveBeenCalledWith('');
        expect(getResponse).toHaveBeenCalled();
        expect(getError).toHaveBeenCalled();
    });

    it('name input changes color to red when value is incorrect', (done) => {
        const mockNameRef = jest.spyOn(React, 'createRef');
        mockNameRef.mockReturnValue({
            current: {classList: {add: jest.fn(), remove: jest.fn()}}
        });

        const correctInputEvent = {
            preventDefault() {},
            target: { value: 'Kuba' }
        };

        const incorrectInputEvent = {
            preventDefault() {},
            target: { value: 'jfu876vVJH$^*d' }
        };

        component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName}
                           setAge={mockSetAge} />
        );

        const nameInput = component.find('#nameInput');

        setTimeout(function () {
            nameInput.simulate('change', incorrectInputEvent);
            expect(mockNameRef().current.classList.add).toHaveBeenCalledWith('invalid');
            expect(mockNameRef().current.classList.remove).toHaveBeenCalledWith('valid');
            expect(component.state().nameValid).toEqual(false);
            nameInput.simulate('change', correctInputEvent);
            expect(mockNameRef().current.classList.add).toHaveBeenCalledWith('valid');
            expect(mockNameRef().current.classList.remove).toHaveBeenCalledWith('invalid');
            expect(component.state().nameValid).toEqual(true);

            done();
        }, 500);
    });

    it('age input changes color to red when value is incorrect', (done) => {
        const mockAgeRef = jest.spyOn(React, 'createRef');
        mockAgeRef.mockReturnValue({
            current: {classList: {add: jest.fn(), remove: jest.fn()}}
        });

        const correctInputEvent = {
            preventDefault() {},
            target: { value: '30' }
        };

        const incorrectInputEvent = {
            preventDefault() {},
            target: { value: '11' }
        };

        component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge} />
        );

        const ageInput = component.find('#ageInput');

        setTimeout(function () {
            ageInput.simulate('change', incorrectInputEvent);
            expect(mockAgeRef().current.classList.add).toHaveBeenCalledWith('invalid');
            expect(mockAgeRef().current.classList.remove).toHaveBeenCalledWith('valid');
            expect(component.state().ageValid).toEqual(false);
            ageInput.simulate('change', correctInputEvent);
            expect(mockAgeRef().current.classList.add).toHaveBeenCalledWith('valid');
            expect(mockAgeRef().current.classList.remove).toHaveBeenCalledWith('invalid');
            expect(component.state().ageValid).toEqual(true);

            done();
        }, 500);
    });

    it('errorMsg is displayed when state value: error is present', (done) => {
        const mockErrorRef = jest.spyOn(React, 'createRef');
        mockErrorRef.mockReturnValue({
            current: {classList: {add: jest.fn(), remove: jest.fn()}}
        });

        component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge} />
        );

        setTimeout(function () {
            component.setState({
                error: 'sample error'
            });
            expect(mockErrorRef().current.classList.add).toHaveBeenCalledWith('visible');
            expect(mockErrorRef().current.classList.remove).toHaveBeenCalledWith('hidden');

            done();
        }, 500);
    });

    it('getResponse() returns the errorMsg when the prop: resp contains string ' +
        'error', () => {
        component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}
                resp='error: sample resp' />
        );

        const result = component.instance().getResponse();
        expect(result).toEqual('sample resp');
    });

    it('getResponse() returns the prop: resp when it doesnt contain string ' +
        'error', () => {
        component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}
                           resp='sample resp' />
        );

        const result = component.instance().getResponse();
        expect(result).toEqual('sample resp');
    });

    it('handleSubmit() sets state value: error to errorMsg when age is empty', () => {
        component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}
                age=''/>
        );

        component.instance().getError = jest.fn();
        component.update();

        component.instance().handleSubmit();

        expect(component.state('error')).toEqual('Należy podać wymagane dane');
    });

    it('handleSubmit() sets state value: error to errorMsg when name is empty', () => {
        component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}
                           name=''/>
        );

        component.instance().getError = jest.fn();
        component.update();

        component.instance().handleSubmit();

        expect(component.state('error')).toEqual('Należy podać wymagane dane');
    });

    it('handleSubmit() sets state value: error to errorMsg when age is invalid', () => {
        component = shallow(
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
    });

    it('handleSubmit() sets state value: error to errorMsg when name is invalid', () => {
        component = shallow(
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
    });

    it('handleSubmit() sets state value: redirect to true when name and age' +
        ' are valid', () => {
        component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge} />
        );

        component.instance().getError = jest.fn();
        component.update();

        component.setState({
            name: 'Kuba',
            age: 32,
            ageValid: true,
            nameValid: true,
            redirect: false
        });
        component.instance().handleSubmit();

        expect(component.state('redirect')).toEqual(true);
    });
});