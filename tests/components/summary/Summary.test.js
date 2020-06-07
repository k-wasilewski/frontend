import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedSummary, { Summary } from "../../../src/components/summary/Summary";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe("Summary rendering specification", () => {
    it('renders a title and a button initially', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedSummary/>
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const summary = tree.children[0];
        expect(summary.children[0].children[0]).toEqual('Podsumowanie');
        expect(summary.children[2].children[0].children[0]).toEqual('Szukaj');
    })
})


describe("Summary functional specification", () => {
    let axiosConfig = {
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    };

    it('doGetList() is invoked when search btn is clicked', () => {
        configure({ adapter: new Adapter() });

        const doGetList = jest.spyOn(Summary.prototype, 'doGetList');

        const component = shallow(
            <Summary />
        );

        component.instance().doGetList = jest.fn();
        component.update();
        let mockClick = () => component.find('.col2').find('button').simulate('click');
        mockClick();

        expect(doGetList).toHaveBeenCalled();
        //component.unmount();
    })

    it('doGetList() sends a request to server', (done) => {
        const error = console.error;
        console.error = jest.fn();

        var mock = new MockAdapter(axios);
        const resp = [{name:'Kuba', age:30, items: [{id:0, color:'blue', size:'s'},
            {id:1, color:'lightblue', size:'m'}]}];
        const translatedResp = [{name:'Kuba', age:30, items: [{id:0, color:'Niebieski', size:'S'},
                {id:1, color:'Błękitny', size:'M'}]}];
        mock.onGet(
            'http://localhost:8081/list',
            axiosConfig
        ).reply(200, resp);

        const component = shallow(
            <Summary />
        );

        component.instance().doGetList();

        setTimeout(function () {
            expect(component.instance().state.list).toEqual(translatedResp);
            console.error = error;

            component.unmount();
            done();
        }, 4000)
    });

    it('formatList() transforms json list element to html li', () => {
        configure({ adapter: new Adapter() });

        const name = 'Kuba';
        const age = '30';
        const datetime = '2020-05-29 18:37:23.458';
        const items = [{id:0, color:'blue', size:'s'}];
        const list = [{
            name: name,
            age: age,
            created: datetime
        }];

        const component = shallow(
            <Summary />
        );

        const transformedList = component.instance().formatList(list);

        expect(transformedList[0].type).toEqual('ul');
        expect(transformedList[0].key).toEqual(name+age+datetime);

        component.unmount();
    })

    it('formatItems() transforms array elements to list elements', () => {
        configure({ adapter: new Adapter() });

        const size = 's';
        const color = 'blue';
        const sizePL = 'S';
        const colorPL = 'Niebieski';

        let items = [];
        let item = {
            id: 0,
            color: color,
            size: size
        }
        items.push(item);

        const component = shallow(
            <Summary />
        );

        const transformedItems = component.instance().formatItems(items);

        expect(transformedItems[0].type).toEqual('li');
        expect(transformedItems[0].key).toEqual('0');

        expect(JSON.stringify(transformedItems[0])).toContain(colorPL);
        expect(JSON.stringify(transformedItems[0])).toContain(sizePL);

        component.unmount();
    })

    it('button "Elementy" invokes style-changing showOrderList() onClick', () => {
        configure({ adapter: new Adapter() });

        const name = 'Kuba';
        const age = '30';
        const list = {name: name, age: age, items: [{id: 0, color: 'blue', size: 's'}]}

        const component = shallow(
            <Summary />
        );

        component.instance().setState({
            list: list
        });

        setTimeout(function () {
            const showElemsBtn = component.find('.showElems').at(0)
            showElemsBtn.simulate('click', { target: {showElemsBtn} })
            component.unmount();
        }, 4000)
    });
});
