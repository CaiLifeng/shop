/**
 * Created by clf on 2016/8/25.
 */

var User = require('../models').User;
var Product = require('../models').Product;
var config = require('../config');

var product = {

    add: function (req, res, next) {
        if (!req.body.userId || !req.body.title || !req.body.price || !req.body.address || !req.body.description || !req.body.latitude || !req.body.longitude || !req.body.category) {
            return res.json({
                resultCode: 0,
                resultMsg: '缺少验证参数'
            });
        }

        var product = new Product({
            userId: req.body.userId,
            title: req.body.title,
            price: req.body.price,
            address: req.body.address,
            category: req.body.category,
            location: {
                latitude: req.body.latitude,
                longitude: req.body.longitude
            },
            tradeType: req.body.tradeType,
            description: req.body.description,
            images: req.body.images
        });


        product.save(function (err) {
            if (err) {
                next(err);
            }
            else {
                res.json({
                    resultCode: 1
                });
            }
        });
    },

    getProducts: function (req, res, next) {
        var query = {};
        var start;
        var limit;
        if (req.query.title) {
            query.title = new RegExp('.*' + req.query.title + '.*', "g");
        }
        if (req.query.pageSize > 0 && req.query.pageIndex >= 0) {
            start = parseInt(req.query.pageSize) * parseInt(req.query.pageIndex);
            limit = parseInt(req.query.pageSize);
        }
        if (req.query.address) {
            query.address = new RegExp('.*' + req.query.address + '.*', "g");
        }
        if (req.query.category) {
            query.category = req.query.category
        }
        if (req.query.tradeType) {
            query.tradeType = req.query.tradeType
        }
        if (parseInt(req.query.priceMin) >= 0 && parseInt(req.query.priceMax) >= 0) {
            query.price = {$gt: req.query.priceMin, $lt: req.query.priceMax}
        }

        Product.find(query).skip(start).limit(limit).exec(function (err, data) {
            if (err) {
                return next(err);
            }

            Product.count(query, function (err, count) {
                if (err) {
                    return next(err);
                }
                res.json({
                    resultCode: 1,
                    data: data,
                    pageIndex: Number(req.query.pageIndex),
                    pageSize: Number(req.query.pageSize),
                    pageCount: Math.ceil(count / req.query.pageSize),
                    count: count
                });
            });

        });
    },

    //isCollect参数，0表示没有收藏，1表示已经收藏，2表示创建者是自己
    getProductById: function (req, res, next) {
        if (!req.params.productId) {
            return res.json({
                resultCode: 0,
                resultMsg: '缺少验证参数'
            });
        }
        console.log(req.user);
        Product.findById(req.params.productId, function (err, product) {
            if (err) {
                return next(err);
            }
            if (product) {
                User.findById(product.userId, function (err, user) {
                    if (err) {
                        return next(err);
                    }
                    if(user){
                        product = product.toObject();
                        product.user = user;
                        User.findById(req.user.userId,function(err,user){
                            if(err){
                                return next(err);
                            }
                            if(user){
                                if(product.userId==req.user.userId){
                                    product.isCollect=2;
                                }
                                else if(user.collect.indexOf(req.params.productId)>-1){
                                    product.isCollect=1;
                                }
                                else{
                                    product.isCollect=0;
                                }
                                res.json({
                                    resultCode: 1,
                                    data: product
                                });
                            }
                            else{
                                return res.json({
                                    resultCode: 0,
                                    resultMsg:'找不到用户信息'
                                });
                            }
                        });

                    }
                    else{
                        res.json({
                            resultCode:0,
                            result:'找不到发布用户信息'
                        });
                    }


                });
            }
            else {
                res.json({
                    resultCode:0,
                    result:'找不到产品信息'
                });
            }
        });
    },

    getUserPublishByUserId: function (req, res, next) {
        Product.find({userId: req.user.userId}, function (err, product) {
            if (err) {
                return next(err);
            }
            res.json({
                resultCode: 1,
                data: product
            });
        });
    },

    getUserCollectByUserId: function (req, res, next) {
        User.findById(req.user.userId, function (err, user) {
            if (err) {
                return next(err);
            }
            if (user) {
                var collect = user.collect;
                Product.find({_id: {$in: collect}}, function (err, product) {
                    if (err) {
                        return next(err);
                    }
                    res.json({
                        resultCode: 1,
                        data: product
                    });

                });
            }

        });
    },

    collect: function (req, res, next) {
        if (!req.body.productId ) {
            return res.json({
                resultCode: 0,
                resultMsg: '缺少验证参数'
            });
        }

        var userId=req.user.userId;

        User.findById(userId, function (err, user) {
            if (err) {
                return next(err);
            }
            if (user) {
                if(user.collect.indexOf(req.body.productId)>-1){
                    return res.json({
                        resultCode: 0,
                        resultMsg:'不能再次收藏'
                    });
                }
                user.collect.push(req.body.productId);
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

    unCollect: function (req, res, next) {
        if (!req.body.productId) {
            return res.json({
                resultCode: 0,
                resultMsg: '缺少验证参数'
            });
        }

        var userId=req.user.userId;

        User.findById(userId, function (err, user) {
            if (err) {
                return next(err);
            }

            if (user) {
                var index=user.collect.indexOf(req.body.productId);
                if(index>-1){
                    user.collect.splice(index,1);
                }

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


};

module.exports = product;