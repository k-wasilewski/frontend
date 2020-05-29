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

        component.instance().doGetList = jest.fn();
        component.update();
        let mockClick = () => component.find('.col2').find('button').simulate('click')
        mockClick()

        expect(doGetList).toHaveBeenCalled()
    })

    it('doGetList() sends a request to server', (done) => {
        var mock = new MockAdapter(axios);
        const resp = true
        mock.onGet('http://localhost:8081/list').reply(200, resp);

        const component = shallow(
            <Summary />
        )

        component.instance().doGetList()

        setTimeout(function () {
            expect(component.instance().state.list).toEqual(resp)
            done()
        }, 4000)
    })
})