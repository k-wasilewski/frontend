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
            items.forEach(function (o) {
                n.push(
                    <li key={o[0]}>
                        Kolor: {o[1]}<br/>
                        Rozmiar: {o[2]}<br/>
                        <InListVisualization key={o[0]} size={o[2]} color={o[1]}/>
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
                <ol key='2' start='1'>
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
