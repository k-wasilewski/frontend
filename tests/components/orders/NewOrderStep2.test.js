import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedNewOrderStep2, { NewOrderStep2 } from "../../../src/components/orders/NewOrderStep2";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe("NewOrderStep2 rendering specification", () => {
    it('NewOrderStep2 is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedNewOrderStep2/>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("NewOrderStep2 functional specification", () => {
    let component;
    const error = console.error;

    const axiosConfig = {
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    };

    beforeEach(() => {
        configure({adapter: new Adapter()});

        console.error = jest.fn();
    });

    afterEach(() => {
        component.unmount();

        console.error = error;
    });

    it('doAddOrder() restores order values and redirects when ' +
        'request is successfull', (done) => {
        var mock = new MockAdapter(axios);
        const resp = 'sample resp';
        mock.onPost().reply(200, resp);

        const mockSetResp = jest.fn();
        const mockSetName = jest.fn();
        const mockSetAge = jest.fn();
        const mockSetItems = jest.fn();
        const mockAddItem = jest.fn();

        const name = 'Kuba';
        const age = 30;
        const items = [{id: 0, color: 'blue', size: 's'},
            {id: 1, color: 'lightblue', size: 'm'}];

        component = shallow(
            <NewOrderStep2 setResp={mockSetResp} setName={mockSetName} setAge={mockSetAge}
                           setItems={mockSetItems} addItem={mockAddItem} name={name}
                           age={age} items={items}/>
        );

        component.instance().doAddOrder();

        setTimeout(function () {
            expect(mockSetResp).toHaveBeenCalled();
            expect(mockSetItems).toHaveBeenCalled();
            expect(mockSetAge).toHaveBeenCalled();
            expect(mockSetName).toHaveBeenCalled();
            expect(component.state('id')).toEqual(0);
            expect(component.state('redirect')).toEqual(true);

            done();
        }, 500);
    });

    it('addToList() handles size, color errors and invokes doCheckAvailability() ' +
        'when there is no error', () => {
        const mockSetResp = jest.fn();
        const mockSetName = jest.fn();
        const mockSetAge = jest.fn();
        const mockSetItems = jest.fn();

        component = shallow(
            <NewOrderStep2 setResp={mockSetResp} setName={mockSetName} setAge={mockSetAge}
                           setItems={mockSetItems}/>
        );

        component.setState({
            size: '',
            color: 'blue'
        });
        component.instance().addToList();
        expect(component.state('error')).toEqual('Należy wybrać kolor i rozmiar');

        component.setState({
            size: 's',
            color: ''
        });
        component.instance().addToList();
        expect(component.state('error')).toEqual('Należy wybrać kolor i rozmiar');

        component.setState({
            size: 's',
            color: 'blue'
        });
        component.instance().addToList();
        expect(component.state('checking')).toEqual('sblue');
    })

    it('componentWillUnmount() makes a request to restore temporaryCounts to ' +
        'according permanent counts', (done) => {
        var mock = new MockAdapter(axios);
        const resp = [];
        mock.onPost(
            'https://localhost:8081/restore',
            axiosConfig
        ).reply(200, resp);

        const mockSetResp = jest.fn();
        const mockSetName = jest.fn();
        const mockSetAge = jest.fn();
        const mockSetItems = jest.fn();

        component = shallow(
            <NewOrderStep2 setResp={mockSetResp} setName={mockSetName} setAge={mockSetAge}
                           setItems={mockSetItems}/>
        );

        component.instance().componentWillUnmount();

        done();
    });

    it('doCheckAvailability() invokes addItem() when server response ' +
        'is success', (done) => {
        var mock = new MockAdapter(axios);
        const resp = 'success';
        mock.onPost().reply(200, resp);

        const mockSetResp = jest.fn();
        const mockSetName = jest.fn();
        const mockSetAge = jest.fn();
        const mockSetItems = jest.fn();
        const mockAddItem = jest.fn();

        component = shallow(
            <NewOrderStep2 setResp={mockSetResp} setName={mockSetName} setAge={mockSetAge}
                           setItems={mockSetItems} addItem={mockAddItem}/>
        );

        const color = 'blue';
        const size = 's';
        const id = 0;
        const item = [id, color, size];

        component.instance().doCheckAvailability(color, size, item, id);

        setTimeout(function () {
            expect(mockAddItem).toHaveBeenCalled();

            done();
        }, 500);
    });

    it('doCheckAvailability() sets state value: error to errorMsg when server response ' +
        'is fail', (done) => {
        var mock = new MockAdapter(axios);
        const resp = 'fail';
        mock.onPost().reply(200, resp);

        const mockSetResp = jest.fn();
        const mockSetName = jest.fn();
        const mockSetAge = jest.fn();
        const mockSetItems = jest.fn();
        const mockAddItem = jest.fn();

        component = shallow(
            <NewOrderStep2 setResp={mockSetResp} setName={mockSetName} setAge={mockSetAge}
                           setItems={mockSetItems} addItem={mockAddItem}/>
        );

        const color = 'blue';
        const size = 's';
        const id = 0;
        const item = [id, color, size];

        component.instance().doCheckAvailability(color, size, item, id);

        setTimeout(function () {
            expect(component.state('error')).toEqual('Towar chwilowo niedostępny');

            done();
        }, 500);
    });

    it('doCheckAvailability() sets redux state value: response to errorMsg when there is ' +
        'server error', (done) => {
        var mock = new MockAdapter(axios);
        mock.onPost().networkError();

        const mockSetResp = jest.fn();
        const mockSetName = jest.fn();
        const mockSetAge = jest.fn();
        const mockSetItems = jest.fn();
        const mockAddItem = jest.fn();

        component = shallow(
            <NewOrderStep2 setResp={mockSetResp} setName={mockSetName} setAge={mockSetAge}
                           setItems={mockSetItems} addItem={mockAddItem}/>
        );

        const color = 'blue';
        const size = 's';
        const id = 0;
        const item = [id, color, size];

        component.instance().doCheckAvailability(color, size, item, id);

        setTimeout(function () {
            expect(mockSetResp).toHaveBeenCalledWith('Błąd serwera');
            mock.restore();

            done();
        }, 500);
    });

    it('doAddOrder() sends data to server', (done) => {
        var mock = new MockAdapter(axios);
        const resp = 'sample resp';
        mock.onPost().reply(200, resp);

        const mockSetResp = jest.fn();
        const mockSetName = jest.fn();
        const mockSetAge = jest.fn();
        const mockSetItems = jest.fn();
        const mockAddItem = jest.fn();

        const name = 'Kuba';
        const age = 30;
        const items = [{id: 0, color: 'blue', size: 's'},
            {id: 1, color: 'lightblue', size: 'm'}];

        component = shallow(
            <NewOrderStep2 setResp={mockSetResp} setName={mockSetName} setAge={mockSetAge}
                           setItems={mockSetItems} addItem={mockAddItem} name={name}
                           age={age} items={items}/>
        );

        component.instance().doAddOrder();

        setTimeout(function () {
            expect(component.state('added')).toEqual([name+age+items]);

            done();
        }, 500);
    });

    it('doAddOrder() sets redux state value: response to errorMsg when there is ' +
        'server error', (done) => {
        var mock = new MockAdapter(axios);
        mock.onPost().networkError();

        const mockSetResp = jest.fn();
        const mockSetName = jest.fn();
        const mockSetAge = jest.fn();
        const mockSetItems = jest.fn();
        const mockAddItem = jest.fn();

        component = shallow(
            <NewOrderStep2 setResp={mockSetResp} setName={mockSetName} setAge={mockSetAge}
                           setItems={mockSetItems} addItem={mockAddItem}/>
        );

        component.instance().doAddOrder();

        setTimeout(function () {
            expect(mockSetResp).toHaveBeenCalledWith('Błąd serwera');

            done();
        }, 500);
    });

    it('renders a form with 1 select input, 3 radio inputs, 2 buttons', () => {
        component = shallow(
            <NewOrderStep2 />
        );

        expect(component.find('input[type="radio"]')).toHaveLength(4);
        expect(component.find('select')).toHaveLength(1);
        expect(component.find('button')).toHaveLength(2);
    });

    it('sendData() calls doAddOrder() when there is non-empty prop: items', () => {
        const doAddOrder = jest.spyOn(NewOrderStep2.prototype, 'doAddOrder')
            .mockImplementation(() => {});

        component = shallow(
            <NewOrderStep2 items={['sample item']} />
        );

        component.instance().sendData();

        expect(doAddOrder).toHaveBeenCalled();

        doAddOrder.mockRestore();
    });

    it('sendData() sets state value: error to errorMsg when prop: items' +
        ' is empty', () => {
        component = shallow(
            <NewOrderStep2 items={[]}/>
        );

        component.instance().sendData();
        expect(component.state('error'))
            .toEqual('Należy złożyć conajmniej jedno zamówienie');
    });

    it('resetForm() restores state values: color, size to default', () => {
        component = shallow(
            <NewOrderStep2/>
        );

        component.setState({
            color: 'sample color',
            size: 'sample size'
        });
        expect(component.state('color')).toEqual('sample color');
        expect(component.state('size')).toEqual('sample size');

        component.instance().resetForm();
        expect(component.state('color')).toEqual('');
        expect(component.state('size')).toEqual('');
    });

    it('sizeOnChange is invoked and changes state when sizeInput value changes', () => {
        const event = {
            preventDefault() {},
            target: { value: 'some value' }
        };

        component = shallow(
            <NewOrderStep2 />
        );

        expect(component.state('size')).toEqual('');
        const sizeInputS = component.find('#s');
        sizeInputS.simulate('change', event);
        expect(component.state('size')).toEqual('some value');
        const sizeInputM = component.find('#m');
        sizeInputS.simulate('change', event);
        expect(component.state('size')).toEqual('some value');
        const sizeInputL = component.find('#l');
        sizeInputS.simulate('change', event);
        expect(component.state('size')).toEqual('some value');
        const sizeInputXL = component.find('#xl');
        sizeInputS.simulate('change', event);
        expect(component.state('size')).toEqual('some value');
    });

    it('colorOnChange() is invoked and changes state when colorInput value changes', () => {
        const event = {
            preventDefault() {},
            target: { value: 'some value' }
        };

        component = shallow(
            <NewOrderStep2 />
        );

        const colorInput = component.find('#color');

        expect(component.state('color')).toEqual('');
        colorInput.simulate('change', event);
        expect(component.state('color')).toEqual('some value');
    });
});