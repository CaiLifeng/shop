import React from 'react';
import {Link,History} from 'react-router';
import classNames from 'classnames';
import {Toast} from 'react-weui';
import axios from 'axios'


export default class Login extends React.Component {
    state={
        telephone:'',
        identifyCodeText:'获取验证码',
        isDisabled:true,
        showConfirm:false,
        confirmText:''
    };

    telChange(){
        let telephone=this.refs.telephone.value;
        if(telephone.length==11){
            this.setState({
                isDisabled:false
            });
        }
        else{
            this.setState({
                isDisabled:true
            });
        }
    }

    submit(){
        if(!this.refs.identifyCode.value){
            this.setState({
                showConfirm:true,
                confirmText:'请填写验证码'
            });
        }
        setTimeout(function(){
            this.setState({
                showConfirm:false,
                confirmText:''
            });
        }.bind(this),2000);

    }

    getIdentifyCode(){
        //http://120.24.94.126/health/user/sendRanCode

        //axios.post('/ranCode', {
        //
        //})
        //.then(function (response) {
        //    console.log(response);
        //})
        //.catch(function (error) {
        //    console.log(error);
        //});


        let telephone=this.refs.telephone.value;
        console.log(telephone);
        this.setState({identifyCodeText:'5',isDisabled:true});
        let text=5;
        let interval = setInterval(function(){
            if(text==0){
                clearInterval(interval);
                this.setState({identifyCodeText:'获取验证码',isDisabled:false});
            }
            else{
                text--;
                this.setState({identifyCodeText:text});
            }
        }.bind(this),1000);
    }

    render() {
        const clz = classNames({
            'btn-bg-disabled': this.state.isDisabled,
            'weui_btn':true,
            'weui_btn_warn':!this.state.isDisabled,
            'b-r-none':true
        });

        const isDisabled=this.state.isDisabled;

        return (
            <div>
                <div className="weui_cells weui_cells_form">
                    <div className="weui_cell">
                        <div className="weui_cell_hd"><label className="weui_label">手机号码</label></div>
                        <div className="weui_cell_bd weui_cell_primary">
                            <input className="weui_input" type="number" pattern="[0-9]*" defaultValue={this.state.telephone} onChange={this.telChange.bind(this)} ref="telephone" placeholder="请输入手机号"/>
                        </div>
                    </div>
                    <div className="weui_cell weui_vcode">
                        <div className="weui_cell_hd"><label className="weui_label">验证码</label></div>
                        <div className="weui_cell_bd weui_cell_primary">
                            <input className="weui_input" type="number" ref="identifyCode" placeholder="请输入验证码"/>
                        </div>
                        <div className="weui_cell_ft">
                            <button className={clz} disabled={isDisabled} style={{'width':'118px'}}  onClick={this.getIdentifyCode.bind(this)}>{this.state.identifyCodeText}</button>
                        </div>
                    </div>
                </div>

                <div className="weui_btn_area m-t-lg">
                    <a className="weui_btn weui_btn_primary" onClick={this.submit.bind(this)} href="javascript:">确定</a>
                </div>

                <Toast show={this.state.showConfirm} icon="warn" iconSize="large">
                    请填写验证码
                </Toast>
            </div>
        );
    }
}