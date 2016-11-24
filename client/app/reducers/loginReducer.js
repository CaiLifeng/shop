import {RECEIVE_LOGIN,TEL_CHANGE,RECEIVE_VERIFYCODE,STOP_GET_VERIFYCODE} from '../actions/loginAction'

const initialState = {
    telephone: '',
    verifyCodeText: '获取验证码',
    isDisabled: true,
    showConfirm: false,
    confirmText: ''
};

//电话号码改变
const telChange = (state,text) => {
    if (text.length == 11) {
        return Object.assign({}, state, {isDisabled: false});
    }
    else {
        return Object.assign({}, state, {isDisabled: true});
    }
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_LOGIN:
            return Object.assign({},state,action.data);
        case TEL_CHANGE:
            return telChange(state,action.text);
        case RECEIVE_VERIFYCODE:
            return Object.assign({},state,{verifyCodeText: action.verifyCodeText, isDisabled: action.isDisabled});
        default:
            return state
    }
};

export{login}