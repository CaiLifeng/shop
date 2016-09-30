/**
 * Created by clf on 2016/8/6.
 */

const apiRoot = '/api/';

const config = {
    title:'同城交易',
    //api地址
    apiUrl: {
        geoCoder: 'http://api.map.baidu.com/geocoder/v2/',
        getVerifyCode: apiRoot + 'getVerifyCode',
        login: apiRoot + 'login',//登陆
        region: apiRoot + 'region',//获取城市下面的地区
        getQnToken: apiRoot + 'getQnToken',//获取七牛token
        getLocationInfo: apiRoot + 'getLocationInfo',//获取地址
        products: apiRoot + 'products',//新增产品
        districts: apiRoot + 'districts',//获取所在城市下面的区列表,
        updateUserInfo: apiRoot + 'updateUserInfo',//更新用户信息
        userPublish: apiRoot + 'userPublish',//获取用户发布的产品列表
        userCollect: apiRoot + 'userCollect',//获取用户收藏的产品列表
        collect: apiRoot + 'collect',//用户收藏产品
        unCollect: apiRoot + 'unCollect',//用户收藏产品,
        delete:apiRoot + 'delete'//删除自己发布的产品,
    },

    uploadUrl:'https://up.qbox.me',   //如果是http的话使用http://upload.qiniu.com

    //百度key，用于定位
    baiduKey: 'u4doiw4efjtMPKYVPTeiTbFh',

    //价格区间,区间以~相隔
    priceList: ['不限', '0~1000', '1000~2000', '2000~3000', '3000~4000'],

    //品种列表,需要跟server的一样
    categoryList: ['不限', '苹果', '小米', '魅族', '华为','三星'],

    //交易方式,需要跟server的一样
    tradeType: ['不限', '当面', '快递']
};


module.exports = config;
