import React, {Component} from 'react';
import '../../css/App.css';
import {connect} from "react-redux";

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.order !== this.props.order) {
            var orderAdded = this.state.orders
            orderAdded.push(nextProps.order);
            this.setState({ orders: orderAdded })
        }
        console.log(this.state.orders)
    }

    translateOrders = (orders) => {
        let n = [[]]
        orders.forEach((o) => {
            let nn = []
            if (o[3]==='blue') nn[3] = 'Niebieski'
            else if (o[3]==='lightblue') nn[3] = 'Błękitny'
            else if (o[3]==='darkblue') nn[3] = 'Granatowy'
            else nn[3] = 'brak'

            if (o[4]==='s') nn[4] = 'S'
            else if (o[4]==='m') nn[4] = 'M'
            else if (o[4]==='l') nn[4] = 'L'
            else if (o[4]==='xl') nn[4] = 'XL'
            else nn[4] = 'brak'

            n.push(nn)
        })
        return n
    }

    mapOrders = (orders) => {
        console.log(orders.length)
        if (orders.length!==1) {
            let n = []
            orders.forEach(function (o) {
                if (orders.indexOf(o)!==0) n.push(<li key={o[0]}>
                    Kolor: {o[3]}<br/>
                    Rozmiar: {o[4]}<br/>
                </li>)
            })

            return n
        } else return undefined
    }

    render() {
        const orders = this.state.orders
        const translatedOrders = this.translateOrders(orders)
        const mappedOrders = this.mapOrders(translatedOrders)

        return (
            <div className="main">
                <h3>Lista zamówień</h3>
                <ol start='1'>
                    {mappedOrders}
                </ol>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        order: state.newOrderReducer.order
    };
}

export default connect(mapStateToProps)(OrderList);
