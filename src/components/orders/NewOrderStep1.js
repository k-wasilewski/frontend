import React, {Component} from 'react';
import '../../css/App.css';
import { connect } from 'react-redux';
import { setAge, setName, setItems } from "../../redux/actions";
import  { Redirect } from 'react-router-dom'

export class NewOrderStep1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',

            redirect: false,

            ageValid: false,
            nameValid: false,

            error: ''
        };

        this.errorRef = React.createRef();
        this.nameRef = React.createRef();
        this.ageRef = React.createRef();
        this.nameOnChange = this.nameOnChange.bind(this);
        this.ageOnChange = this.ageOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        this.props.setItems([]);
        this.props.setName('');
        this.props.setAge('');
    };

    handleSubmit(event) {
        var age = (this.state.age);
        this.props.setAge(age);
        var name = (this.state.name);
        this.props.setName(name);

        if (age==='' || name==='') {
            this.setState({
                error: 'Należy podać wymagane dane'
            });
        } else if (!this.state.ageValid) {
            this.setState({
                error: 'Należy podać wiek w przedziale 18-100'
            });
        } else if (!this.state.nameValid) {
            this.setState({
                error: 'Imię może zawierać tylko jeden wyraz, ' +
                    'musi być pisane z wielkiej litery, ' +
                    'bez cyfr i znaków specjalnych'
            });
        } else {
            this.setState({redirect: true});
        }

        if (event!==undefined) event.preventDefault();
    };

    nameOnChange = (event) => {
        let name = event.target.value;
        this.setState({name: name});

        let nameValidationRegex = new RegExp('^[A-Z]([a-z]*)$');
        if (name.includes(' ') || nameValidationRegex.exec(name)===null) {
            this.nameRef.current.style.color = 'red';
            this.setState({nameValid: false});
        } else {
            this.nameRef.current.style.color = 'black';
            this.setState({nameValid: true});
        }
    };

    ageOnChange = (event) => {
        let age = event.target.value;
        this.setState({age: age});

        if (age<18 || age>100) {
            this.ageRef.current.style.color = 'red';
            this.setState({ageValid: false});
        }
        else {
            this.ageRef.current.style.color = 'black';
            this.setState({ageValid: true});
        }
    };

    getResponse() {
        let notAvailRegex = new RegExp('error: (.*)', 'g');
        let match = notAvailRegex.exec(this.props.resp);
        if (match===null) return this.props.resp;

        return match[1];
    };

    getError() {
        let error = this.state.error;
        if (error!=='') this.errorRef.current.
            style.display = 'block';

        return error;
    };

    render() {
        let resp = this.getResponse();

        let error = this.getError();

        if (!this.state.redirect) return (
            <div className="main">
                <form onSubmit={this.handleSubmit}>
                    <div className='form'>
                        <p className='resp'>{resp}</p>
                        <h2>Nowe zamówienie</h2>
                        <p id='nameAgeError' ref={this.errorRef}>{error}</p>
                        <div className='col1'>
                            <p>Imię:</p>
                            <p>Wiek:</p>
                            <button>Dalej</button>
                        </div>
                        <div className='col2'>
                            <p><input type='text' name='name' value= {this.state.name}
                                      id='nameInput' onChange={this.nameOnChange}
                                      ref={this.nameRef}/></p>
                            <p><input type='number' name='age' onChange={this.ageOnChange}
                                      id='ageInput' value= {this.state.age}
                                      ref={this.ageRef}/></p>
                        </div>
                    </div>
                </form>
            </div>
        );
        else {
            this.setState({redirect: false});
            return (<Redirect to='/step2' />);
        }
    };
}

function mapStateToProps(state) {
    return {
        name: state.setNameReducer.name,
        age: state.setAgeReducer.age,
        resp: state.setRespReducer.resp
    };
}

const mapDispatchToProps = {
    setAge,
    setName,
    setItems
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderStep1);
