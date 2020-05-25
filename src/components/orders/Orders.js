import React, {Component} from 'react';
import '../../css/App.css';
import NewOrder from "./NewOrder";
import OrderList from "./OrderList";

class Orders extends Component {

    render() {
        return (
            <div>
                <NewOrder />
                <OrderList />
            </div>
        );
    }
}

export default Orders;
