'use strict'
var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var middlewares = require('../middlewares/index');
var config = require('../config');


var api = require('../api');

//登陆接口，不需要用到jwt验证
router.post('/login', api.user.login);
//获取验证码
router.post('/getVerifyCode', api.user.getVerifyCode);
//根据市获取区的列表
router.get('/regions', api.common.getRegions);
//新增产品
router.post('/products', expressJwt({secret: config.secretKey}), middlewares.authError, api.product.add);
//获取产品列表
router.get('/products', api.product.getProducts);
//根据产品id获取产品信息
router.get('/products/:productId',expressJwt({secret: config.secretKey}), middlewares.authError,  api.product.getProductById);
//获取七牛token
router.get('/getQnToken', expressJwt({secret: config.secretKey}), middlewares.authError, api.common.getQnToken);
//获取位置
router.post('/getLocationInfo',expressJwt({secret: config.secretKey}), middlewares.authError, api.common.getLocationInfo);
//获取所在城市的区列表
router.get('/districts',api.common.getDistricts);
//更新用户信息
router.post('/updateUserInfo',expressJwt({secret: config.secretKey}), middlewares.authError, api.user.update);
//根据用户id获取用户信息
router.get('/user/:userId',expressJwt({secret: config.secretKey}), middlewares.authError,api.user.getUserById);
//根据用户id获取用户发布的产品
router.get('/userPublish',expressJwt({secret: config.secretKey}), middlewares.authError,api.product.getUserPublishByUserId);
//根据用户id获取用户收藏的产品
router.get('/userCollect',expressJwt({secret: config.secretKey}), middlewares.authError,api.product.getUserCollectByUserId);
//用户收藏产品
router.post('/collect',expressJwt({secret: config.secretKey}), middlewares.authError,api.product.collect);
//用户取消收藏产品
router.post('/unCollect',expressJwt({secret: config.secretKey}), middlewares.authError,api.product.unCollect);


module.exports = router;
