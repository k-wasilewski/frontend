import React, {Component} from 'react';
import '../../css/App.css';
import OrderList from "./OrderList";
import NewOrderStep2 from "./NewOrderStep2";

class Orders extends Component {

    render() {
        return (
            <div>
                <NewOrderStep2 />
                <OrderList />
            </div>
        );
    }
}

export default Orders;
