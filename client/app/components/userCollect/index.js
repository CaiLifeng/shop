/**
 * Created by clf on 2016/8/29.
 */
import Product from '../productItem';
import React from 'react';
import axiosIns from '../../utils.js';
import config from '../../config.js';

export default class UserCollect extends React.Component {
    state = {
        productList: []
    };

    componentWillMount() {
        this.getProducts({pageIndex: 0});
    }

    getProducts({pageIndex=0}) {
        const that = this;
        let url = config.apiUrl.userCollect + '?userId=' + JSON.parse(localStorage.getItem('user'))._id;
        axiosIns.get(url).then(function (data) {
            if (data.resultCode == 1) {
                that.setState({
                    productList: data.data
                });
            }
            else {
                console.log(data.resultMsg);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="content p-b-50">
                {
                    this.state.productList.map(function (item, idx) {
                        return (
                            <Product imgSrc={item.images[0]} key={idx} id={item._id} price={item.price}
                                     category={item.category} title={item.title}
                                     createTime={item.createTime}></Product>
                        );
                    })
                }
            </div>
        );
    }
}