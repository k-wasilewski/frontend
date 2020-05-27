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
            this.setState({list:('Błąd serwera')})  //TODO
        });
    }

    formatList = (list) => {
        console.log('list: '+list)
        let transformedList = []

        let nameRegex = new RegExp('<(\\w)+', 'g')
        let name = nameRegex.exec(list)
        let ageRegex = new RegExp('\\d+,', 'g')
        let age = ageRegex.exec(list)
        let createdRegex = new RegExp('\\d+,.+?(?=\\:): ', 'g')
        let created = createdRegex.exec(list)
        let createdRegex2 = new RegExp(', (.*):')
        let itemRegex = new RegExp('\\[(\\w)*, (\\w)*\\]', 'g')
        let items = []
        let item = itemRegex.exec(list)

        while (name!==null) {
            name=name[0].substr(1)
            console.log('name: '+name)

            age=age.toString().substr(0, age.toString().length-1)
            console.log('age: '+age)

            created = created[0]
            if (created!==null) created = createdRegex2.exec(created)[1]
            console.log('created: '+created)

            while (item!==null) {
                items.push(item[0])
                item = itemRegex.exec(list)
            }
            console.log(items)

            let itemsTransformed = []
            items.forEach(function(item) {
                let colorRegex = new RegExp('\\[(.*),')
                let color = colorRegex.exec(item)[1]
                let sizeRegex = new RegExp(',(.*)\\]')
                let size = sizeRegex.exec(item)[1]

                if (color==='blue') color='Niebieski'
                else if (color==='darkblue') color='Granatowy'
                else if (color==='lightblue') color='Błękitny'

                size = size.toUpperCase()

                itemsTransformed.push(
                    <li>
                        Kolor: {color}<br/>
                        Rozmiar: {size}<br/>
                    </li>
                )
            })

            transformedList.push((
                <ul key={name+age}>
                    <li>
                        Imię: {name}<br/>
                        Wiek: {age}<br/>
                        Zamówienia: <br/><ol start='1'>{itemsTransformed}</ol><br/>
                        Data utworzenia: {created}
                    </li>
                </ul>
            ))

            name = nameRegex.exec(list)
            age = ageRegex.exec(list)
            created = createdRegex.exec(list)
        }

        return transformedList
    }

    render() {
        let list = this.state.list
        list = this.formatList(list)

        return (
            <div className="main">
                <div className='summary'>
                    <h2>Podsumowanie</h2>
                    <div className='col1'>
                        <p>{list}</p>
                        <button onClick={this.doGetList}>Szukaj</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Summary;
