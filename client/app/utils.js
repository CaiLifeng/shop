/**
 * Created by clf on 2016/8/26.
 */

import axios from 'axios';
import { hashHistory } from 'react-router';

let axiosIns = axios.create({});

axiosIns.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
console.log(localStorage.getItem('token'));
//axiosIns.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWxlcGhvbmUiOiIxMzkyMzA0MzM4MiIsImlhdCI6MTQ3MDY1MzYxNX0.I2rRuty2WiEczOeu3-F5D0V4GhErwi2ljvI7C5BAhoc';

//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axiosIns.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axiosIns.interceptors.response.use(function (response) {
    return response.data;
},function(err){
    if(err.response.status==401){
        return hashHistory.push('/login');
    }
});

module.exports=axiosIns;