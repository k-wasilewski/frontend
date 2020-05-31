import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedNewOrderStep2, { NewOrderStep2 } from "../../../src/components/orders/NewOrderStep2";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe("NewOrderStep2 specification", () => {
    it('renders a form with select, radio, and two buttons', () => {
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

    it('colorOnChange() is invoked and changes state when colorInput value changes', () => {
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

    it('sizeOnChange is invoked and changes state when sizeInput value changes', () => {
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

    it('translateSize() returns size in uppercase', () => {
        configure({adapter: new Adapter()});

        const component = shallow(
            <NewOrderStep2/>
        )

        const input = '[blue,s]'
        const expected = '[blue,S]'

        expect(component.instance().translateSize(input)).toEqual(expected)
    })

    it('translateColor() returns translated color, starting with uppercase', () => {
        configure({adapter: new Adapter()});

        const component = shallow(
            <NewOrderStep2/>
        )

        const input = '[blue,s]'
        const expected = '[Niebieski,s]'

        expect(component.instance().translateColor(input)).toEqual(expected)
    })

    it('resetForm() restores state values: color, size to default', () => {
        configure({adapter: new Adapter()});

        const component = shallow(
            <NewOrderStep2/>
        )

        component.setState({
            color: 'sample color',
            size: 'sample size'
        })
        expect(component.state('color')).toEqual('sample color')
        expect(component.state('size')).toEqual('sample size')

        component.instance().resetForm()
        expect(component.state('color')).toEqual('')
        expect(component.state('size')).toEqual('')
    })

    it('sendData() sets state value: error to errorMsg when prop items' +
        ' is empty', () => {
        configure({adapter: new Adapter()});

        const component = shallow(
            <NewOrderStep2 items={[]}/>
        )

        component.instance().sendData()
        expect(component.state('error'))
            .toEqual('Należy złożyć conajmniej jedno zamówienie')
    })

    it('sendData() calls doAddOrder() when there is non-empty prop items', () => {
        configure({adapter: new Adapter()});

        const component = shallow(
            <NewOrderStep2 items={['sample item']} />
        )

        component.instance().doAddOrder = jest.fn();
        component.update();

        component.instance().sendData()

        expect(component.instance().doAddOrder).toBeCalled();
    })

    it('handleResponse() sets state value: error to errorMsg when there is ' +
        'error string present in passed string value', () => {
        configure({ adapter: new Adapter() });

        const msg = '[blue,s]'
        const msgPL = '[Niebieski,S]'
        const data = 'error: '+msg

        const resp = {data: data}

        let mockSetResp = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()
        let mockSetItems = jest.fn()

        const component = shallow(
            <NewOrderStep2 setResp={mockSetResp} setName={mockSetName} setAge={mockSetAge}
                           setItems={mockSetItems}/>
        )

        component.instance().handleResponse(resp)
        expect(mockSetResp).toHaveBeenCalled()
        expect(component.state('error')).toEqual(msgPL)
    })

    it('handleResponse() restores order values and redirects when there is ' +
        'no error string present in passed string value', () => {
        configure({ adapter: new Adapter() });

        const msg = '[blue,s]'
        const msgPL = '[Niebieski,S]'
        const data = msg

        const resp = {data: data}

        let mockSetResp = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()
        let mockSetItems = jest.fn()

        const component = shallow(
            <NewOrderStep2 setResp={mockSetResp} setName={mockSetName} setAge={mockSetAge}
                           setItems={mockSetItems}/>
        )

        component.instance().handleResponse(resp)
        expect(mockSetResp).toHaveBeenCalled()
        expect(mockSetItems).toHaveBeenCalled()
        expect(mockSetAge).toHaveBeenCalled()
        expect(mockSetName).toHaveBeenCalled()
        expect(component.state('id')).toEqual(0)
        expect(component.state('redirect')).toEqual(true)
    })

    it('addToList() handles name, age errors and invokes doCheckAvailability() ' +
        'when there is no error', () => {
        configure({ adapter: new Adapter() });

        let mockSetResp = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()
        let mockSetItems = jest.fn()

        const component = shallow(
            <NewOrderStep2 setResp={mockSetResp} setName={mockSetName} setAge={mockSetAge}
                           setItems={mockSetItems}/>
        )

        component.setState({
            size: '',
            color: 'blue'
        })
        component.instance().addToList()
        expect(component.state('error')).toEqual('Należy wybrać kolor i rozmiar')

        component.setState({
            size: 's',
            color: ''
        })
        component.instance().addToList()
        expect(component.state('error')).toEqual('Należy wybrać kolor i rozmiar')



        component.setState({
            size: 's',
            color: 'blue'
        })
        component.instance().addToList()
        expect(component.state('checking')).toEqual('sblue')
    })

    it('componentWillUnmount() makes a request to restore temporaryCounts to ' +
        'according permanent counts', (done) => {
        configure({adapter: new Adapter()});

        const error = console.error;
        console.error = jest.fn();

        let axiosConfig = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };

        var mock = new MockAdapter(axios);
        const resp = []
        mock.onPost(
            'http://localhost:8081/restore',
            axiosConfig
        ).reply(200, resp);

        let mockSetResp = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()
        let mockSetItems = jest.fn()

        const component = shallow(
            <NewOrderStep2 setResp={mockSetResp} setName={mockSetName} setAge={mockSetAge}
                           setItems={mockSetItems}/>
        )

        component.instance().componentWillUnmount()
        console.error = error
        done()
    })

    it('doCheckAvailability() invokes setResp() when server response contains ' +
        'error', (done) => {
        configure({adapter: new Adapter()});

        const error = console.error;
        console.error = jest.fn();

        let axiosConfig = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };

        var mock = new MockAdapter(axios);
        const resp = {data: 'success'}
        mock.onPost(
            'http://localhost:8081/sdfsdf',
            axiosConfig
        ).reply(200, resp);

        let mockSetResp = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()
        let mockSetItems = jest.fn()
        let mockAddItem = jest.fn()

        const component = shallow(
            <NewOrderStep2 setResp={mockSetResp} setName={mockSetName} setAge={mockSetAge}
                           setItems={mockSetItems} addItem={mockAddItem}/>
        )

        const color = 'blue'
        const size = 's'
        const id = 0
        const item = [id, color, size]

        component.instance().doCheckAvailability(color, size, item, id)

        setTimeout(function () {
            expect(mockSetResp).toHaveBeenCalled()
            console.error = error
            done()
        }, 4000)
    })

    it('doCheckAvailability() invokes addItem() when server response ' +
        'is success', (done) => {
        configure({adapter: new Adapter()});

        const error = console.error;
        console.error = jest.fn();

        let axiosConfig = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };

        var mock = new MockAdapter(axios);
        const resp = 'success'
        mock.onPost().reply(200, resp);

        let mockSetResp = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()
        let mockSetItems = jest.fn()
        let mockAddItem = jest.fn()

        const component = shallow(
            <NewOrderStep2 setResp={mockSetResp} setName={mockSetName} setAge={mockSetAge}
                           setItems={mockSetItems} addItem={mockAddItem}/>
        )

        const color = 'blue'
        const size = 's'
        const id = 0
        const item = [id, color, size]

        component.instance().doCheckAvailability(color, size, item, id)

        setTimeout(function () {
            expect(mockAddItem).toHaveBeenCalled()
            console.error = error
            done()
        }, 4000)
    })

    it('doCheckAvailability() sets state value: error to errorMsg when server response ' +
        'is fail', (done) => {
        configure({adapter: new Adapter()});

        const error = console.error;
        console.error = jest.fn();

        let axiosConfig = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };

        var mock = new MockAdapter(axios);
        const resp = 'fail'
        mock.onPost().reply(200, resp);

        let mockSetResp = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()
        let mockSetItems = jest.fn()
        let mockAddItem = jest.fn()

        const component = shallow(
            <NewOrderStep2 setResp={mockSetResp} setName={mockSetName} setAge={mockSetAge}
                           setItems={mockSetItems} addItem={mockAddItem}/>
        )

        const color = 'blue'
        const size = 's'
        const id = 0
        const item = [id, color, size]

        component.instance().doCheckAvailability(color, size, item, id)

        setTimeout(function () {
            expect(component.state('error')).toEqual('Towar chwilowo niedostępny')
            console.error = error
            done()
        }, 4000)
    })

    it('doAddOrder() sends data to server', (done) => {
        configure({adapter: new Adapter()});

        const error = console.error;
        console.error = jest.fn();

        let axiosConfig = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };

        var mock = new MockAdapter(axios);
        const resp = 'sample resp'
        mock.onPost().reply(200, resp);

        let mockSetResp = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()
        let mockSetItems = jest.fn()
        let mockAddItem = jest.fn()

        const name = 'Kuba'
        const age = 30
        const items = [[0, 'blue', 's'], [1, 'lightblue', 'm']]

        const component = shallow(
            <NewOrderStep2 setResp={mockSetResp} setName={mockSetName} setAge={mockSetAge}
                           setItems={mockSetItems} addItem={mockAddItem} name={name}
                    age={age} items={items}/>
        )

        component.instance().doAddOrder()

        setTimeout(function () {
            expect(component.state('added')).toEqual([name+age+items])
            console.error = error
            done()
        }, 4000)
    })
})