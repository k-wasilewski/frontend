import React, {Component} from 'react';
import '../css/App.css';
import {NavLink} from "react-router-dom";
import img from '../img/menu-btn.svg'

class Menu extends Component {
    constructor(props) {
        super(props)

        this.menuRef = React.createRef()
    }

    toggleMenuVisibility = () => {
        this.menuRef.current.classList.toggle('hidden')
    }

    render() {
        return (
            <header>
                <div className="menu hidden" ref={this.menuRef}>
                    <nav>
                        <NavLink exact to={`/`} className="menu-item">
                            <button className='menu-item'>
                                <div className='menu-item-div'>Nowe zamówienie</div>
                            </button>
                        </NavLink>
                        <NavLink to={`/summary`} className="menu-item">
                            <button className='menu-item'>
                                <div className='menu-item-div'>Podsumowanie</div>
                            </button>
                        </NavLink>
                    </nav>
                </div>
                <img id='menu-btn' alt='menu button' onClick={this.toggleMenuVisibility} src={img} />
            </header>
        );
    }
}

export default Menu;
