/**
 * Created by clf on 2016/8/6.
 */

const apiRoot='/api/';

const apiUrl={
    getVerifyCode:apiRoot+'getVerifyCode',
    login:apiRoot+'login',//登陆
    region:apiRoot+'region',//获取城市下面的地区
    getQnToken:apiRoot+'getQnToken',//获取七牛token
};

module.exports=apiUrl;