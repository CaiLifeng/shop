/**
 * Created by clf on 2016/8/26.
 */
import React from 'react';
import './index.less';
import photo from '../../../images/photo.jpg';
export default class Banner extends React.Component {
    static propTypes = {
        image: React.PropTypes.string,
        name: React.PropTypes.string
    };

    static defaultProps = {
        image: photo,
        name: ''
    };

    render() {
        return (
            <div className="banner">
                <img src={this.props.image} className="avatar"/>
                <p className="text-white">{this.props.name}</p>
            </div>
        );
    }
}