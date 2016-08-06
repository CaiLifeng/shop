/**
 * Created by clf on 2016/8/6.
 */

const apiRoot='/proxy/api/';

const apiUrl={
    ranCode:'http://120.24.94.126/health/user/sendRanCode',
    login:apiRoot+'login',//登陆
    region:apiRoot+'region',//获取城市下面的地区
    getQnToken:apiRoot+'getQnToken',//获取七牛token
};

module.exports=apiUrl;