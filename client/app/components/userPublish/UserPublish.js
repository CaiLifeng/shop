/**
 * Created by clf on 2016/8/29.
 */
import Products from '../home/Products';
import React from 'react';
import axiosIns from '../../utils.js';
import config from '../../config.js';

export default class UserPublish extends React.Component {
    state = {
        productList: [],
        isMore: true
    };

    componentWillMount() {
        this.getProducts({pageIndex: 0});
    }

    getProducts({pageIndex=0,pageSize=10}) {
        const that = this;
        let url = config.apiUrl.userPublish+'?userId='+JSON.parse(localStorage.getItem('user'))._id;
        axiosIns.get(url).then(function (data) {
            if (data.resultCode == 1) {
                if (data.pageCount === pageIndex + 1) {
                    that.setState({isMore: false});
                }
                that.setState({
                    productList: that.state.productList.concat(data.data)
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
            <div className="content">
                <Products className="p-b-50" data={this.state.productList} isMore={this.state.isMore}
                          onMoreClick={this.getProducts.bind(this)}/>
            </div>
        );
    }
}