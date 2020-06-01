import React from 'react';
import store from "../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import App from "../src/App";
import {Provider} from "react-redux";
import {render} from "react-dom";

describe("index rendering specification", () => {
    const root = document.createElement('div');

    beforeEach(() => {
        document.body.appendChild(root);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>,
            root
        );
    });

    it('index is rendered to "root" div', () => {
        expect(root.children[0].classList).toContain('App');
    });

    it('index is rendered with divs "menu" and "main"', () => {
        const menu = document.body.children[0].children[0].children[0].children[0];
        const main = document.body.children[0].children[0].children[1].children[0];

        expect(Array.from(menu.classList)).toContain('menu');
        expect(Array.from(main.classList)).toContain('main');
    });
});