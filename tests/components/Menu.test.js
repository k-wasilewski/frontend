import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../src/redux/store";
import {Provider} from "react-redux";
import Menu from "../../src/components/Menu";
import {BrowserRouter} from "react-router-dom";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

describe("Menu rendering specification", () => {
    it('renders two menu items and a menu btn', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <Menu/>
                </BrowserRouter>
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        let menuItems = tree.children[0];
        let newOrderBtn = menuItems.children[0].children[0];
        let summaryBtn = menuItems.children[0].children[1];
        expect(newOrderBtn.children[0].children[0].children[0]).toContain('Nowe zamówienie');
        expect(summaryBtn.children[0].children[0].children[0]).toContain('Podsumowanie');

        let menuBtn = tree.children[1];
        expect(menuBtn.props.id).toContain('menu-btn');
    });
});

describe("Menu functional specification", () => {
    it('menu button toggles menu display when clicked', () => {
        configure({ adapter: new Adapter() });

        const mockMenuRef = jest.spyOn(React, 'createRef');

        const component = shallow(
            <Menu />
        );

        const mockMenu = (<div className={'menu hidden'} />);
        mockMenuRef.mockReturnValue({
            current: mockMenu
        });

        let mockClick = () => component.find('#menu-btn').simulate('click');

        setTimeout(function () {
            mockClick();
            expect(mockMenu.classList).toEqual('menu');
            mockClick();
            expect(mockMenu.classList).toEqual('menu hidden');

            component.unmount();
        }, 4000);
    });
});