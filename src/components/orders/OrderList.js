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

    render() {
        const orders = this.state.orders
        const individualOrders = orders.map((o) => <li key={o[0]}>
            {o[1]}, {o[2]}, {o[3]}, {o[4]}
        </li>);

        return (
            <div className="main">
                <h3>Lista zamówień</h3>
                <div>
                    {individualOrders}
                </div>
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
