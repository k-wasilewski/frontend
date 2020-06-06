import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedInListVisualization, { InListVisualization } from "../../../src/components/visualization/InListVisualization";

describe("InListVisualization rendering specification", () => {
    it('renders empty div', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedInListVisualization/>
            </Provider>,
            {
                createNodeMock: (element) => {
                    return (
                        <div className='visible' />
                    );
                }
            }
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        expect(tree.children[0].children[0]).toEqual('\u00a0');
    });
});

describe("InListVisualization functional specification", () => {
    it('should invoke style-changing functions when rendered', () => {
        configure({ adapter: new Adapter() });
        let size = 'mock size';
        let color = 'mock color';

        const component = shallow(
            <InListVisualization size={size} color={color} />
        );

        component.instance().setWidth = jest.fn();
        component.instance().setHeight = jest.fn();
        component.instance().setVisibility = jest.fn();
        component.instance().setCol = jest.fn();
        component.update();

        component.instance().renderVisualization();

        expect(component.instance().setWidth).toBeCalledWith(size);
        expect(component.instance().setHeight).toBeCalledWith(size);
        expect(component.instance().setVisibility).toBeCalledWith(size, color);
        expect(component.instance().setCol).toBeCalledWith(color);

        component.unmount();
    })
})