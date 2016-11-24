import React from 'react';
import NavBar from './navBar/index';
require('./App.css');

export default class App extends React.Component {
  render() {
    return (
        <div>
            {this.props.children}
            <NavBar className="fixed-bottom"/>
        </div>
    );
  }
}