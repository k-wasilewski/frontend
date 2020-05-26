import React, {Component} from 'react';
import '../../css/App.css';
import {connect} from "react-redux";
import {setOrders} from "../../redux/actions";

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
            this.props.setOrders(orderAdded)
        }
    }

    translateOrders = (orders) => {
        let n = [[]]
        orders.forEach((o) => {
            let nn = []
            if (o[1]==='blue') nn[1] = 'Niebieski'
            else if (o[1]==='lightblue') nn[1] = 'Błękitny'
            else if (o[1]==='darkblue') nn[1] = 'Granatowy'
            else nn[1] = 'brak'

            if (o[2]==='s') nn[2] = 'S'
            else if (o[2]==='m') nn[2] = 'M'
            else if (o[2]==='l') nn[2] = 'L'
            else if (o[2]==='xl') nn[2] = 'XL'
            else nn[2] = 'brak'

            n.push(nn)
        })
        return n
    }

    mapOrders = (orders) => {
        if (orders.length!==1) {
            let n = []
            orders.forEach(function (o) {
                if (orders.indexOf(o)!==0) n.push(<li key={o[0]}>
                    Kolor: {o[1]}<br/>
                    Rozmiar: {o[2]}<br/>
                </li>)
            })

            return n
        } else return undefined
    }

    render() {
        const orders = this.props.orders
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
        order: state.newOrderReducer.order,
        orders: state.setOrdersReducer.orders
    };
}

const mapDispatchToProps = {
    setOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
