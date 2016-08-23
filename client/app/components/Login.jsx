import React from 'react';
import {Link,History} from 'react-router';
import classNames from 'classnames';
import {Toast} from 'react-weui';
import axios from 'axios';
import config from '../config.js';
import { hashHistory } from 'react-router';


export default class Login extends React.Component {
    state = {
        telephone: '',
        verifyCodeText: '获取验证码',
        isDisabled: true,
        showConfirm: false,
        confirmText: ''
    };

    telChange() {
        let telephone = this.refs.telephone.value;
        if (telephone.length == 11) {
            this.setState({
                isDisabled: false
            });
        }
        else {
            this.setState({
                isDisabled: true
            });
        }
    }

    submit() {
        hashHistory.push('/information');
        return;
        var that = this;
        if (!this.refs.verifyCode.value) {
            this.setState({
                showConfirm: true,
                confirmText: '请填写验证码'
            });
        }
        else {
            axios.post(config.login, {
                telephone: this.refs.telephone.value,
                verifyCode: this.refs.verifyCode.value
            })
            .then(function (response) {
                console.log(response);
                if (response.data.resultCode == 1) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    if(response.data.user.name){
                        hashHistory.push('/products');
                    }
                    else{
                        hashHistory.push('/information');
                    }
                }
                else {
                    that.setState({
                        showConfirm: true,
                        confirmText: response.data.resultMsg
                    });

                    setTimeout(function () {
                        that.setState({
                            showConfirm: false,
                            confirmText: ''
                        });
                    }.bind(this), 2000);
                }

            })
            .catch(function (error) {
                console.log(error);
            });
        }
        setTimeout(function () {
            this.setState({
                showConfirm: false,
                confirmText: ''
            });
        }.bind(this), 2000);

    }

    getverifyCode() {
        var that=this;
        axios.post(config.apiUrl.getVerifyCode, {
            telephone: this.refs.telephone.value
        })
        .then(function (response) {
            that.setState({verifyCodeText: '5', isDisabled: true});
            let text = 5;
            let interval = setInterval(function () {
                if (text == 0) {
                    clearInterval(interval);
                    that.setState({verifyCodeText: '获取验证码', isDisabled: false});
                }
                else {
                    text--;
                    that.setState({verifyCodeText: text});
                }
            }, 1000);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const clz = classNames({
            'btn-bg-disabled': this.state.isDisabled,
            'weui_btn': true,
            'weui_btn_warn': !this.state.isDisabled,
            'b-r-none': true
        });

        const isDisabled = this.state.isDisabled;

        return (
            <div>
                <div className="weui_cells weui_cells_form">
                    <div className="weui_cell">
                        <div className="weui_cell_hd"><label className="weui_label">手机号码</label></div>
                        <div className="weui_cell_bd weui_cell_primary">
                            <input className="weui_input" type="number" pattern="[0-9]*"
                                   defaultValue={this.state.telephone} onChange={this.telChange.bind(this)}
                                   ref="telephone" placeholder="请输入手机号"/>
                        </div>
                    </div>
                    <div className="weui_cell weui_vcode">
                        <div className="weui_cell_hd"><label className="weui_label">验证码</label></div>
                        <div className="weui_cell_bd weui_cell_primary">
                            <input className="weui_input" type="number" ref="verifyCode" placeholder="请输入验证码"/>
                        </div>
                        <div className="weui_cell_ft">
                            <button className={clz} disabled={isDisabled} style={{'width':'118px'}}
                                    onClick={this.getverifyCode.bind(this)}>{this.state.verifyCodeText}</button>
                        </div>
                    </div>
                </div>

                <div className="weui_btn_area m-t-lg">
                    <a className="weui_btn weui_btn_primary" onClick={this.submit.bind(this)} href="javascript:">确定</a>
                </div>

                <Toast show={this.state.showConfirm}>
                    {this.state.confirmText}
                </Toast>
            </div>
        );
    }
}