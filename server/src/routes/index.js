var express = require('express');
var router = express.Router();
var User=require('../models').User;
var Area=require('../models').Area;
var Product=require('../models').Product;
var bodyParser=require('body-parser');
var jwt = require("jsonwebtoken");
var config=require('../config');
var qn=require('qn');
var expressJwt = require('express-jwt');
var middlewares=require('../middlewares/index');
var request=require('request');

//登陆接口，不需要用到jwt验证
router.post('/login',function(req,res,next){
    var name=req.body.name;
    var passWord=req.body.passWord;

    User.findOne({name: name, passWord: passWord}, function(err, user) {
        if (err) {
            res.json({
                resultCode: 0,
                resultMsg: err
            });
        } else {
            if (user) {
                var token=jwt.sign({name:name,userId:user.ObjectId}, config.secretKey);
                res.json({
                    resultCode: 1,
                    user:user,
                    token: token
                });
            }
            else{
                res.json({
                    resultCode:0,
                    resultMsg:'用户名密码错误'
                });
            }
        }
    });
});


//获取验证码
router.post('/getRanCode',function(req,res,next){
    if(!req.body.telephone){
        res.json({
            resultCode: 0,
            resultMsg: '缺少验证参数'
        });
        return;
    }
    var randomCode=parseInt(100000*Math.random());
    request.post({url:'https://sms.yunpian.com/v2/sms/single_send.json', form: {apikey:config.yunPianKey,mobile:req.body.telephone,text:'【微信商城】您的验证码是'+randomCode}}, function(err,response,body){
        body=JSON.parse(body);
        if(body.code==0){
            //把sid存入数据库
            var user=new User({
                telephone:req.body.telephone,
                sid:body.sid
            });

            //保存到数据库
            user.save(function(err){
                if(err){
                    res.json({
                        resultCode:0,
                        resultMsg:err
                    });
                }
                else{
                    res.json({
                        resultCode:1,
                        sid:body.sid
                    });
                }
            });
        }
        else{
            res.json({
                resultCode:0,
                resultMsg:body.msg
            });
        }
    })
});


//根据市获取区的列表
router.get('/regions',expressJwt({secret: config.secretKey}),middlewares.authError,function(req,res,next){
    var cityName=req.params.cityName;

    Area.findOne({name:cityName.toString()}, function(err, city) {
        if (err) {
            res.json({
                resultCode: 0,
                resultMsg: err
            });
        } else {
            if (city) {
                var code=city.code;
                Area.find({pcode:code},function(err,region){
                    res.json({
                        resultCode:1,
                        data:region
                    });
                });
            }
            else{
                res.json({
                    resultCode:40029,
                    resultMsg:'查不到'+cityName
                });
            }
        }
    });
});

//新增信息
router.post('/products',expressJwt({secret: config.secretKey}),middlewares.authError,function(req,res,next){
    if(!req.body.name||!req.body.price||!req.body.address||!req.body.description){
        res.json({
            resultCode: 0,
            resultMsg: '缺少验证参数'
        });
        return;
    }

    //new一个实例
    var product=new Product({
        name:req.body.name,
        price:req.body.price,
        address:req.body.address,
        description:req.body.description
    });

    //保存到数据库
    product.save(function(err){
        if(err){
            res.json({
                resultCode:0,
                resultMsg:err
            });
        }
        else{
            res.json({
                resultCode:1
            });
        }
    });
});

//获取七牛token
router.get('/getQnToken',expressJwt({secret: config.secretKey}),middlewares.authError,function(req,res,next){
    var client = qn.create({
        accessKey: config.qn_access.accessKey,
        secretKey: config.qn_access.secretKey,
        bucket: config.qn_access.bucket,
        origin: config.qn_access.origin,
    });

    var token = client.uploadToken();

    res.json({
        resultCode:1,
        data:{
            uploadToken:token,
            domain:config.qn_access.origin
        }
    });
});


module.exports = router;
