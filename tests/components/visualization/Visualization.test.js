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
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        expect(tree.children[0]).toEqual('\u00a0');
    });
});

describe("Visualization functional specification", () => {
    it('visualization div changes accordingly when componentWillReceiveProps', (done) => {
        configure({ adapter: new Adapter() });

        const displayVisualization = jest.spyOn(Visualization.prototype, 'displayVisualization');
        const paintVisualizationSize = jest.spyOn(Visualization.prototype, 'paintVisualizationSize');
        const paintVisualizationColor = jest.spyOn(Visualization.prototype, 'paintVisualizationColor');

        const mockVisualization = { classList: { remove: jest.fn(), add: jest.fn() } };
        jest.spyOn(React, 'createRef')
            .mockImplementation(() => {return {current: mockVisualization}});

        const mockProps = {
            size: 's',
            color: 'blue'
        };

        const component = shallow(
            <Visualization />
        );

        component.instance().UNSAFE_componentWillReceiveProps(mockProps);
        component.update();

        setTimeout(function () {
            expect(displayVisualization).toHaveBeenCalledWith(mockProps);
            expect(mockVisualization.classList.add).toHaveBeenCalledWith('visible');
            expect(mockVisualization.classList.remove).toHaveBeenCalledWith('hidden');

            expect(paintVisualizationColor).toHaveBeenCalledWith(mockProps);
            expect(mockVisualization.classList.add).toHaveBeenCalledWith('small');
            expect(mockVisualization.classList.remove).toHaveBeenCalledWith('medium');
            expect(mockVisualization.classList.remove).toHaveBeenCalledWith('large');
            expect(mockVisualization.classList.remove).toHaveBeenCalledWith('extralarge');

            expect(paintVisualizationSize).toHaveBeenCalledWith(mockProps);
            expect(mockVisualization.classList.add).toHaveBeenCalledWith('blue');
            expect(mockVisualization.classList.remove).toHaveBeenCalledWith('lightblue');
            expect(mockVisualization.classList.remove).toHaveBeenCalledWith('darkblue');

            done();
            component.unmount();
        }, 4000);
    });
});