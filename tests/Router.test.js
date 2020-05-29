import React from 'react';
import {MemoryRouter} from "react-router-dom";
import NewOrderStep1 from "../src/components/orders/NewOrderStep1";
import Orders from "../src/components/orders/Orders";
import Summary from "../src/components/summary/Summary"
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

    it('component "Orders" is displayed when "/step2" url is passed', () => {
        configure({ adapter: new Adapter() });

        const root = document.createElement('div');
        document.body.appendChild(root);

        const component = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/step2']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(component.find(Orders)).toHaveLength(1);
    })

    it('component "Summary" is displayed when "/summary" url is passed', () => {
        configure({ adapter: new Adapter() });

        const root = document.createElement('div');
        document.body.appendChild(root);

        const component = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/summary']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(component.find(Summary)).toHaveLength(1);
    })
})