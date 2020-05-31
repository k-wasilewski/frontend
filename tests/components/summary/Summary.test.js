import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedSummary, { Summary } from "../../../src/components/summary/Summary"
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe("Summary specification", () => {
    it('renders a title and a button initially', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedSummary />
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const summary = tree.children[0]
        expect(summary.children[0].children[0]).toEqual('Podsumowanie')
        expect(summary.children[2].children[0].children[0]).toEqual('Szukaj')
    })

    it('doGetList() is invoked when search btn is clicked', () => {
        configure({ adapter: new Adapter() });

        const doGetList = jest.spyOn(Summary.prototype, 'doGetList');

        const component = shallow(
            <Summary />
        )

        component.instance().doGetList = jest.fn()
        component.update()
        let mockClick = () => component.find('.col2').find('button').simulate('click')
        mockClick()

        expect(doGetList).toHaveBeenCalled()
    })

    it('doGetList() sends a request to server', (done) => {
        const error = console.error;
        console.error = jest.fn();

        let axiosConfig = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };

        var mock = new MockAdapter(axios);
        const resp = []
        mock.onGet(
            'http://localhost:8081/list',
            axiosConfig
        ).reply(200, resp);

        const component = shallow(
            <Summary />
        )

        component.instance().doGetList()

        setTimeout(function () {
            expect(component.instance().state.list).toEqual(resp)
            console.error = error
            done()
        }, 4000)
    })

    it('formatList() transforms string to list elements', () => {
        configure({ adapter: new Adapter() });

        const name = 'Kuba'
        const age = '30'
        const datetime = '2020-05-29 18:37:23.458'
        const list = '[<'+name+', '+age+', '+datetime+': [[blue, s]]>]'

        const component = shallow(
            <Summary />
        )

        const transformedList = component.instance().formatList(list)

        expect(transformedList[0].type).toEqual('ul')
        expect(transformedList[0].key).toEqual(name+age+datetime)
    })

    it('formatItems() transforms array elements to list elements', () => {
        configure({ adapter: new Adapter() });

        const size = 's'
        const color = 'blue'
        const sizePL = 'S'
        const colorPL = 'Niebieski'

        let items = []
        let item = '['+color+','+size+']'
        items.push(item)

        const component = shallow(
            <Summary />
        )

        const transformedItems = component.instance().formatItems(items)

        expect(transformedItems[0].type).toEqual('li')
        expect(transformedItems[0].key).toEqual('0')

        expect(JSON.stringify(transformedItems[0])).toContain(colorPL)
        expect(JSON.stringify(transformedItems[0])).toContain(sizePL)
    })

    it('button "Elementy" invokes showOrderList() onClick', () => {
        configure({ adapter: new Adapter() });

        const name = 'Kuba'
        const age = '30'
        const datetime = '2020-05-29 18:37:23.458'
        const list = '[<'+name+', '+age+', '+datetime+': [[blue, s]]>]'

        const component = shallow(
            <Summary />
        )

        component.instance().setState({
            list: list
        })

        const showElemsBtn = component.find('.showElems').at(0)
        try {
            showElemsBtn.simulate('click', { target: {showElemsBtn} })
        } catch (e) {
            expect(e.message).toEqual(
                'Cannot read property \'getElementsByClassName\' of undefined'
            )
        }
    })
})