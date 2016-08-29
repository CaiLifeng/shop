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
import UserCollect from './components/userCollect/UserCollect';
import Personal from './components/personal/Personal';
import UserPublish from './components/userPublish/UserPublish';
import axios from 'axios';

require('weui');
require('../node_modules/font-awesome/css/font-awesome.min.css');
require('../node_modules/react-image-gallery/build/image-gallery.css');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="home" component={Home}/>
            <Route path="products" component={Home}/>
            <Route path="publish" component={Publish}/>
            <Route path="personal" component={Personal}/>
            <Route path="userCollect" component={UserCollect}/>
            <Route path="userPublish" component={UserPublish}/>
        </Route>
        <Route path="/product/:productId" component={ProductDetail}/>
        <Route path="/login" component={Login}/>
        <Route path="/regInfo" component={Information}/>
    </Router>,
    document.body.appendChild(document.createElement('div'))
);
