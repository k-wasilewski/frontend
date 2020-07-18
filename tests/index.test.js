import React from 'react';
import store from "../src/redux/store";
import {BrowserRouter, MemoryRouter} from "react-router-dom";
import App from "../src/App";
import {Provider} from "react-redux";
import renderer from 'react-test-renderer';
import {mount, configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

describe("index rendering specification", () => {
    it('index is rendered', () => {
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

describe("index functional specification", () => {
    it('index is rendered with divs "menu" and "main"', () => {
        configure({ adapter: new Adapter() });

        const component = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(component.find('.menu')).toHaveLength(1);
        expect(component.find('.main')).toHaveLength(1);

        component.unmount();
    });
});