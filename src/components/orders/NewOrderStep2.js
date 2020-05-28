import React, {Component} from 'react';
import '../../css/App.css';
import { connect } from 'react-redux';
import { addItem, setItems, setName, setAge, setResp } from "../../redux/actions";
import axios from 'axios';
import {Redirect} from "react-router-dom";
import Visualization from "../visualization/Visualization";

class NewOrderStep2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            age: '',
            color: '',
            size: '',
            id: 0,

            redirect: false,
            error: ''
        };

        this.colorOnChange = this.colorOnChange.bind(this);
        this.sizeOnChange = this.sizeOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        let axiosConfig = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };

        axios.post('http://localhost:8081/restore',
            axiosConfig
        )
    }

    handleSubmit(event) {
        var newItem = [];
        var id = (this.state.id);
        var size = (this.state.size);
        var color = (this.state.color);
        newItem.push(id)
        newItem.push(color);
        newItem.push(size);

        if (size==='' && color==='') {
            this.setState({
                error: 'Należy wybrać kolor lub rozmiar'
            })
        } else {
            let axiosConfig = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                }
            };

            axios.post('http://localhost:8081/check',
                "color=" + color + "&" + "size=" + size,
                axiosConfig
            ).then(resp => {
                if (resp.data==='success') {
                    this.props.addItem(newItem)
                    this.setState({
                        id: id+1,
                    })
                } else if (resp.data==='fail') {
                    this.setState({
                        error: 'Towar chwilowo niedostępny'
                    })
                }
            }).catch(error => {
                this.props.setResp('Błąd serwera')
            });
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

        if (this.props.items.length===0) {
            this.setState({
                error: 'Należy złożyć conajmniej jedno zamówienie'
            })
        } else {
            axios.post('http://localhost:8081/add',
                "name=" + this.props.name + "&"
                + "age=" + this.props.age + "&" + "items=" +this.props.items,
                axiosConfig
            ).then(resp => {
                this.props.setResp(resp.data)

                let notAvailRegex = new RegExp('error: (.*)', 'g')
                let match = notAvailRegex.exec(resp.data)
                if (match!==null) {
                    let colorRegex = new RegExp('\\[(.*),', 'g')
                    let sizeRegex = new RegExp(',(.*)\\]', 'g')
                    let response = match[1]
                    let c = colorRegex.exec(response)[1]
                    let cPL
                    let s = sizeRegex.exec(response)[1]
                    let sPL

                    if (c==='blue') cPL = 'Niebieski'
                    else if (c==='lightblue') cPL = 'Błękitny'
                    else if (c==='darkblue') cPL = 'Granatowy'

                    sPL = s.toUpperCase()

                    response = response.replace(c, cPL)
                    let sIndex = response.indexOf(']')-1
                    if (response.charAt(sIndex-1)==='x') {
                        sIndex--
                        response=response.replace('l]', ']')
                    }
                    response = response.substring(0, sIndex) + sPL +
                        response.substring(sIndex + 1)

                    this.setState({
                        error: response
                    })
                } else {
                    this.props.setItems([])
                    this.props.setName('')
                    this.props.setAge('')
                    this.setState({
                        id: 0,
                        redirect: true
                    })
                }
            }).catch(error => {
                this.props.setResp('Błąd serwera')
            });
        }

        if (event!==undefined) event.preventDefault();
    }

    render() {
        const name = this.props.name
        const age = this.props.age

        if (!this.state.redirect) return (
            <div className="main">
                <form onSubmit={this.handleSubmit}>
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
            this.setState({redirect: false})
            return <Redirect to='/'  />
        }
    }
}

function mapStateToProps(state) {
    return {
        items: state.setItemsReducer.items,
        name: state.setNameReducer.name,
        age: state.setAgeReducer.age
    };
}

const mapDispatchToProps = {
    addItem,
    setItems,
    setName,
    setAge,
    setResp
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderStep2);