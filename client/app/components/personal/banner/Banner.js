/**
 * Created by clf on 2016/8/26.
 */
import React from 'react';
import styles from './Bannner.css';
import photo from '../../../images/photo.jpg';
import WeUI from 'react-weui';
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
            <div className={styles.content}>
                <img src={this.props.image} className={styles.avatar}/>
                <p className="text-white">{this.props.name}</p>
            </div>
        );
    }
}