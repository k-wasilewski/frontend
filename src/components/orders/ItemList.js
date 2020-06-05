import React, {Component} from 'react';
import '../../css/App.css';
import {connect} from "react-redux";
import {setItems} from "../../redux/actions";
import InListVisualization from "../visualization/InListVisualization";
import TranslateFunction from "../../TranslateFunction";

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

    translateItems = (items) => {
        let n = [[]];
        items.forEach((o) => {
            let nn = [];
            nn[0] = o[0];
            if (o[1]==='blue') nn[1] = 'Niebieski';
            else if (o[1]==='lightblue') nn[1] = 'Błękitny';
            else if (o[1]==='darkblue') nn[1] = 'Granatowy';
            else nn[1] = 'brak';

            if (o[2]==='s') nn[2] = 'S';
            else if (o[2]==='m') nn[2] = 'M';
            else if (o[2]==='l') nn[2] = 'L';
            else if (o[2]==='xl') nn[2] = 'XL';
            else nn[2] = 'brak';

            n.push(nn);
        });
        return n;
    };

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
        TranslateFunction(items);
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
