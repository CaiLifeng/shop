import React from 'react';
import WeUI from 'react-weui';
import NavBar from './NavBar';
require('./App.css');

const {SearchBar} = WeUI;

export default class App extends React.Component {
  render() {
    return (
        <div>
            {this.props.children}
            <NavBar/>
        </div>
    );
  }
}

