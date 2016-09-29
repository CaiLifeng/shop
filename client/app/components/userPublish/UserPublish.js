/**
 * Created by clf on 2016/8/29.
 */
import Product from './Product.jsx';
import React from 'react';
import axiosIns from '../../utils.js';
import config from '../../config.js';
import {Toast,Dialog} from 'react-weui';
const {Alert, Confirm} = Dialog;

export default class UserPublish extends React.Component {
    state = {
        productList: [],
        showAlert: false,
        showConfirm: false,
        deleteProductId: '',
        confirm: {
            title: '标题标题',
            buttons: [
                {
                    type: 'default',
                    label: '取消',
                    onClick: this.hideConfirm.bind(this)
                },
                {
                    type: 'primary',
                    label: '确定',
                    onClick: this.deleteProduct.bind(this)
                }
            ]
        }
    };

    deleteProduct() {
        const that = this;
        axiosIns.post(config.apiUrl.delete, {
            productId: this.state.deleteProductId
        }).then(function (data) {
            if (data.resultCode == 1) {
                that.setState({showToast: true, toastText: '删除成功', isCollect: 1});
                setTimeout(function () {
                    that.setState({showToast: false, toastText: ''});
                }, 1000);
            }
            else {
                that.setState({showToast: true, toastText: data.resultMsg});
                setTimeout(function () {
                    that.setState({showToast: false, toastText: ''});
                }, 1000);
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    hideConfirm() {
        this.setState({showConfirm: false});
    }

    componentWillMount() {
        this.getProducts({pageIndex: 0});
    }

    getProducts({pageIndex=0}) {
        const that = this;
        let url = config.apiUrl.userPublish + '?userId=' + JSON.parse(localStorage.getItem('user'))._id;
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

    handleDelCallBack(id,event) {
        console.log(event);
        alert(id);
        this.setState({showConfirm: true, deleteProductId: id});
    }

    render() {
        let that = this;
        return (
            <div className="content b-50">
                {
                    this.state.productList.map(function (item, idx) {
                        return (
                            <Product delCallBack={that.handleDelCallBack.bind(that)} imgSrc={item.images[0]} key={idx}
                                     id={item._id} price={item.price}
                                     category={item.category} title={item.title}
                                     createTime={item.createTime}></Product>
                        );
                    })
                }
                <Confirm
                    show={this.state.showConfirm}
                    title={this.state.confirm.title}
                    buttons={this.state.confirm.buttons}>
                    确定要删除？
                </Confirm>
            </div>
        );
    }
}