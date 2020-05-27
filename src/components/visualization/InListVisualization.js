import React, {Component} from 'react';
import '../../css/App.css';
import {connect} from "react-redux";
import {setItems} from "../../redux/actions";

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 0,
            color: ''
        };
    }

    renderVisualization = () => {
        let size = this.props.size
        let color = this.props.color

        let width
        let height
        let col
        let visibility = 'visible'

        if (size==='S') {
            width = '25px'
            height = '25px'
        } else if (size==='M') {
            width = '50px'
            height = '50px'
        } else if (size==='L') {
            width = '75px'
            height = '75px'
        } else if (size==='XL') {
            width = '100px'
            height = '100px'
        } else visibility = 'hidden'

        if (color==='Błękitny') {
            col = 'lightblue'
        } else if (color==='Granatowy') {
            col = 'darkblue'
        } else if (color==='Niebieski') {
            col = 'blue'
        } else visibility = 'hidden'

        return (
            <div style={{width: width, height: height, backgroundColor: col, visibility: visibility}}>
                &nbsp;
            </div>
        )
    }

    render() {
        let viz = this.renderVisualization()

        return (
            <div>
                {viz}
            </div>
        );
    }
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
