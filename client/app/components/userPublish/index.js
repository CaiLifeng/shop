import PublishProduct from './publishProductItem';
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
        showToast:false,
        toastText:'',
        confirm: {
            title: '',
            buttons: [

                {
                    type: 'primary',
                    label: '确定',
                    onClick: this.deleteProduct.bind(this)
                },
                {
                    type: 'default',
                    label: '取消',
                    onClick: this.hideConfirm.bind(this)
                }
            ]
        }
    };

    //删除
    deleteProduct() {
        const that = this;
        axiosIns.post(config.apiUrl.delete, {
            productId: this.state.deleteProductId
        }).then(function (data) {
            if (data.resultCode == 1) {
                that.hideConfirm();
                that.getProducts({pageIndex: 0});
            }
            else {
                that.setState({showToast: true, toastText: data.resultMsg});
                setTimeout(function () {
                    that.setState({showToast: false, toastText: ''});
                }, 1000);
                that.hideConfirm.bind(this);
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

    handleDelCallBack(id) {
        this.setState({showConfirm: true, deleteProductId: id});
    }

    render() {
        let that = this;
        return (
            <div className="content b-50">
                {
                    this.state.productList.map(function (item, idx) {
                        return (
                            <PublishProduct delCallBack={that.handleDelCallBack.bind(that)} imgSrc={item.images[0]} key={idx}
                                     id={item._id} price={item.price}
                                     category={item.category} title={item.title}
                                     createTime={item.createTime}/>
                        );
                    })
                }
                <Confirm
                    show={this.state.showConfirm}
                    title={this.state.confirm.title}
                    buttons={this.state.confirm.buttons}>
                    确定要删除？
                </Confirm>
                <Toast show={this.state.showToast}>
                    {this.state.toastText}
                </Toast>
            </div>
        );
    }
}