import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../src/redux/store";
import {Provider} from "react-redux";
import Menu from "../../src/components/Menu";
import {BrowserRouter} from "react-router-dom";

describe("Menu specification", () => {
    it('renders two menu items and a menu btn', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <Menu />
                </BrowserRouter>
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        let menuItems = tree.children[0]
        let newOrderBtn = menuItems.children[0].children[0]
        let summaryBtn = menuItems.children[0].children[1]
        expect(newOrderBtn.children[0].children[0].children[0]).toContain('Nowe zamówienie')
        expect(summaryBtn.children[0].children[0].children[0]).toContain('Podsumowanie')

        let menuBtn = tree.children[1]
        expect(menuBtn.props.id).toContain('menu-btn')
    })
})