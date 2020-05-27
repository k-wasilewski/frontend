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

    componentWillReceiveProps(nextProps) {
        if (nextProps.size !== this.props.size) {
            if (nextProps.size==='s') {
                document.getElementById('visualization').style.width = '25px'
                document.getElementById('visualization').style.height = '25px'
            } else if (nextProps.size==='m') {
                document.getElementById('visualization').style.width = '50px'
                document.getElementById('visualization').style.height = '50px'
            } else if (nextProps.size==='l') {
                document.getElementById('visualization').style.width = '75px'
                document.getElementById('visualization').style.height = '75px'
            } else if (nextProps.size==='xl') {
                document.getElementById('visualization').style.width = '100px'
                document.getElementById('visualization').style.height = '100px'
            } else document.getElementById('visualization').style.visibility
                = 'hidden'
        }
        if (nextProps.color !== this.props.color) {
            if (nextProps.color==='lightblue') {
                document.getElementById('visualization').style.backgroundColor
                    = 'lightblue'
            } else if (nextProps.color==='darkblue') {
                document.getElementById('visualization').style.backgroundColor
                    = 'darkblue'
            } else if (nextProps.color==='blue') {
                document.getElementById('visualization').style.backgroundColor
                    = 'blue'
            } else document.getElementById('visualization').style.visibility
                     = 'hidden'
        }
    }

    render() {

        return (
            <div id='visualization'>
                &nbsp;
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
