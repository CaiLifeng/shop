import React from 'react';
import { Router, Route, Link } from 'react-router';
import config from '../../config.js';

export default class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <h1 className="inline">{config.title}</h1>
            </div>
        );
    }
}
