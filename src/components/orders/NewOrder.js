import React, {Component} from 'react';
import '../../css/App.css';

class NewOrder extends Component {

    render() {
        return (
            <div className="main">
                <form onSubmit={this.handleSubmit}>
                    <div className='form'>
                        <h2>Nowe zamówienie</h2>
                        <div className='col1'>
                            <p>Imię:</p>
                            <p>Wiek:</p>
                            <p><label htmlFor='color'>Kolor:</label></p>
                            <p>Rozmiar:</p>
                        </div>
                        <div className='col2'>
                            <p><input type='text' name='name'/></p>
                            <p><input type='number' name='age'/></p>
                                <p><select name='color' id='color'>
                                    <option disabled selected>(wybierz)</option>
                                    <option value='blue'>Niebieski</option>
                                    <option value='lightblue'>Błękitny</option>
                                    <option value='darkblue'>Granatowy</option>
                            </select></p>
                            <input type="radio" id="s" name="size" value="s"/>
                            <label htmlFor="male">S</label><br/>
                            <input type="radio" id="m" name="size" value="m"/>
                            <label htmlFor="female">M</label><br/>
                            <input type="radio" id="l" name="size" value="l"/>
                            <label htmlFor="other">L</label><br/>
                            <input type="radio" id="xl" name="size" value="xl"/>
                            <label htmlFor="other">XL</label>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewOrder;
