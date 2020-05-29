import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedVisualization, { Visualization } from "../../src/components/visualization/Visualization";

describe("Visualization specification", () => {
    it('renders empty div', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedVisualization />
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        expect(tree.children[0]).toEqual('\u00a0')
    })

    it('should invoke style-changing functions when componentWillReceiveProps() ' +
        'is invoked', () => {
        configure({ adapter: new Adapter() });

        const component = shallow(
            <Visualization />
        )

        try {
            component.instance().componentWillReceiveProps({
                size: 'mock size',
                color: 'mock color'
            })
        } catch (e) {
            expect(e.message).toBe("Cannot read property 'style' of null");
        }
    })
})