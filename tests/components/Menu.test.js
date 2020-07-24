import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../src/redux/store";
import {Provider} from "react-redux";
import ConnectedMenu, {Menu} from "../../src/components/Menu";
import {BrowserRouter} from "react-router-dom";
import {configure, shallow, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

describe("Menu rendering specification", () => {
    it('Menu is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <ConnectedMenu/>
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("Menu functional specification", () => {
    let component;

    beforeEach(() => {
        configure({ adapter: new Adapter() });
    });

    afterEach(() => {
       component.unmount();
    });

    it('renders two menu items and a menu btn', () => {
        component = shallow(
            <Menu/>
        );

        expect(component.find('.menu-item-div')).toHaveLength(2);
        expect(component.find('#menu-btn')).toHaveLength(1);
    });

    it('menu button toggles menu display when clicked', (done) => {
        const mockToggleFn = jest.fn();

        const mockMenuRef = jest.spyOn(React, 'createRef').mockImplementation(() => {
            return {current: {
                    classList: {
                        toggle: mockToggleFn
                    }
                }}
            }
        );

        const toggleMenuVisibility = jest.spyOn(Menu.prototype, 'toggleMenuVisibility');

        component = shallow(
            <Menu/>
        );

        const mockClick = () => component.find('#menu-btn').simulate('click');

        setTimeout(function () {
            mockClick();
            expect(mockToggleFn).toHaveBeenCalledWith('hidden');

            expect(toggleMenuVisibility).toHaveBeenCalledTimes(1);
            done();
        }, 500);
    });
});