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
            this.visualizationRef.current.classList.add('visible');
            this.visualizationRef.current.classList.remove('hidden');
        };
    };

    paintVisualizationSize = (nextProps) => {
        if (nextProps.size !== this.props.size) {
            if (nextProps.size==='s' || nextProps.size==='S') {
                this.visualizationRef.current.classList.add('small');
                this.visualizationRef.current.classList.remove('medium');
                this.visualizationRef.current.classList.remove('large');
                this.visualizationRef.current.classList.remove('extralarge');
            } else if (nextProps.size==='m' || nextProps.size==='M') {
                this.visualizationRef.current.classList.remove('small');
                this.visualizationRef.current.classList.add('medium');
                this.visualizationRef.current.classList.remove('large');
                this.visualizationRef.current.classList.remove('extralarge');
            } else if (nextProps.size==='l' || nextProps.size==='L') {
                this.visualizationRef.current.classList.remove('small');
                this.visualizationRef.current.classList.remove('medium');
                this.visualizationRef.current.classList.add('large');
                this.visualizationRef.current.classList.remove('extralarge');
            } else if (nextProps.size==='xl' || nextProps.size==='XL') {
                this.visualizationRef.current.classList.remove('small');
                this.visualizationRef.current.classList.remove('medium');
                this.visualizationRef.current.classList.remove('large');
                this.visualizationRef.current.classList.add('extralarge');
            } else {
                this.visualizationRef.current.classList.remove('visible');
                this.visualizationRef.current.classList.add('hidden');
            }
        }
    };

    paintVisualizationColor = (nextProps) => {
        if (nextProps.color !== this.props.color) {
            if (nextProps.color==='lightblue' || nextProps.color==='Błękitny') {
                this.visualizationRef.current.classList.remove('blue');
                this.visualizationRef.current.classList.add('lightblue');
                this.visualizationRef.current.classList.remove('darkblue');
            } else if (nextProps.color==='darkblue' || nextProps.color==='Granatowy') {
                this.visualizationRef.current.classList.remove('blue');
                this.visualizationRef.current.classList.remove('lightblue');
                this.visualizationRef.current.classList.add('darkblue');
            } else if (nextProps.color==='blue' || nextProps.color==='Niebieski') {
                this.visualizationRef.current.classList.add('blue');
                this.visualizationRef.current.classList.remove('lightblue');
                this.visualizationRef.current.classList.remove('darkblue');
            } else {
                this.visualizationRef.current.classList.remove('visible');
                this.visualizationRef.current.classList.add('hidden');
            }
        }
    };

    render() {
        return (
            <div className='hidden' ref={this.visualizationRef}>
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
