import axios from 'axios';
import {hashHistory} from 'react-router';

let axiosIns = axios.create({});

axiosIns.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
axiosIns.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axiosIns.interceptors.response.use(function (response) {
    return response.data;
}, function (err) {
    if (err.response.status == 401) {
        return hashHistory.push('/login');
    }
});

module.exports = axiosIns;