import React from 'react';
import {Router,Route,browserHistory,hashHistory,IndexRoute} from 'react-router';
import ReactDOM from 'react-dom';
import App from './components/App';
import Products from './components/home/Products';
import Home from './components/home/Home';
import Publish from './components/publish/Publish';
import NavBar from './components/NavBar';
import ProductDetail from './components/productDetail/ProductDetail';
import Login from './components/Login';
import Information from './components/Information';
import axios from 'axios';

require('weui');
require('../node_modules/font-awesome/css/font-awesome.min.css');
require('../node_modules/react-image-gallery/build/image-gallery.css');

//axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWxlcGhvbmUiOiIxMzkyMzA0MzM4MiIsImlhdCI6MTQ3MDY1MzYxNX0.I2rRuty2WiEczOeu3-F5D0V4GhErwi2ljvI7C5BAhoc';

//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="home" component={Home}/>
            <Route path="products" component={Home}/>
            <Route path="publish" component={Publish}/>
            <Route path="information" component={Information}/>
        </Route>
        <Route path="/product/:productId" component={ProductDetail}/>
        <Route path="/login" component={Login}/>
        <Route path="/regInfo" component={Information}/>
    </Router>,
    document.body.appendChild(document.createElement('div'))
);
