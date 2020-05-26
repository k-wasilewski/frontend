import React, {Component} from 'react';
import '../../css/App.css';
import { connect } from 'react-redux';
import { addOrder, setOrders, setName, setAge } from "../../redux/actions";
import axios from 'axios';
import {Redirect} from "react-router-dom";

class NewOrderStep2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            age: '',
            color: '',
            size: '',
            id: 0,

            redirect: false
        };

        this.colorOnChange = this.colorOnChange.bind(this);
        this.sizeOnChange = this.sizeOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        var newOrder = [];
        var id = (this.state.id);
        var size = (this.state.size);
        var color = (this.state.color);
        newOrder.push(id)
        newOrder.push(color);
        newOrder.push(size);

        if (size==='' && color==='') {
            alert('Należy wybrać kolor lub rozmiar')
        } else {
            this.props.addOrder(newOrder)
            this.setState({
                id: id+1,
            })
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
        let axiosConfig = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };

        if (this.props.orders.length===0) {
            alert('Należy złożyć conajmniej jedno zamówienie')
        } else {
            axios.post('http://localhost:8081/add',
                "name=" + this.props.name + "&"
                + "age=" + this.props.age + "&" + "orders=" +this.props.orders,
                axiosConfig
            ).then(resp => {
                alert(resp.data); //TODO
            }).catch(error => {
                alert(error.response) //TODO
            });

            this.props.setOrders([])
            this.props.setName('')
            this.props.setAge('')
            this.setState({
                id: 0,
                redirect: true
            })
        }

        if (event!==undefined) event.preventDefault();
    }

    render() {
        const name = this.props.name
        const age = this.props.age

        if (!this.state.redirect) return (
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
        else {
            this.setState({redirect: false})
            return <Redirect to='/'  />
        }
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
    setOrders,
    setName,
    setAge
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderStep2);
