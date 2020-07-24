import React, {Component} from 'react';
import '../css/App.css';
import {NavLink} from "react-router-dom";
import img from '../img/menu-btn.svg'
import {connect} from "react-redux";
import {setUsername} from "../redux/actions";

export class Menu extends Component {
    constructor(props) {
        super(props);

        this.menuRef = React.createRef();

        this.toggleMenuVisibility = this.toggleMenuVisibility.bind(this);
        this.logout = this.logout.bind(this);
    };

    toggleMenuVisibility() {
        this.menuRef.current.classList.toggle('hidden');
    };

    logout() {
        localStorage.removeItem('token');
        this.props.setUsername(null);
    }

    render() {
        return (
            <header>
                <div id="user">
                    {this.props.username}<br/>
                    {(this.props.username) ? <button onClick={this.logout}>Wyloguj</button> : null}
                </div>
                <div className="menu hidden" ref={this.menuRef}>
                    <nav>
                        <NavLink exact to={`/`} className="menu-item">
                            <button className='menu-item'>
                                <div className='menu-item-div'>Nowe zamówienie</div>
                            </button>
                        </NavLink>
                        {this.props.username ? (
                            <NavLink to={`/summary`} className="menu-item">
                                <button className='menu-item'>
                                    <div className='menu-item-div'>Podsumowanie</div>
                                </button>
                            </NavLink>
                        ) : (
                            <NavLink to={`/login`} className="menu-item">
                                <button className='menu-item'>
                                    <div className='menu-item-div'>Logowanie</div>
                                </button>
                            </NavLink>
                        )}
                    </nav>
                </div>
                <img id='menu-btn' alt='menu button' onClick={this.toggleMenuVisibility} src={img} />
            </header>
        );
    };
}

function mapStateToProps(state) {
    return {
        username: state.setUsernameReducer.username
    };
}

const mapDispatchToProps = {
    setUsername
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
