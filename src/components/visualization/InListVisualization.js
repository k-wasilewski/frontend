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

    setWidth = (size) => {
        let width

        if (size==='S') {
            width = '25px'
        } else if (size==='M') {
            width = '50px'
        } else if (size==='L') {
            width = '75px'
        } else if (size==='XL') {
            width = '100px'
        }

        return width
    }

    setHeight = (size) => {
        let height

        if (size==='S') {
            height = '25px'
        } else if (size==='M') {
            height = '50px'
        } else if (size==='L') {
            height = '75px'
        } else if (size==='XL') {
            height = '100px'
        }

        return height
    }

    setVisibility = (size, color) => {
        let visibility = 'visible'

        if (size!=='S' && size!=='M' && size!=='L' && size!=='XL') {
            visibility = 'hidden'
        }
        if (color!=='Błękitny' && color!=='Niebieski' && color!=='Granatowy') {
            visibility = 'hidden'
        }

        return visibility
    }

    setCol = (color) => {
        let col

        if (color==='Błękitny') {
            col = 'lightblue'
        } else if (color==='Granatowy') {
            col = 'darkblue'
        } else if (color==='Niebieski') {
            col = 'blue'
        }

        return col
    }

    renderVisualization = () => {
        let size = this.props.size
        let color = this.props.color

        let visibility = this.setVisibility(size, color)
        let width = this.setWidth(size)
        let height = this.setHeight(size)
        let col = this.setCol(color)

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
