import React from 'react';
import { Router, Route, Link } from 'react-router';
import config from '../../config.js';

export default class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <h1 className="inline text-white">{config.title}</h1>
                <Link className="position link" to='ChooseCity'>
                    <i className="text-white fa fa-2 fa-map-marker" aria-hidden="true"></i>
                    <span className="city">深圳</span>
                </Link>
            </div>
        );
    }
}
