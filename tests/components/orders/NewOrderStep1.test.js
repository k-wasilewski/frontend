import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {Provider} from "react-redux";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ConnectedNewOrderStep1, { NewOrderStep1 } from "../../../src/components/orders/NewOrderStep1";

describe("NewOrderStep1 specification", () => {
    it('renders a form with two inputs', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedNewOrderStep1 />
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const form = tree.children[0]
        expect(form.type).toEqual('form')

        const col2 = form.children[0].children[4]

        const nameInput = col2.children[0].children[0]
        expect(nameInput.props).toHaveProperty('id', 'nameInput' )
        expect(nameInput.props).toHaveProperty('type', 'text' )
        expect(nameInput.props).toHaveProperty('name', 'name' )

        const ageInput = col2.children[1].children[0]
        expect(ageInput.props).toHaveProperty('id', 'ageInput' )
        expect(ageInput.props).toHaveProperty('type', 'number' )
        expect(ageInput.props).toHaveProperty('name', 'age' )
    })

    it('functions getResponse(), getError() and redux functions setItems(), setName(), ' +
        'setAge() are invoked when componentDidMount', () => {
        configure({ adapter: new Adapter() });

        let mockSetItems = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()

        const getResponse = jest.spyOn(NewOrderStep1.prototype, 'getResponse');
        const getError = jest.spyOn(NewOrderStep1.prototype, 'getError');

        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}/>
        )

        expect(mockSetItems).toHaveBeenCalled()
        expect(mockSetName).toHaveBeenCalled()
        expect(mockSetAge).toHaveBeenCalled()
        expect(getResponse).toHaveBeenCalled()
        expect(getError).toHaveBeenCalled()
    })

    it('style-changing nameOnChange() is invoked when nameInput value changes', () => {
        configure({ adapter: new Adapter() });

        const event = {
            preventDefault() {},
            target: { value: 'some value' }
        };

        let mockSetItems = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()

        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge} />
        )

        const nameInput = component.find('#nameInput')

        try {
            nameInput.simulate('change', event)
        } catch (e) {
            expect(e.message).toEqual('Cannot read property \'style\' of null')
        }
    })

    it('style-changing ageOnChange() is invoked when ageInput value changes', () => {
        configure({ adapter: new Adapter() });

        const event = {
            preventDefault() {},
            target: { value: 'some value' }
        };

        let mockSetItems = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()

        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge} />
        )

        const ageInput = component.find('#ageInput')

        try {
            ageInput.simulate('change', event)
        } catch (e) {
            expect(e.message).toEqual('Cannot read property \'style\' of null')
        }
    })

    it('getError() is invoked when state value: error changes and changes the ' +
        'error paragraph style: display to block', () => {
        configure({ adapter: new Adapter() });

        let mockSetItems = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()

        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge} />
        )

        try {
            component.setState({
                error: 'sample error'
            })
        } catch (e) {
            expect(e.message).toEqual('Cannot read property \'style\' of null')
        }
    })

    it('getResponse() returns the errorMsg when the prop: resp contains string ' +
        'error', () => {
        configure({ adapter: new Adapter() });

        let mockSetItems = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()

        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}
                resp='error: sample resp' />
        )

        let result = component.instance().getResponse()
        expect(result).toEqual('sample resp')
    })

    it('getResponse() returns the prop: resp when it doesnt contain string ' +
        'error', () => {
        configure({ adapter: new Adapter() });

        let mockSetItems = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()

        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}
                           resp='sample resp' />
        )

        let result = component.instance().getResponse()
        expect(result).toEqual('sample resp')
    })

    it('handleSubmit() sets state value: error to errorMsg when age is empty', () => {
        configure({ adapter: new Adapter() });

        let mockSetItems = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()

        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}
                age=''/>
        )

        component.instance().getError = jest.fn()
        component.update()

        component.instance().handleSubmit()

        expect(component.state('error')).toEqual('Należy podać wymagane dane')
    })

    it('handleSubmit() sets state value: error to errorMsg when name is empty', () => {
        configure({ adapter: new Adapter() });

        let mockSetItems = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()

        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge}
                           name=''/>
        )

        component.instance().getError = jest.fn()
        component.update()

        component.instance().handleSubmit()

        expect(component.state('error')).toEqual('Należy podać wymagane dane')
    })

    it('handleSubmit() sets state value: error to errorMsg when age is invalid', () => {
        configure({ adapter: new Adapter() });

        let mockSetItems = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()

        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge} />
        )

        component.instance().getError = jest.fn()
        component.update()

        component.setState({
            name: 'Kuba',
            age: 12,
            nameValid: true,
            ageValid: false
        })
        component.instance().handleSubmit()

        expect(component.state('error')).toEqual('Należy podać wiek w przedziale 18-100')
    })

    it('handleSubmit() sets state value: error to errorMsg when name is invalid', () => {
        configure({ adapter: new Adapter() });

        let mockSetItems = jest.fn()
        let mockSetName = jest.fn()
        let mockSetAge = jest.fn()

        const component = shallow(
            <NewOrderStep1 setItems={mockSetItems} setName={mockSetName} setAge={mockSetAge} />
        )

        component.instance().getError = jest.fn()
        component.update()

        component.setState({
            name: 'hi28*73*^',
            age: 32,
            ageValid: true,
            nameValid: false
        })
        component.instance().handleSubmit()

        expect(component.state('error')).toEqual('Imię może zawierać tylko jeden wyraz, ' +
            'musi być pisane z wielkiej litery, bez cyfr i znaków specjalnych')
    })
})