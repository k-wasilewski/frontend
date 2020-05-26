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
    }

    translateOrders = (orders) => {
        orders.map((o) => {
            if (o[3]==='blue') o[3] = 'Niebieski'
            else if (o[3]==='lightblue') o[3] = 'Błękitny'
            else if (o[3]==='darkblue') o[3] = 'Granatowy'

            if (o[4]==='s') o[4] = 'S'
            else if (o[4]==='m') o[4] = 'M'
            else if (o[4]==='l') o[4] = 'L'
            else if (o[4]==='xl') o[4] = 'XL'
        })
        return orders
    }

    render() {
        const orders = this.state.orders
        const individualOrders = this.translateOrders(orders).map((o) => <li key={o[0]}>
            Kolor: {o[3]}<br/>
            Rozmiar: {o[4]}
        </li>);

        return (
            <div className="main">
                <h3>Lista zamówień</h3>
                <ol start='1'>
                    {individualOrders}
                </ol>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        order: state.newOrderReducer.order,
    };
}

export default connect(mapStateToProps)(OrderList);
