/**
 * Created by clf on 2016/8/25.
 */

var User = require('../models').User;
var Product = require('../models').Product;
var config = require('../config');

var product = {
    //新增产品
    add: function (req, res, next) {
        if (!req.body.userId||!req.body.title || !req.body.price || !req.body.address || !req.body.description || !req.body.latitude || !req.body.longitude || !req.body.category) {
            return res.json({
                resultCode: 0,
                resultMsg: '缺少验证参数'
            });
        }
        //new一个实例
        var product = new Product({
            userId:req.body.userId,
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

        //保存到数据库
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

    //获取产品列表，分页，筛选
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

    getProductById:function(req,res,next){
        Product.findById(req.params.productId, function (err, product) {
            if(err){
                return next(err);
            }
            if(product){
                console.log(product.userId);
                User.findById(product.userId,function(err,user){
                    if(err){
                        return next(err);
                    }
                    product=product.toObject();
                    product.user=user;
                    console.log(product);
                    res.json({
                        resultCode: 1,
                        data: product
                    });

                });
            }
            else{
                res.json({
                    resultCode: 1,
                    data: product
                });
            }
        });
    },

    getUserPublishByUserId:function(req,res,next){
        Product.find({userId:req.params.userId}, function (err, product) {
            if(err){
                return next(err);
            }
            res.json({
                resultCode: 1,
                data: product
            });
        });
    },

    getUserCollectByUserId:function(req,res,next){
        User.findById(req.params.userId,function(err,user){
            if(err){
                return next(err);
            }
            if(user){
                var collect=user.collect;
                Product.find({_id: { $in : collect } },function(err,product){
                    if(err){
                        return next(err);
                    }
                    res.json({
                        resultCode: 1,
                        data: product
                    });

                });
            }

        });
        Product.find({userId:req.params.userId}, function (err, product) {
            if(err){
                return next(err);
            }
            res.json({
                resultCode: 1,
                data: product
            });
        });
    },
};

module.exports=product;