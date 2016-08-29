import React from 'react';
import config from '../../config.js';
import axiosIns from '../../utils.js';
import {Toast} from 'react-weui';
export default class Contact extends React.Component {
    state={
        showToast: false,
        toastText: null
    };

    static propTypes = {
        userId:React.PropTypes.string,
        productId: React.PropTypes.string,
        name: React.PropTypes.string,
        telephone: React.PropTypes.string,
        image:React.PropTypes.string
    };

    static defaultProps = {
        userId:'',
        productId:'',
        name: '',
        telephone: '',
        image:''
    };

    collect(){
        let that=this;
        axiosIns.post(config.apiUrl.collect,{
            userId: this.props.userId,
            productId: this.props.productId
        }).then(function (data) {
            if(data.resultCode==1){
                that.setState({showToast: true, toastText: '收藏成功'});
                setTimeout(function () {
                    that.setState({showToast: false, toastText: ''});
                }, 1000);
            }
            else{
                console.log(data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    unCollect(){
        let that=this;
        axiosIns.post(config.apiUrl.unCollect,{
            userId: this.props.userId,
            productId: this.props.productId
        }).then(function (data) {
            if(data.resultCode==1){
                that.setState({showToast: true, toastText: '取消收藏成功'});
                setTimeout(function () {
                    that.setState({showToast: false, toastText: ''});
                }, 1000);
            }
            else{
                console.log(data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    render() {
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
                <div className="tab chat-tab" onClick={this.collect.bind(this)}>
                    <div className="icon-top">
                        <i className="fa fa-weixin" aria-hidden="true"></i>
                    </div>
                    <div className="tab-font">收藏</div>
                </div>
                <a href={"tel:"+this.props.telephone} className="tab contact-tab">
                    <div className="icon-top">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                    </div>
                    <div className="tab-font">联系</div>
                </a>
                <Toast show={this.state.showToast}>
                    {this.state.toastText}
                </Toast>
            </div>
        );
    }
}