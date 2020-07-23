import React, {Component} from 'react';
import '../../css/App.css';
import {connect} from "react-redux";
import {setUsername} from "../../redux/actions";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.errorRef = React.createRef('');
    };

    handleSubmit = (e) => {
        e.preventDefault();
        alert(this.state.username+', '+this.state.password)
        this.props.setUsername(this.state.username);
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
        let error;

        return (
            <div className="main">
                <form onSubmit={this.handleSubmit}>
                    <div className='form'>
                        <h2>Logowanie</h2>
                        <p className='hidden invalid' ref={this.errorRef}>{error}</p>
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

const mapDispatchToProps = {
    setUsername
};

export default connect(null, mapDispatchToProps)(Login);
