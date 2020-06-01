import React, {Component} from 'react';
import '../../css/App.css';
import ItemList from "./ItemList";
import NewOrderStep2 from "./NewOrderStep2";

class Orders extends Component {

    render() {
        return (
            <div>
                <NewOrderStep2 />
                <ItemList />
            </div>
        );
    };
}

export default Orders;
