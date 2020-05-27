import React, {Component} from 'react';
import '../../css/App.css';
import axios from "axios";

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ''
        };

        this.doGetList = this.doGetList.bind(this);
    }

    doGetList() {
        let axiosConfig = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };

        axios.get('http://localhost:8081/list',
            axiosConfig
        ).then(resp => {
            this.setState({list: resp.data})
        }).catch(error => {
            this.setState({list:('Błąd serwera')})
        });
    }

    render() {
        return (
            <div className="main">
                <div className='form'>
                    <h2>Podsumowanie</h2>
                    <div className='col1'>
                        <p>{this.state.list}</p>
                        <button onClick={this.doGetList}>Szukaj</button>
                    </div>
                    <div className='col2'>
                        <p>...</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Summary;
