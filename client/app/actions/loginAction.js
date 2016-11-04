export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const RECEIVE_VERIFYCODE = 'RECEIVE_VERIFYCODE';
export const STOP_GET_VERIFYCODE = 'STOP_GET_VERIFYCODE';
export const TEL_CHANGE = 'TEL_CHANGE';
export const GET_VERIFY_CODE = 'GET_VERIFY_CODE';
import axiosIns from '../utils';
import config from '../config.js';
import {hashHistory} from 'react-router';

//接受到登陆信息
export const receiveLogin = json => ({
    type: RECEIVE_LOGIN,
    data: json
});

//接受到验证码
export const receiveVerifyCode = (verifyCodeText, isDisabled) => ({
    type: RECEIVE_VERIFYCODE,
    verifyCodeText,
    isDisabled
});

//电话号码改变
export const telChange = text =>({
    type: TEL_CHANGE,
    text
});

//获取验证码
export const getVerifyCode = telephone => dispatch => {
    return axiosIns.post(config.apiUrl.getVerifyCode, {
        telephone: telephone
    }).then(function (data) {
        if (data.resultCode == 1) {
            dispatch(receiveVerifyCode(5, true));
            let text = 5;
            let interval = setInterval(function () {
                if (text == 0) {
                    clearInterval(interval);
                    dispatch(receiveVerifyCode('获取验证码', false));
                }
                else {
                    text--;
                    dispatch(receiveVerifyCode(text, true));
                }
            }, 1000);
        }
        else {
            console.log(data.resultMsg);
        }
    })
};

export const login = params => dispatch => {
    return axiosIns.post(config.apiUrl.login, {
        telephone: params.telephone,
        verifyCode: params.verifyCode
    }).then(function (data) {
        if (data.resultCode == 1) {
            localStorage.setItem('token', data.token);
            axiosIns.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
            localStorage.setItem('user', JSON.stringify(data.user));
            if (data.user.name) {
                hashHistory.push('/products');
            }
            else {
                hashHistory.push('/regInfo');
            }
        }
        else {
            dispatch(receiveLogin({
                showConfirm: true,
                confirmText: data.resultMsg
            }));
        }

    });
};
