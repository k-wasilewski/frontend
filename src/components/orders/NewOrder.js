import React, {Component} from 'react';
import '../../css/App.css';
import { connect } from 'react-redux';
import { addOrder } from "../../redux/actions";

class NewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            color: '',
            size: '',
            id: 0,
        };

        this.nameOnChange = this.nameOnChange.bind(this);
        this.ageOnChange = this.ageOnChange.bind(this);
        this.colorOnChange = this.colorOnChange.bind(this);
        this.sizeOnChange = this.sizeOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        var newOrder = [];
        var id = (this.state.id);
        var age = (this.state.age);
        var name = (this.state.name);
        var size = (this.state.size);
        var color = (this.state.color);
        newOrder.push(id)
        newOrder.push(name);
        newOrder.push(age);
        newOrder.push(color);
        newOrder.push(size);
        this.props.addOrder(newOrder)

        this.setState({id: id+1})
        this.resetForm()
        if (event!==undefined) event.preventDefault();
    }

    resetForm = () => {
        this.setState({
            name: '',
            age: '',
            color: '',
            size: '',
        })
    }

    nameOnChange = (event) => {
        this.setState({name: event.target.value});
    }

    ageOnChange = (event) => {
        this.setState({age: event.target.value});
    }

    colorOnChange = (event) => {
        this.setState({color: event.target.value});
    }

    sizeOnChange = (event) => {
        this.setState({size: event.target.value});
    }

    sendData = (event) => {
        alert(this.props.orders)
        if (event!==undefined) event.preventDefault();
    }

    render() {
        return (
            <div className="main">
                <form onSubmit={this.handleSubmit}>
                    <div className='form'>
                        <h2>Nowe zamówienie</h2>
                        <div className='col1'>
                            <p>Imię:</p>
                            <p>Wiek:</p>
                            <p><label htmlFor='color'>Kolor:</label></p>
                            <p>Rozmiar:</p>
                            <button>Zapisz</button>
                            <button onClick={this.sendData}>Wyślij</button>
                        </div>
                        <div className='col2'>
                            <p><input type='text' name='name' value= {this.state.name}
                                      onChange={this.nameOnChange}/></p>
                            <p><input type='number' name='age' onChange={this.ageOnChange}
                                      value= {this.state.age}/></p>
                            <p><select name='color' id='color' onChange={this.colorOnChange}
                                       value={this.state.color}>
                                <option disabled selected value=''>(wybierz)</option>
                                <option value='blue'>Niebieski</option>
                                <option value='lightblue'>Błękitny</option>
                                <option value='darkblue'>Granatowy</option>
                            </select></p>
                            <input type="radio" id="s" name="size" value="s"
                                   onChange={this.sizeOnChange} checked={this.state.size==='s'}/>
                            <label htmlFor="male">S</label><br/>
                            <input type="radio" id="m" name="size" value="m"
                                   onChange={this.sizeOnChange} checked={this.state.size==='m'}/>
                            <label htmlFor="female">M</label><br/>
                            <input type="radio" id="l" name="size" value="l"
                                   onChange={this.sizeOnChange} checked={this.state.size==='l'}/>
                            <label htmlFor="other">L</label><br/>
                            <input type="radio" id="xl" name="size" value="xl"
                                   onChange={this.sizeOnChange} checked={this.state.size==='xl'}/>
                            <label htmlFor="other">XL</label><br/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        orders: state.newOrderReducer.orders
    };
}

const mapDispatchToProps = {
    addOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);
