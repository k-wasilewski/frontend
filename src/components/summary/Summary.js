import React, {Component} from 'react';
import '../../css/App.css';
import axios from "axios";
import TranslateItems from "../../func/TranslateItems";

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

        TranslateItems(items)
        items.forEach(function(item) {
            itemsTransformed.push(
                <li key={itemsTransformed.length}>
                    Kolor: {item.color}<br/>
                    Rozmiar: {item.size}<br/>
                </li>
            );
        })

        return itemsTransformed
    };

    formatList = (list) => {
        let transformedList = [];

        for (let i=0; i<list.length; i++) {
            let name = list[i].name;
            let age = list[i].age;
            let created = list[i].created;

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
