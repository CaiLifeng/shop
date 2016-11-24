import React from 'react';
import { Router, Route, Link } from 'react-router';
import config from '../../../config.js';
import './index.less'

export default class Header extends React.Component {
    static propTypes = {
        city:React.PropTypes.string
    };

    static defaultProps = {
        city:''
    };

    render() {
        return (
            <div className="header">
                <h1 className="inline text-white">{config.title}</h1>
                <Link className="position link" to='ChooseProvince'>
                    <i className="text-white fa fa-2 fa-map-marker" aria-hidden="true"></i>
                    <span className="city">{this.props.city}</span>
                </Link>
            </div>
        );
    }
}
