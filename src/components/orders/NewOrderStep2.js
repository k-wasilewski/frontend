import React, {Component} from 'react';
import '../../css/App.css';
import { connect } from 'react-redux';
import { addOrder, setOrders } from "../../redux/actions";
import axios from 'axios';

class NewOrderStep2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            age: '',
            color: '',
            size: '',
            id: 0,
        };

        this.colorOnChange = this.colorOnChange.bind(this);
        this.sizeOnChange = this.sizeOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        var newOrder = [];
        var id = (this.state.id);
        var name = (this.props.name);
        var age = (this.props.age);
        var size = (this.state.size);
        var color = (this.state.color);
        newOrder.push(id)
        newOrder.push(name)
        newOrder.push(age)
        newOrder.push(color);
        newOrder.push(size);

        if (size==='' && color==='') {
            alert('Należy wybrać kolor lub rozmiar')
        } else {
            this.props.addOrder(newOrder)
            this.setState({id: id+1})
        }

        this.resetForm()
        if (event!==undefined) event.preventDefault();
    }

    resetForm = () => {
        this.setState({
            color: '',
            size: '',
        })
    }

    colorOnChange = (event) => {
        this.setState({color: event.target.value});
    }

    sizeOnChange = (event) => {
        this.setState({size: event.target.value});
    }

    sendData = (event) => {
        /*axios.post('http://localhost:8081/add',
            "filename=" + filename[1] + "&"
            + "score=" + score[1] + "&" + "acc=" +acc[1]
        );*/
        alert(this.props.orders)

        this.props.setOrders([])
        this.setState({id: 0})
        if (event!==undefined) event.preventDefault();
    }

    render() {
        const name = this.props.name
        const age = this.props.age

        return (
            <div className="main">
                <form onSubmit={this.handleSubmit}>
                    <div className='form'>
                        <div className='col1'>
                            {name} {(name==='' || age==='') ? '' : ','} {age}
                            <p><label htmlFor='color'>Kolor:</label></p>
                            <p>Rozmiar:</p>
                            <button>Zapisz</button>
                            <button onClick={this.sendData}>Wyślij</button>
                        </div>
                        <div className='col2'>
                            <p><select name='color' id='color' onChange={this.colorOnChange}
                                       value={this.state.color}>
                                <option disabled defaultValue value=''>(wybierz)</option>
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
        orders: state.setOrdersReducer.orders,
        name: state.setNameReducer.name,
        age: state.setAgeReducer.age
    };
}

const mapDispatchToProps = {
    addOrder,
    setOrders
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderStep2);
