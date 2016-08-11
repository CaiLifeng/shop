import React from 'react';
import Product from './Product';
import axios from 'axios';
import config from '../../config.js'

export default class Products extends React.Component {

    render() {
        const {productList,...others} = this.props;

        var productsList = productList.map(function (item, idx) {
            return (
                <Product imgSrc={item.images[0]} key={idx} id={item._id} title={item.title}
                         digest={item.description}></Product>
            );
        });

        return (
            <div className="m-t-0 products">
                {productsList}
                <a className="text-center more-link" href="javascript:void(0);">查看更多</a>
            </div>
        );
    }
}
