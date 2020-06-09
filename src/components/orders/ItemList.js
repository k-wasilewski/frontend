import React, {Component} from 'react';
import '../../css/App.css';
import {connect} from "react-redux";
import {setItems} from "../../redux/actions";
import InListVisualization from "../visualization/InListVisualization";
import TranslateItems from "../../func/TranslateItems";

export class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.item !== this.props.item) {
            var updatedItems = this.state.items;
            updatedItems.push(nextProps.item);
            this.setState({ items: updatedItems });
            this.props.setItems(updatedItems);
        }
    }

    mapItems = (items) => {
        if (items.length!==0) {
            let n = [];
            items.forEach(function (item) {
                n.push(
                    <li key={item.id}>
                        Kolor: {item.color}<br/>
                        Rozmiar: {item.size}<br/>
                        <InListVisualization key={item.id} size={item.size} color={item.color}/>
                    </li>
                );
            })

            return n;
        } else return undefined;
    };

    render() {
        const items = this.state.items;
        TranslateItems(items);
        const mappedItems = this.mapItems(items);

        return (
            <div className="main">
                <h3>Lista zamówień</h3>
                <ol start='1'>
                    {mappedItems}
                </ol>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        item: state.newItemReducer.item,
        items: state.setItemsReducer.items
    };
}

const mapDispatchToProps = {
    setItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
