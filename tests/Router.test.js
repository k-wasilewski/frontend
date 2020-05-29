import React from 'react';
import {MemoryRouter} from "react-router-dom";
import NewOrderStep1 from "../src/components/orders/NewOrderStep1";
import store from "../src/redux/store";
import {Provider} from "react-redux";
import App from "../src/App";
import {mount, configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

describe("Router specification", () => {
    it('component "NewOrderStep1" is displayed when "/" url is passed', () => {
        configure({ adapter: new Adapter() });

        const root = document.createElement('div');
        document.body.appendChild(root);

        const component = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(component.find(NewOrderStep1)).toHaveLength(1);
    })
})