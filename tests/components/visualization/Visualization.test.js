import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedVisualization, { Visualization } from "../../../src/components/visualization/Visualization";

describe("Visualization rendering specification", () => {
    it('renders empty div', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedVisualization/>
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        expect(tree.children[0]).toEqual('\u00a0');
    });
});

describe("Visualization functional specification", () => {
    it('visualization div changes accordingly when componentWillReceiveProps', () => {
        configure({ adapter: new Adapter() });

        const mockVisualizationRef = jest.spyOn(React, 'createRef');

        const component = shallow(
            <Visualization />
        );

        const mockVisualization = (<div id='visualization' />);
        mockVisualizationRef.mockReturnValue({
            current: mockVisualization
        });

        setTimeout(function () {
            expect(mockVisualization.style.display = 'none');
            component.instance().UNSAFE_componentWillReceiveProps({
                size: 's',
                color: 'blue'
            });
            expect(mockVisualization.style.width = '25px');
            expect(mockVisualization.style.height = '25px');
            expect(mockVisualization.style.backgroundColor = 'blue');

            component.unmount();
        }, 4000);
    });
});