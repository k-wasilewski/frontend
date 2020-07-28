import React, {Component} from 'react';
import '../../css/App.css';
import {connect} from "react-redux";
import {setUsername} from "../../redux/actions";
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',

            error: null
        }

        this.errorRef = React.createRef('');

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(e) {
        e.preventDefault();
        const that = this;

        axios.post('https://localhost:8081/login',
            {'username': this.state.username, 'password': this.state.password}
        ).then(function (response) {
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                that.setState({error: null});
                that.props.setUsername(that.state.username);
            } else {
                that.setState({error: 'Niepoprawna nazwa użytkownika lub hasło'});
            }
        }).catch(() => {
            that.setState({error: 'Niepoprawna nazwa użytkownika lub hasło'});
        });
    }

    usernameOnChange = (event) => {
        const username = event.target.value;
        this.setState({username: username});
    };

    passwordOnChange = (event) => {
        const password = event.target.value;
        this.setState({password: password});
    };

    render() {
        if (this.props.username!=null) return (
            <Redirect to={'/'} />
        );
        else return (
            <div className="main">
                <form onSubmit={this.handleSubmit}>
                    <div className='form'>
                        <h2>Logowanie</h2>
                        <p className='invalid' ref={this.errorRef}>{this.state.error}</p>
                        <div className='col1'>
                            <p>Użytkownik:</p>
                            <p>Hasło:</p>
                            <button>Zatwierdź</button>
                        </div>
                        <div className='col2'>
                            <p><input type='text' name='username' value= {this.state.username}
                                      id='usernameInput' onChange={this.usernameOnChange} /></p>
                            <p><input type='password' name='password' id='passwordInput'
                                      onChange={this.passwordOnChange} value= {this.state.password} /></p>
                        </div>
                    </div>
                </form>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        username: state.setUsernameReducer.username
    };
};

const mapDispatchToProps = {
    setUsername
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
