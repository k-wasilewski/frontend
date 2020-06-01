import React, {Component} from 'react';
import '../../css/App.css';
import {connect} from "react-redux";
import {setItems} from "../../redux/actions";

export class Visualization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: '',
            color: ''
        };

        this.visualizationRef = React.createRef();
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.displayVisualization(nextProps);
        this.paintVisualizationSize(nextProps);
        this.paintVisualizationColor(nextProps);
    };

    displayVisualization = (nextProps) => {
        if (nextProps.size!=='' && nextProps.color!=='') {
            this.visualizationRef.current.style.display = 'block';
        };
    };

    paintVisualizationSize = (nextProps) => {
        if (nextProps.size !== this.props.size) {
            if (nextProps.size==='s' || nextProps.size==='S') {
                this.visualizationRef.current.style.width = '25px';
                this.visualizationRef.current.style.height = '25px';
            } else if (nextProps.size==='m' || nextProps.size==='M') {
                this.visualizationRef.current.style.width = '50px';
                this.visualizationRef.current.style.height = '50px';
            } else if (nextProps.size==='l' || nextProps.size==='L') {
                this.visualizationRef.current.style.width = '75px';
                this.visualizationRef.current.style.height = '75px';
            } else if (nextProps.size==='xl' || nextProps.size==='XL') {
                this.visualizationRef.current.style.width = '100px';
                this.visualizationRef.current.style.height = '100px';
            } else document.getElementById('visualization').style.display
                = 'none';
        }
    };

    paintVisualizationColor = (nextProps) => {
        if (nextProps.color !== this.props.color) {
            if (nextProps.color==='lightblue' || nextProps.color==='Błękitny') {
                this.visualizationRef.current.style.backgroundColor
                    = 'lightblue';
            } else if (nextProps.color==='darkblue' || nextProps.color==='Granatowy') {
                this.visualizationRef.current.style.backgroundColor
                    = 'darkblue';
            } else if (nextProps.color==='blue' || nextProps.color==='Niebieski') {
                this.visualizationRef.current.style.backgroundColor
                    = 'blue';
            } else {
                this.visualizationRef.current.style.display
                    = 'none';
            }
        }
    };

    render() {
        return (
            <div id='visualization' ref={this.visualizationRef}>
                &nbsp;
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

export default connect(mapStateToProps, mapDispatchToProps)(Visualization);
