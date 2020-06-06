import React, {Component} from 'react';
import '../../css/App.css';
import { connect } from 'react-redux';
import { addItem, setItems, setName, setAge, setResp } from "../../redux/actions";
import axios from 'axios';
import {Redirect} from "react-router-dom";
import Visualization from "../visualization/Visualization";
import UntranslateItems from "../../func/UntranslateItems";
import TranslateItems from "../../func/TranslateItems";

export class NewOrderStep2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            age: '',
            color: '',
            size: '',
            id: 0,

            redirect: false,
            error: '',

            checking: '',
            added: []
        };

        this.colorOnChange = this.colorOnChange.bind(this);
        this.sizeOnChange = this.sizeOnChange.bind(this);
        this.addToList = this.addToList.bind(this);
    };

    componentWillUnmount() {
        axios.post('http://localhost:8081/restore',
            this.getAxiosConfig()
        );
    };

    getAxiosConfig = () => {
        return {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };
    };

    getAxiosConfigJson = () => {
        return {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        };
    };

    doCheckAvailability(color, size, newItem, id) {
        axios.post('http://localhost:8081/check',
            "color=" + color + "&" + "size=" + size,
            this.getAxiosConfig()
        ).then(resp => {
            if (resp.data==='success') {
                this.props.addItem(newItem);
                this.setState({
                    id: id+1,
                    error: ''
                });
            } else if (resp.data==='fail') {
                this.setState({
                    error: 'Towar chwilowo niedostępny'
                });
            }
        }).catch(error => {
            this.props.setResp('Błąd serwera');
        });
    };

    addToList(event) {
        var id = (this.state.id);
        var size = (this.state.size);
        var color = (this.state.color);
        const newItem = {
            color: color,
            size: size
        }

        if (size==='' || color==='') {
            this.setState({
                error: 'Należy wybrać kolor i rozmiar'
            });
        } else {
            this.setState({checking: size+color});
            this.doCheckAvailability(color, size, newItem, id);
        }

        this.resetForm();
        if (event!==undefined) event.preventDefault();
    };

    resetForm = () => {
        this.setState({
            color: '',
            size: '',
        });
    };

    colorOnChange = (event) => {
        this.setState({color: event.target.value});
    };

    sizeOnChange = (event) => {
        this.setState({size: event.target.value});
    };

    doAddOrder() {
        let items = this.props.items;
        UntranslateItems(items);
        axios.post('http://localhost:8081/addOrder',
            {
                'name': this.props.name,
                'age': this.props.age,
            },
            this.getAxiosConfigJson()
        ).then(resp => {
            items = items.map(item => {
                item.order={'id': resp.data}
                return item
            });
            axios.post('http://localhost:8081/addItems',
                JSON.stringify(items),
                this.getAxiosConfigJson()
            ).then(resp => {
                let added = this.state.added;
                added.push(this.props.name+this.props.age+items);

                this.props.setResp(resp.data);
                this.props.setItems([]);
                this.props.setName('');
                this.props.setAge('');
                this.setState({
                    id: 0,
                    redirect: true,
                    added: added
                });
            }).catch(error => {
                this.props.setResp('Błąd serwera');
            })
        }).catch(error => {
            this.props.setResp('Błąd serwera');
        })
    };

    sendData = (event) => {
        if (this.props.items.length===0) {
            this.setState({
                error: 'Należy złożyć conajmniej jedno zamówienie'
            });
        } else {
            this.doAddOrder();
        }

        if (event!==undefined) event.preventDefault();
    };

    render() {
        const name = this.props.name;
        const age = this.props.age;

        if (!this.state.redirect) return (
            <div className="main">
                <form onSubmit={this.addToList}>
                    <p className='resp'>{this.state.error}</p>
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
                        <div className='col2'>
                            <Visualization size={this.state.size} color={this.state.color}/>
                        </div>
                    </div>
                </form>
            </div>
        );
        else {
            this.setState({redirect: false});
            return (<Redirect to='/' />);
        }
    };
}

function mapStateToProps(state) {
    return {
        items: state.setItemsReducer.items,
        name: state.setNameReducer.name,
        age: state.setAgeReducer.age
    };
};

const mapDispatchToProps = {
    addItem,
    setItems,
    setName,
    setAge,
    setResp
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderStep2);
