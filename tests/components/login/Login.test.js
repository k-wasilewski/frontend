import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import Login from "../../../src/components/login/Login";
import {BrowserRouter} from "react-router-dom";
import {configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

describe("Login rendering specification", () => {
    it('Login is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("Login functional specification", () => {
    let component;

    beforeEach(() => {
        configure({ adapter: new Adapter() });
    });

    afterEach(() => {
       component.unmount();
    });

    it('handleSubmit() sends input values username and password as a request ' +
        'to server', () => {
        const error = console.error;
        console.error = jest.fn();

        const setItem = jest.spyOn(window.localStorage.__proto__, 'setItem');
        const mockToken = 'IUOGdiygYG';
        const mockSetUsername = jest.fn();

        var mock = new MockAdapter(axios);
        const resp = {token: mockToken};
        mock.onPost('https://localhost:8081/login')
            .reply(200, resp);

        const mockData = 'mock';
        const mockEvent = {target: {value: mockData}};

        component = mount(
            <Provider store={store}>
                <Login setUsername={mockSetUsername}/>
            </Provider>
        );

        component.find('#usernameInput').simulate('change', mockEvent);
        component.find('#passwordInput').simulate('change', mockEvent);
        component.update();

        setTimeout(function () {
            expect(setItem).toHaveBeenCalledWith('token', mockToken);
            expect(mockSetUsername).toHaveBeenCalledWith(mockData);
            console.error = error;

            done();
            mock.restore();
        }, 500)
    });
});