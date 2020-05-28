import React, {Component} from 'react';
import './css/App.css';
import Router from "./Router";
import './css/App.css';
import Menu from './components/Menu'

class App extends Component {
  render() {
    return (
        <div className="App">
            <Menu />
            <Router />
        </div>
    );
  }
}

export default App;
