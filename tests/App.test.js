import React from 'react';
import renderer from 'react-test-renderer';
import store from "../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import App from "../src/App";
import {Provider} from "react-redux";

describe("App rendering specification", () => {
    it('App is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});