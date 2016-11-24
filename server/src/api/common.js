/**
 * Created by clf on 2016/8/25.
 */
var config = require('../config');
var qn = require('qn');
var Area = require('../models').Area;
var request = require('request');

var common = {
    //获取七牛token
    getQnToken: function (req, res, next) {
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
    },

    //获取省份列表
    getProvinces:function(req,res,next){
        Area.find({pcode:0}).then(function(data){
            res.json({
                resultCode:1,
                data:data
            });
        },function(err){
            next(err);
        });
    },

    //根据省份获取城市列表
    getCities:function(req,res,next){
        var code=req.query.code;
        Area.find({pcode:code}).then(function(data){
            res.json({
                resultCode:1,
                data:data
            });
        }).catch(function(err){
            next(err);
        });
    },

    //根据市获取区的列表
    getRegions: function (req, res, next) {
        var cityName = req.query.city;
        Area.findOne({name:cityName}).then(function(city){
            if(city){
                var code=city.code;
                return Area.find({pcode:code});
            }
            else{
                res.json({
                    resultCode: 0,
                    resultMsg: '找不到此城市'
                });
                return Promise.reject();
            }
        }).then(function(regions){
            var regionList = [];
            regions.forEach(function (item, index, array) {
                regionList.push(item.name);
            });
            res.json({
                resultCode:1,
                data:regionList
            });

        }).catch(function(err){
            next(err);
        });
    }
};

module.exports=common;