import React from 'react';
import config from '../../config.js';
import axiosIns from '../../utils.js';
import {Toast} from 'react-weui';
export default class Contact extends React.Component {
    state = {
        showToast: false,
        toastText: null,
        isCollect:0
    };

    static propTypes = {
        isCollect: React.PropTypes.number,
        productId: React.PropTypes.string,
        name: React.PropTypes.string,
        telephone: React.PropTypes.string,
        image: React.PropTypes.string
    };

    static defaultProps = {
        isCollect: 0,
        productId: '',
        name: '',
        telephone: '',
        image: ''
    };

    componentWillReceiveProps(nextProps){
        this.setState({isCollect:nextProps.isCollect});
    }

    collect() {
        let that = this;
        if (this.state.isCollect == 0) {
            axiosIns.post(config.apiUrl.collect, {
                productId: this.props.productId
            }).then(function (data) {
                if (data.resultCode == 1) {
                    that.setState({showToast: true, toastText: '收藏成功',isCollect:1});
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
        else{
            axiosIns.post(config.apiUrl.unCollect, {
                productId: this.props.productId
            }).then(function (data) {
                if (data.resultCode == 1) {
                    that.setState({showToast: true, toastText: '取消收藏成功',isCollect:0});
                    setTimeout(function () {
                        that.setState({showToast: false, toastText: ''});
                    }, 1000);
                }
                else {
                    console.log(data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    };


    render() {
        console.log(this.state.isCollect);
        return (
            <div className="fixed-bottom contact">
                <div className="per-info">
                    <img className="per-logo" src={this.props.image}/>
                    <span className="per-name">{this.props.name}</span>
                </div>
                {
                    //<div className="tab chat-tab">
                    //    <div className="icon-top">
                    //        <i className="fa fa-weixin" aria-hidden="true"></i>
                    //    </div>
                    //    <div className="tab-font">聊天</div>
                    //</div>
                }


                <a href={"tel:"+this.props.telephone} className="tab contact-tab">
                    <div className="icon-top">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                    </div>
                    <div className="tab-font">联系</div>
                </a>
                {
                    this.state.isCollect == 2 ? '' : (<div className="tab chat-tab" onClick={this.collect.bind(this)}>
                        <div className="icon-top">
                            <i className="fa fa-weixin" aria-hidden="true"></i>
                        </div>
                        <div className="tab-font">{{0: '收藏', 1: '取消收藏'}[this.state.isCollect]}</div>
                    </div>)
                }
                <Toast show={this.state.showToast}>
                    {this.state.toastText}
                </Toast>
            </div>
        );
    }
}