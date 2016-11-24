import React from 'react';
import classNames from 'classnames';
import {Toast} from 'react-weui';
import {connect} from 'react-redux';
import {login, telChange,getVerifyCode} from '../../actions/loginAction';


class Login extends React.Component {
    submit() {
        const dispatch = this.props.dispatch;

        var that = this;
        if (!that.refs.verifyCode.value) {
            that.setState({
                showConfirm: true,
                confirmText: '请填写验证码'
            });
        }
        else {
            const params = {
                telephone: this.refs.telephone.value,
                verifyCode: this.refs.verifyCode.value
            };
            dispatch(login(params));
        }
        setTimeout(function () {
            that.setState({
                showConfirm: false,
                confirmText: ''
            });
        }, 2000);

    }

    handleTelChange() {
        let telephone = this.refs.telephone.value;
        this.props.dispatch(telChange(telephone));
    }

    handleGetVerifyCode(){
        let telephone = this.refs.telephone.value;
        this.props.dispatch(getVerifyCode(telephone));
    }

    render() {
        const {telephone, verifyCodeText, isDisabled, showConfirm, confirmText}=this.props.data;
        const clz = classNames({
            'btn-bg-disabled': isDisabled,
            'weui_btn': true,
            'weui_btn_warn': !isDisabled,
            'b-r-none': true
        });
        return (
            <div>
                <div className="weui_cells weui_cells_form">
                    <div className="weui_cell">
                        <div className="weui_cell_hd"><label className="weui_label">手机号码</label></div>
                        <div className="weui_cell_bd weui_cell_primary">
                            <input className="weui_input" type="number" pattern="[0-9]*"
                                   defaultValue={telephone} onChange={this.handleTelChange.bind(this)}
                                   ref="telephone" placeholder="请输入手机号"/>
                        </div>
                    </div>
                    <div className="weui_cell weui_vcode">
                        <div className="weui_cell_hd"><label className="weui_label">验证码</label></div>
                        <div className="weui_cell_bd weui_cell_primary">
                            <input className="weui_input" type="number" ref="verifyCode" placeholder="请输入验证码"/>
                        </div>
                        <div className="weui_cell_ft">
                            <button className={clz} disabled={isDisabled} style={{'width': '118px'}}
                                    onClick={this.handleGetVerifyCode.bind(this)}>{verifyCodeText}</button>
                        </div>
                    </div>
                </div>

                <div className="weui_btn_area m-t-lg">
                    <a className="weui_btn weui_btn_primary" onClick={this.submit.bind(this)} href="javascript:">确定</a>
                </div>

                <Toast show={showConfirm}>
                    {confirmText}
                </Toast>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.login
});

export default connect(mapStateToProps)(Login)