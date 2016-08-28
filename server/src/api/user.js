/**
 * Created by clf on 2016/8/25.
 */
var User = require('../models').User;
var config = require('../config');
var request = require('request');
var jwt = require('jsonwebtoken');

var user = {
    //登陆接口
    login: function (req, res, next) {
        var telephone = req.body.telephone;
        var verifyCode = req.body.verifyCode;

        User.findOne({telephone: telephone}, function (err, user) {
            if (err) {
                return next(err);
            }
            //如果用户存在
            if (user) {
                User.findOne({telephone: telephone, verifyCode: verifyCode}, function (err, user) {
                    if (err) {
                        return next(err);
                    }
                    //如果验证码正确，通过并返回token
                    if (user) {
                        var token = jwt.sign({telephone: telephone, userId: user.ObjectId}, config.secretKey);
                        res.json({
                            resultCode: 1,
                            user: user,
                            token: token
                        });
                    }
                    //如果验证码错误，返回出错信息
                    else {
                        res.json({
                            resultCode: 0,
                            resultMsg: '验证码错误'
                        });
                    }
                });
            }
            //如果用户不存在，返回手机号码错误
            else {
                res.json({
                    resultCode: 0,
                    resultMsg: '手机号码错误'
                });
            }
        });
    },

    getVerifyCode: function (req, res, next) {
        if (!req.body.telephone) {
            return res.json({
                resultCode: 0,
                resultMsg: '缺少验证参数'
            });
        }
        var randomCode = parseInt(100000 * Math.random());
        request.post({
            headers: {
                'charset': 'utf-8'
            },
            url: 'https://sms.yunpian.com/v2/sms/single_send.json',
            form: {apikey: config.yunPianKey, mobile: req.body.telephone, text: '【微信商城】您的验证码是' + randomCode}
        }, function (err, response, body) {
            if (err) {
                console.log(err);
                return next(err);
            }
            body = JSON.parse(body);
            if (body.code == 0) {
                //查看是否存在此用户
                User.findOne({telephone: req.body.telephone}, function (err, user) {
                    if (err) {
                        return next(err);
                    }
                    //如果用户存在的话
                    if (user) {
                        user.verifyCode = randomCode;
                        user.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            res.json({
                                resultCode: 1,
                                sid: body.sid,
                                verifyCode: randomCode
                            });

                        });
                    }
                    //如果用户不存在
                    else {
                        //新建一个用户并把验证码存入数据库
                        var user1 = new User({
                            telephone: req.body.telephone,
                            verifyCode: randomCode,
                            sid: body.sid
                        });

                        user1.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            res.json({
                                resultCode: 1,
                                sid: body.sid,
                                verifyCode: randomCode
                            });

                        });
                    }
                });
            }
            else {
                next(body.detail);
            }
        })
    },

    update: function (req, res, next) {
        if (!req.body.id || !req.body.name || !req.body.sex || !req.body.age) {
            return res.json({
                resultCode: 0,
                resultMsg: '缺少验证参数'
            });
        }
        User.findById(req.body.id, function (err, user) {
            if (err) {
                return next(err);
            }

            if (user) {
                user.name = req.body.name;
                user.image = req.body.image;
                user.sex = req.body.sex;
                user.age = req.body.age;
                user.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    res.json({
                        resultCode: 1,
                        user: user
                    });

                });
            }
            else {
                res.json({
                    resultCode: 0,
                    resultMsg: '没有此用户'
                });
            }

        });
    },

    getUserById: function (req, res, next) {
        User.findById(req.params.userId, function (err, user) {
            if (err) {
                return next(err);
            }
            res.json({
                resultCode: 1,
                data: user
            });
        });
    }
};

module.exports = user;