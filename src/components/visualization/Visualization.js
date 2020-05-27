import React, {Component} from 'react';
import '../../css/App.css';
import {connect} from "react-redux";
import {setItems} from "../../redux/actions";

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: '',
            color: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.size!=='' && nextProps.color!=='') {
            document.getElementById('visualization').style.display = 'block'
        }

        if (nextProps.size !== this.props.size) {
            if (nextProps.size==='s' || nextProps.size==='S') {
                document.getElementById('visualization').style.width = '25px'
                document.getElementById('visualization').style.height = '25px'
            } else if (nextProps.size==='m' || nextProps.size==='M') {
                document.getElementById('visualization').style.width = '50px'
                document.getElementById('visualization').style.height = '50px'
            } else if (nextProps.size==='l' || nextProps.size==='L') {
                document.getElementById('visualization').style.width = '75px'
                document.getElementById('visualization').style.height = '75px'
            } else if (nextProps.size==='xl' || nextProps.size==='XL') {
                document.getElementById('visualization').style.width = '100px'
                document.getElementById('visualization').style.height = '100px'
            } else document.getElementById('visualization').style.display
                = 'none'
        }
        if (nextProps.color !== this.props.color) {
            if (nextProps.color==='lightblue' || nextProps.color==='Błękitny') {
                document.getElementById('visualization').style.backgroundColor
                    = 'lightblue'
            } else if (nextProps.color==='darkblue' || nextProps.color==='Granatowy') {
                document.getElementById('visualization').style.backgroundColor
                    = 'darkblue'
            } else if (nextProps.color==='blue' || nextProps.color==='Niebieski') {
                document.getElementById('visualization').style.backgroundColor
                    = 'blue'
            } else {
                document.getElementById('visualization').style.display
                    = 'none'
            }
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
