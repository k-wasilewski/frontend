import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../src/redux/store";
import {Provider} from "react-redux";
import Menu from "../../src/components/Menu";
import {BrowserRouter} from "react-router-dom";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

describe("Menu rendering specification", () => {
    it('Menu is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <Menu/>
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
            <Menu />
        );

        expect(component.find('.menu-item-div')).toHaveLength(2);
        expect(component.find('#menu-btn')).toHaveLength(1);
    });

    it('menu button toggles menu display when clicked', () => {
        const mockMenuRef = jest.spyOn(React, 'createRef');

        const toggleMenuVisibility = jest.spyOn(Menu.prototype, 'toggleMenuVisibility');

        component = shallow(
            <Menu />
        );

        const mockMenu = (<div className={'menu hidden'} />);
        mockMenuRef.mockReturnValue({
            current: mockMenu
        });

        const mockClick = () => component.find('#menu-btn').simulate('click');

        setTimeout(function () {
            mockClick();
            expect(mockMenu.classList).toEqual('menu');
            mockClick();
            expect(mockMenu.classList).toEqual('menu hidden');

            expect(toggleMenuVisibility).toHaveBeenCalledTimes(2);
        }, 500);
    });
});