import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedSummary, { Summary } from "../../../src/components/summary/Summary"

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

    it('doGetList()', () => {
        configure({ adapter: new Adapter() });

        const component = shallow(
            <Summary />
        )

        let mockClick = () => component.find('.col2')[0].children[0].simulate('click')
    })
})