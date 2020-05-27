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

    formatList = (list) => {
        let nameRegex = new RegExp('^\\[(\\w)+')
        let name = nameRegex.exec(list)
        if (name!==null) name=name[0].substr(1)
        console.log('name: '+name)

        let ageRegex = new RegExp('\\d+')
        let age = ageRegex.exec(list)
        console.log('age: '+age)

        let itemRegex = /'\\[(\\w)*, (\\w)*\\]'/g
        let items = list.match(itemRegex)
        console.log('items: '+items)
    }

    render() {
        let list = this.state.list
        list = this.formatList(list)

        return (
            <div className="main">
                <div className='form'>
                    <h2>Podsumowanie</h2>
                    <div className='col1'>
                        <p>{list}</p>
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
