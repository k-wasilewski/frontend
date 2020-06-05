import React, {Component} from 'react';
import '../../css/App.css';
import {connect} from "react-redux";
import {setItems} from "../../redux/actions";

export class InListVisualization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 0,
            color: ''
        };

        this.visualizationRef = React.createRef();
    };

    componentDidMount() {
        this.visualizationRef.current = this.renderVisualization()
    }

    setSize = (size) => {
        if (size==='s' || size==='S') {
            this.visualizationRef.current.classList.add('small');
            this.visualizationRef.current.classList.remove('medium');
            this.visualizationRef.current.classList.remove('large');
            this.visualizationRef.current.classList.remove('extralarge');
        } else if (size==='m' || size==='M') {
            this.visualizationRef.current.classList.remove('small');
            this.visualizationRef.current.classList.add('medium');
            this.visualizationRef.current.classList.remove('large');
            this.visualizationRef.current.classList.remove('extralarge');
        } else if (size==='l' || size==='L') {
            this.visualizationRef.current.classList.remove('small');
            this.visualizationRef.current.classList.remove('medium');
            this.visualizationRef.current.classList.add('large');
            this.visualizationRef.current.classList.remove('extralarge');
        } else if (size==='xl' || size==='XL') {
            this.visualizationRef.current.classList.remove('small');
            this.visualizationRef.current.classList.remove('medium');
            this.visualizationRef.current.classList.remove('large');
            this.visualizationRef.current.classList.add('extralarge');
        }
    };

    setVisibility = (size, color) => {
        if (size!=='S' && size!=='M' && size!=='L' && size!=='XL') {
            this.visualizationRef.current.classList.remove('visible');
            this.visualizationRef.current.classList.add('hidden');
        }
        if (color!=='Błękitny' && color!=='Niebieski' && color!=='Granatowy') {
            this.visualizationRef.current.classList.remove('visible');
            this.visualizationRef.current.classList.add('hidden');
        }
    }

    setCol = (color) => {
        if (color==='lightblue' || color==='Błękitny') {
            this.visualizationRef.current.classList.remove('blue');
            this.visualizationRef.current.classList.add('lightblue');
            this.visualizationRef.current.classList.remove('darkblue');
        } else if (color==='darkblue' || color==='Granatowy') {
            this.visualizationRef.current.classList.remove('blue');
            this.visualizationRef.current.classList.remove('lightblue');
            this.visualizationRef.current.classList.add('darkblue');
        } else if (color==='blue' || color==='Niebieski') {
            this.visualizationRef.current.classList.add('blue');
            this.visualizationRef.current.classList.remove('lightblue');
            this.visualizationRef.current.classList.remove('darkblue');
        }
    }

    renderVisualization = () => {
        let size = this.props.size;
        let color = this.props.color;

        this.setVisibility(size, color);
        this.setSize(size);
        this.setCol(color);

        return (
            <React.Fragment>
                &nbsp;
            </React.Fragment>
        );
    };

    render() {
        return (
            <div ref={this.visualizationRef} className='visible' />
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

export default connect(mapStateToProps, mapDispatchToProps)(InListVisualization);
