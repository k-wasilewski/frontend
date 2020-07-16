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
        const axiosConfig = {
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
            const name = list[i].name;
            const age = list[i].age;
            const created = list[i].created;

            const items = list[i].items;
            let itemsTransformed;
            if (items!==undefined) itemsTransformed = this.formatItems(items);

            const key = name+age+created;
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

    showOrderList(event) {
        const $this = event.target;
        const list = $this.parentElement.getElementsByClassName('orderItems')[0];
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
                        {list}
                    </div>
                    <div className='col2'>
                        <button onClick={this.doGetList}>Szukaj</button>
                    </div>
                </div>
            </div>
        );
    };
}

export default Summary;
