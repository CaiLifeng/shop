/**
 * Created by clf on 2016/8/25.
 */
var config = require('../config');
var qn = require('qn');
var Area = require('../models').Area;
var request = require('request');

var common = {
    //��ȡ��ţtoken
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

    //�����л�ȡ�����б�
    getRegions: function (req, res, next) {
        var cityName = req.params.cityName;
        Area.findOne({name: cityName.toString()}, function (err, city) {
            if (err) {
                return next(err);
            } else {
                if (city) {
                    var code = city.code;
                    Area.find({pcode: code}, function (err, regions) {
                        if (err) {
                            return next(err);
                        }
                        res.json({
                            resultCode: 1,
                            data: regions
                        });
                    });
                }
                else {
                    res.json({
                        resultCode: 0,
                        resultMsg: '�鲻��' + cityName
                    });
                }
            }
        });
    },

    getLocationInfo: function (req, res, next) {
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
                        resultMsg: '�ӿڳ���'
                    });
                }
            }
            else {
                res.json({
                    resultCode: 0,
                    resultMsg: '�ӿڳ���'
                });
            }
        });
    },

    getDistricts: function (req, res, next) {
        var latitude = req.query.latitude;
        var longitude = req.query.longitude;
        if (!latitude || !longitude) {
            res.json({
                resultCode: 0,
                resultMsg: 'ȱ����֤����'
            });
            return;
        }
        else {
            request('http://api.map.baidu.com/geocoder/v2/?output=json&ak=u4doiw4efjtMPKYVPTeiTbFh&coordtype=wgs84ll&pois=0&location=' + latitude + ',' + longitude, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);
                    if (body.status == 0) {
                        var city = body.result.addressComponent.city;
                        //���������������
                        Area.findOne({'name': city}, function (err, city) {
                            if (err) {
                                return next(err);
                            }
                            if (city) {
                                var code = city.code;
                                Area.find({'pcode': code}, function (err, distincts) {
                                    if(err){
                                        return next(err);
                                    }
                                    if (distincts) {
                                        var distinctList = [];
                                        distincts.forEach(function (item, index, array) {
                                            distinctList.push(item.name);
                                        });
                                        res.json({
                                            resultCode: 1,
                                            data: distinctList
                                        });
                                    }
                                    else {
                                        res.json({
                                            resultCode: 0,
                                            resultMsg: '�˳�������û����'
                                        });
                                    }
                                });
                            }
                            else {
                                res.json({
                                    resultCode: 0,
                                    resultMsg: '���Ҳ����˳���'
                                });
                            }
                        });
                    }
                    else {
                        res.json({
                            resultCode: 0,
                            resultMsg: '�ӿڳ���'
                        });
                    }
                }
                else {
                    res.json({
                        resultCode: 0,
                        resultMsg: '�ӿڳ���'
                    });
                }
            });
        }
    }
};

module.exports=common;