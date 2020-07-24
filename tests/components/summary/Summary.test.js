import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedSummary, { Summary } from "../../../src/components/summary/Summary";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {BrowserRouter} from "react-router-dom";
import TranslateItems from "../../../src/func/TranslateItems";

describe("Summary rendering specification", () => {
    it('Summary is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <ConnectedSummary/>
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe("Summary functional specification", () => {
    let component;
    const mockUser = 'mock';

    const axiosConfig = {
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    };

    beforeEach(() => {
        configure({ adapter: new Adapter() });
    });

    afterEach(() => {
       component.unmount();
    });

    it('renders title and a button initialy', () => {
        component = shallow(
            <Summary username={mockUser}/>
        );

        expect(component.find('h2').at(0).text()).toEqual('Podsumowanie');
        expect(component.find('button').at(0).text()).toEqual('Szukaj');
    });

    it('doGetList() sends a request to server', (done) => {
        const error = console.error;
        console.error = jest.fn();

        var mock = new MockAdapter(axios);
        const resp = {name:'Kuba', age:30, items: [{id:0, color:'blue', size:'s'},
            {id:1, color:'lightblue', size:'m'}]};
        const translatedResp = TranslateItems(resp);
        mock.onGet(
            'http://localhost:8081/auth/list?username='+mockUser,
            axiosConfig
        ).reply(200, resp);

        component = shallow(
            <Summary username={mockUser}/>
        );

        component.instance().doGetList();
        component.update();

        setTimeout(function () {
            expect(component.state.list).toEqual(translatedResp);
            console.error = error;

            done();
            mock.restore();
        }, 500);
    });

    it('doGetList() handles error accordingly', (done) => {
        const error = console.error;
        console.error = jest.fn();

        var mock = new MockAdapter(axios);
        mock.onGet(
            'http://localhost:8081/auth/list?username='+mockUser,
            axiosConfig
        ).networkError();

        component = shallow(
            <Summary username={mockUser}/>
        );

        component.instance().doGetList();
        component.update();

        setTimeout(function () {
            expect(component.state('error')).toEqual('Błąd serwera');
            console.error = error;

            done();
        }, 500)
    });

    it('formatList() transforms json list element to html li', () => {
        const name = 'Kuba';
        const age = '30';
        const datetime = '2020-05-29 18:37:23.458';
        const list = [{
            name: name,
            age: age,
            created: datetime
        }];

        component = shallow(
            <Summary username={mockUser}/>
        );

        const transformedList = component.instance().formatList(list);

        expect(transformedList[0].type).toEqual('ul');
        expect(transformedList[0].key).toEqual(name+age+datetime);
    })

    it('formatItems() transforms array elements to list elements', () => {
        const size = 's';
        const color = 'blue';
        const sizePL = 'S';
        const colorPL = 'Niebieski';

        let items = [];
        const item = {
            id: 0,
            color: color,
            size: size
        }
        items.push(item);

        component = shallow(
            <Summary username={mockUser}/>
        );

        const transformedItems = component.instance().formatItems(items);

        expect(transformedItems[0].type).toEqual('li');
        expect(transformedItems[0].key).toEqual('0');

        expect(JSON.stringify(transformedItems[0])).toContain(colorPL);
        expect(JSON.stringify(transformedItems[0])).toContain(sizePL);
    })

    it('button "Elementy" invokes showOrderList() onClick', (done) => {
        const showOrderList = jest.spyOn(Summary.prototype, 'showOrderList')
            .mockImplementation(() => {});

        const name = 'Kuba';
        const age = '666';
        const created = '123'
        const list = [{name: name, age: age, created: created,
            items: [{id: 0, color: 'blue', size: 's'}]}];

        component = shallow(
            <Summary username={mockUser}/>
        );

        component.instance().setState({
            list: list
        });
        component.update();

        setTimeout(function () {
            const showElemsBtn = component.find('.showElems').at(0);

            const mockshowElemsBtnEvent = { target: showElemsBtn};

            showElemsBtn.simulate('click', mockshowElemsBtnEvent);

            setTimeout(function () {
                expect(showOrderList).toHaveBeenCalledWith(mockshowElemsBtnEvent);

                done();
                showOrderList.mockRestore();
            }, 500);
        }, 500)
    });

    it('showOrderList() modifies DOM elements style', (done) => {
        const mockToggle = jest.fn();
        const mockFn = jest.fn(() => [{classList: {toggle: mockToggle}}]);
        const mockEvent = {target: {parentElement: {getElementsByClassName: mockFn}}}

        component = shallow(
            <Summary username={mockUser}/>
        );

        component.instance().showOrderList(mockEvent);
        component.update();

        setTimeout(function () {
            expect(mockFn).toHaveBeenCalledWith('orderItems');
            expect(mockToggle).toHaveBeenCalled();

            done();
        }, 500)
    });

    it('doGetList() is invoked when search btn is clicked', () => {
        const doGetList = jest.spyOn(Summary.prototype, 'doGetList');

        component = shallow(
            <Summary username={mockUser}/>
        );

        const mockClick = () => component.find('.col2').find('button').simulate('click');
        mockClick();

        expect(doGetList).toHaveBeenCalled();
    })
});
