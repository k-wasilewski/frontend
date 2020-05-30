import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedNewOrderStep2, { NewOrderStep2 } from "../../../src/components/orders/NewOrderStep2";

describe("NewOrderStep2 specification", () => {
    it('should render zxczxczxDDSSDs', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedNewOrderStep2 />
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();


    })

    it('sdfsdfsd', () => {
        configure({ adapter: new Adapter() });

        const component = shallow(
            <NewOrderStep2 />
        )

    })
})