var express = require('express');
var router = express.Router();
var User = require('../models').User;
var Area = require('../models').Area;
var Product = require('../models').Product;
var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
var config = require('../config');
var qn = require('qn');
var expressJwt = require('express-jwt');
var middlewares = require('../middlewares/index');
var request = require('request');


//登陆接口，不需要用到jwt验证
router.post('/login', function (req, res, next) {
    var telephone = req.body.telephone;
    var verifyCode = req.body.verifyCode;

    User.findOne({telephone: telephone}, function (err1, user1) {
        if (err1) {
            res.json({
                resultCode: 0,
                resultMsg: err1
            });
        } else {
            if (user1) {
                User.findOne({telephone: telephone, verifyCode: verifyCode}, function (err2, user2) {
                    if (err2) {
                        res.json({
                            resultCode: 0,
                            resultMsg: err2
                        });
                    }
                    else {
                        if (user2) {
                            var token = jwt.sign({telephone: telephone, userId: user2.ObjectId}, config.secretKey);
                            res.json({
                                resultCode: 1,
                                user: user2,
                                token: token
                            });
                        }
                        else {
                            res.json({
                                resultCode: 0,
                                resultMsg: '验证码错误'
                            });
                        }
                    }
                });
            }
            else {
                res.json({
                    resultCode: 0,
                    resultMsg: '手机号码错误'
                });
            }
        }
    });
});


//获取验证码
router.post('/getVerifyCode', function (req, res, next) {
    if (!req.body.telephone) {
        res.json({
            resultCode: 0,
            resultMsg: '缺少验证参数'
        });
        return;
    }
    var randomCode = parseInt(100000 * Math.random());
    request.post({
        url: 'https://sms.yunpian.com/v2/sms/single_send.json',
        form: {apikey: config.yunPianKey, mobile: req.body.telephone, text: '【微信商城】您的验证码是' + randomCode}
    }, function (err, response, body) {
        body = JSON.parse(body);
        if (body.code == 0) {
            //查看是否存在此用户
            User.findOne({telephone: req.body.telephone}, function (err, user) {
                if (err) {
                    res.json({
                        resultCode: 0,
                        resultMsg: err
                    });
                }
                else {
                    if (user) {
                        user.verifyCode = randomCode;
                        user.save(function (err) {
                            if (err) {
                                res.json({
                                    resultCode: 0,
                                    resultMsg: err
                                });
                            }
                            else {
                                res.json({
                                    resultCode: 1,
                                    sid: body.sid,
                                    verifyCode: randomCode
                                });
                            }
                        });
                    }
                    else {
                        //把验证码存入数据库
                        var user1 = new User({
                            telephone: req.body.telephone,
                            verifyCode: randomCode,
                            sid: body.sid
                        });

                        //保存到数据库
                        user1.save(function (err) {
                            if (err) {
                                res.json({
                                    resultCode: 0,
                                    resultMsg: err
                                });
                            }
                            else {
                                res.json({
                                    resultCode: 1,
                                    sid: body.sid,
                                    verifyCode: randomCode
                                });
                            }
                        });
                    }
                }
            });
        }
        else {
            res.json({
                resultCode: 0,
                resultMsg: body.msg
            });
        }
    })
});


//根据市获取区的列表
router.get('/regions', expressJwt({secret: config.secretKey}), middlewares.authError, function (req, res, next) {
    var cityName = req.params.cityName;

    Area.findOne({name: cityName.toString()}, function (err, city) {
        if (err) {
            res.json({
                resultCode: 0,
                resultMsg: err
            });
        } else {
            if (city) {
                var code = city.code;
                Area.find({pcode: code}, function (err, region) {
                    res.json({
                        resultCode: 1,
                        data: region
                    });
                });
            }
            else {
                res.json({
                    resultCode: 40029,
                    resultMsg: '查不到' + cityName
                });
            }
        }
    });
});

//新增产品
router.post('/products', expressJwt({secret: config.secretKey}), middlewares.authError, function (req, res, next) {
    if (!req.body.title || !req.body.price || !req.body.address || !req.body.description || !req.body.latitude || !req.body.longitude) {
        res.json({
            resultCode: 0,
            resultMsg: '缺少验证参数'
        });
        return;
    }

    //new一个实例
    var product = new Product({
        title: req.body.title,
        price: req.body.price,
        address: req.body.address,
        location: {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        },
        description: req.body.description,
        images: req.body.images
    });

    //保存到数据库
    product.save(function (err) {
        if (err) {
            res.json({
                resultCode: 0,
                resultMsg: err
            });
        }
        else {
            res.json({
                resultCode: 1
            });
        }
    });
});

//获取产品列表
router.get('/products', expressJwt({secret: config.secretKey}), middlewares.authError, function (req, res, next) {
    var query = {};
    var start;
    var limit;
    if (req.query.pageSize > 0 && req.query.pageIndex >= 0) {
        start = Number(req.query.pageSize) * Number(req.query.pageIndex);
        limit = Number(req.query.pageSize);
    }
    if (req.query.address) {
        query.address = new RegExp('.*' + req.query.address + '.*', "g");
    }
    if (req.query.category) {
        query.category = req.query.category
    }
    if (req.query.priceMin >= 0 && req.query.priceMax >= 0) {
        query.price = {$gt: req.query.priceMin, $lt: req.query.priceMax}
    }


    Product.find(query).skip(start).limit(limit).exec(function (err, data) {
        if (!err) {
            Product.count(query, function (err, count) {
                if (!err) {
                    res.json({
                        resultCode: 1,
                        data: data,
                        pageIndex: Number(req.query.pageIndex),
                        pageSize: Number(req.query.pageSize),
                        pageCount: count
                    });
                }
                else {
                    res.json({
                        resultCode: 0,
                        resultMsg: err
                    });
                }
            });


        }
        else {
            res.json({
                resultCode: 0,
                resultMsg: err
            });
        }
    });
});

//获取七牛token
router.get('/getQnToken', expressJwt({secret: config.secretKey}), middlewares.authError, function (req, res, next) {
    var client = qn.create({
        accessKey: config.qn_access.accessKey,
        secretKey: config.qn_access.secretKey,
        bucket: config.qn_access.bucket,
        origin: config.qn_access.origin,
    });

    var token = client.uploadToken();

    res.json({
        resultCode: 1,
        data: {
            uploadToken: token,
            domain: config.qn_access.origin
        }
    });
});

//获取位置
router.post('/getLocationInfo', function (req, res, next) {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    request('http://api.map.baidu.com/geocoder/v2/?output=json&ak=u4doiw4efjtMPKYVPTeiTbFh&coordtype=wgs84ll&pois=0&location=' + latitude + ',' + longitude, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            if (body.status == 0) {
                res.json({
                    resultCode: 1,
                    data: body.result
                });
            }
            else {
                res.json({
                    resultCode: 0,
                    resultMsg: '接口出错'
                });
            }
        }
        else {
            res.json({
                resultCode: 0,
                resultMsg: '接口出错'
            });
        }
    });
});


module.exports = router;
