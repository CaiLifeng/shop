var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var expressJwt = require('express-jwt');
var jwt = require("jsonwebtoken");
var config=require('./config');
var User=require('./models/index').User;
var middlewares=require('./middlewares/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(middlewares.setHeader);

//function ensureAuthorized(req, res, next) {
//  var bearerToken;
//  var bearerHeader = req.headers["authorization"];
//  if (typeof bearerHeader !== 'undefined') {
//    var bearer = bearerHeader.split(" ");
//    bearerToken = bearer[1];
//    req.token = bearerToken;
//    next(); sdf
//  } else {
//    res.sendStatus(401);
//  }
//}


//其他接口
app.use('/api/',routes);


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
