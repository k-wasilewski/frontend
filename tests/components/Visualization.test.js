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

        console.log(tree)
        expect(tree.children[0]).toEqual('\u00a0')
    })

    it('toggleMenuVisibility()', () => {
        configure({ adapter: new Adapter() });

        const component = shallow(
            <Visualization />
        )

        component.instance().displayVisualization = jest.fn();
        component.instance().paintVisualizationSize = jest.fn();
        component.instance().paintVisualizationColor = jest.fn();
        component.update();
        expect(component.instance().displayVisualization).toBeCalled()
        expect(component.instance().paintVisualizationSize).toBeCalled()
        expect(component.instance().paintVisualizationColor).toBeCalled()
    })
})