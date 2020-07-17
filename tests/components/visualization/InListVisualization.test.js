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
                    if (element.type === 'div') {
                        return (
                            document.createElement('div')
                        );
                    }
                    return null;
                }
            }
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("InListVisualization functional specification", () => {
    it('renderVisualization() invokes setSize(), setVisibility(), setCol() ' +
        'functions', () => {
        configure({ adapter: new Adapter() });
        const size = 'mock size';
        const color = 'mock color';

        const mockVisualizationRef = jest.spyOn(React, 'createRef');
        const mockComponentDidMount = jest.spyOn(InListVisualization.prototype, 'componentDidMount');
        mockComponentDidMount.mockReturnValue({});

        const component = shallow(
            <InListVisualization size={size} color={color} />
        );

        const mockVisualization = (<div className='visible' />);
        mockVisualizationRef.mockReturnValue({
            current: mockVisualization
        });

        component.instance().setSize = jest.fn();
        component.instance().setVisibility = jest.fn();
        component.instance().setCol = jest.fn();
        component.update();

        component.instance().renderVisualization();

        expect(component.instance().setSize).toBeCalledWith(size);
        expect(component.instance().setVisibility).toBeCalledWith(size, color);
        expect(component.instance().setCol).toBeCalledWith(color);

        mockComponentDidMount.mockRestore();
        mockVisualizationRef.mockRestore();
        component.unmount();
    });

    it('renderVisualization() is invoked when componentDidMount', () => {
        configure({ adapter: new Adapter() });
        const size = 'mock size';
        const color = 'mock color';

        const renderVisualization = jest.spyOn(InListVisualization.prototype, 'renderVisualization')
            .mockImplementation(() => {});

        const component = shallow(
            <InListVisualization size={size} color={color} />
        );

        expect(renderVisualization).toHaveBeenCalled();

        renderVisualization.mockRestore();
    });

    it('renderVisualization() invokes setVisibility(), setSize(), setCol()', () => {
        configure({ adapter: new Adapter() });
        const size = 'mock size';
        const color = 'mock color';

        const renderVisualization = jest.spyOn(InListVisualization.prototype, 'renderVisualization');
        const setVisibility = jest.spyOn(InListVisualization.prototype, 'setVisibility')
            .mockImplementation(() => {});
        const setSize = jest.spyOn(InListVisualization.prototype, 'setSize')
            .mockImplementation(() => {});
        const setCol = jest.spyOn(InListVisualization.prototype, 'setCol')
            .mockImplementation(() => {});

        const component = shallow(
            <InListVisualization size={size} color={color} />
        );

        expect(renderVisualization).toHaveBeenCalled();
        expect(setVisibility).toHaveBeenCalled();
        expect(setSize).toHaveBeenCalled();
        expect(setCol).toHaveBeenCalled();

        setVisibility.mockRestore();
        setSize.mockRestore();
        setCol.mockRestore();
    });

    it('setSize() and setCol() modify visualizationRef accordingly', () => {
        configure({ adapter: new Adapter() });
        const size = 's';
        const color = 'lightblue';

        const mockVisualization = { classList: { remove: jest.fn(), add: jest.fn() } };
        const mockCreateRef = jest.spyOn(React, 'createRef')
            .mockImplementation(() => {return {current: mockVisualization}});

        const component = shallow(
            <InListVisualization size={size} color={color} />
        );

        expect(mockVisualization.classList.add).toHaveBeenCalledWith('small');
        expect(mockVisualization.classList.add).toHaveBeenCalledWith('lightblue');

        mockCreateRef.mockRestore();
    });
})