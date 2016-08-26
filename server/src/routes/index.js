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
router.post('/verifyCode', api.user.getVerifyCode);
//根据市获取区的列表
router.get('/regions', expressJwt({secret: config.secretKey}), middlewares.authError, api.common.getRegions);
//新增产品
router.post('/products', expressJwt({secret: config.secretKey}), middlewares.authError, api.product.add);
//获取产品列表
router.get('/products', expressJwt({secret: config.secretKey}), middlewares.authError, api.product.getProducts);
//根据产品id获取产品信息
router.get('/products/:productId', expressJwt({secret: config.secretKey}), middlewares.authError, api.product.getProductById);
//获取七牛token
router.get('/getQnToken', expressJwt({secret: config.secretKey}), middlewares.authError, api.common.getQnToken);
//获取位置
router.post('/getLocationInfo',expressJwt({secret: config.secretKey}), middlewares.authError, api.common.getLocationInfo);
//获取所在城市的区列表
router.get('/districts',expressJwt({secret: config.secretKey}), middlewares.authError, api.common.getDistricts);
//更新用户信息
router.post('/updateUserInfo',expressJwt({secret: config.secretKey}), middlewares.authError, api.user.update);
//根据用户id获取用户信息
router.get('/user/:userId',expressJwt({secret: config.secretKey}), middlewares.authError,api.user.getUserById);

module.exports = router;
