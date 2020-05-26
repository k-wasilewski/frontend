import React, {Component} from 'react';
import '../../css/App.css';
import { connect } from 'react-redux';
import { setAge, setName } from "../../redux/actions";
import  { Redirect } from 'react-router-dom'

class NewOrderStep1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            redirect: false
        };

        this.nameOnChange = this.nameOnChange.bind(this);
        this.ageOnChange = this.ageOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        var age = (this.state.age);
        this.props.setAge(age)
        var name = (this.state.name);
        this.props.setName(name)

        this.setState({redirect: true})
        if (event!==undefined) event.preventDefault();
    }

    nameOnChange = (event) => {
        this.setState({name: event.target.value});
    }

    ageOnChange = (event) => {
        this.setState({age: event.target.value});
    }

    render() {
        if (!this.state.redirect) return (
            <div className="main">
                <form onSubmit={this.handleSubmit}>
                    <div className='form'>
                        <h2>Nowe zamówienie</h2>
                        <div className='col1'>
                            <p>Imię:</p>
                            <p>Wiek:</p>
                            <button>Dalej</button>
                        </div>
                        <div className='col2'>
                            <p><input type='text' name='name' value= {this.state.name}
                                      onChange={this.nameOnChange}/></p>
                            <p><input type='number' name='age' onChange={this.ageOnChange}
                                      value= {this.state.age}/></p>
                        </div>
                    </div>
                </form>
            </div>
        );
        else {
            this.setState({redirect: false})
            return <Redirect to='/step2'  />
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
    setAge,
    setName
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderStep1);
