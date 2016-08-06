/**
 * Created by clf on 2016/8/1.
 */

var jwt=require('jsonwebtoken');

var token = jwt.sign({ name: 'clf' }, 'clf');
console.log(token);