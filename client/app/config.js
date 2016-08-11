/**
 * Created by clf on 2016/8/6.
 */

const apiRoot='/api/'

const config={

    //api地址
    apiUrl:{
        geoCoder:'http://api.map.baidu.com/geocoder/v2/',
        getVerifyCode:apiRoot+'getVerifyCode',
        login:apiRoot+'login',//登陆
        region:apiRoot+'region',//获取城市下面的地区
        getQnToken:apiRoot+'getQnToken',//获取七牛token
        getLocationInfo:apiRoot+'getLocationInfo',//获取地址
        products:apiRoot+'products',//新增产品
    },

    //百度key
    baiduKey:'u4doiw4efjtMPKYVPTeiTbFh',
};


module.exports=config;
