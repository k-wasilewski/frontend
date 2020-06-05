import React, {Component} from 'react';
import '../../css/App.css';
import axios from "axios";

export class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: '',
        };

        this.doGetList = this.doGetList.bind(this);
    };

    doGetList() {
        let axiosConfig = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };

        axios.get('http://localhost:8081/list',
            axiosConfig
        ).then(resp => {
            this.setState({list: resp.data});
        }).catch(error => {
            this.setState({list:('Błąd serwera')});
        });
    }

    formatItems = (items) => {
        let itemsTransformed = [];

        items.forEach(function(item) {
            let color = JSON.stringify(item.color)
            let size = JSON.stringify(item.size)
            alert(color+','+size)

            if (color==='blue') color='Niebieski';
            else if (color==='darkblue') color='Granatowy';
            else if (color==='lightblue') color='Błękitny';

            size = size.toUpperCase();

            itemsTransformed.push(
                <li key={itemsTransformed.length}>
                    Kolor: {color}<br/>
                    Rozmiar: {size}<br/>
                </li>
            );
        })

        return itemsTransformed
    };

    formatList = (list) => {
        let transformedList = [];

        for (let i=0; i<list.length; i++) {
            let name = JSON.stringify(list[i].name);
            let age = JSON.stringify(list[i].age);
            let created = JSON.stringify(list[i].created);

            let items = list[i].items;
            let itemsTransformed = this.formatItems(items);

            let key = name+age+created;
            transformedList.push((
                <ul key={key}>
                    <li id='itemList'>
                        Imię: {name}<br/>
                        Wiek: {age}<br/>
                        <button className='showElems' onClick={this.showOrderList}>Elementy</button> <br/>
                        <div className='orderItems hidden'>
                            <ol start='1'>{itemsTransformed}</ol><br/>
                        </div>
                        Data utworzenia: {created}
                    </li>
                </ul>
            ));
        }

        return transformedList;
    };

    showOrderList = (event) => {
        let $this = event.target;
        let list = $this.parentElement.getElementsByClassName('orderItems')[0];
        list.classList.toggle('hidden');
    };

    render() {
        let list = this.state.list;
        list = this.formatList(list);

        return (
            <div className="main">
                <div className='summary'>
                    <h2>Podsumowanie</h2>
                    <div className='col1'>
                        <p>{list}</p>
                    </div>
                    <div className='col2'>
                        <button id='showElems' onClick={this.doGetList}>Szukaj</button>
                    </div>
                </div>
            </div>
        );
    };
}

export default Summary;
