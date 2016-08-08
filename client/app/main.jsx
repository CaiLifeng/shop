import React from 'react';
import {Router,Route,browserHistory,IndexRoute} from 'react-router';
import ReactDOM from 'react-dom';
import App from './components/App';
import Products from './components/home/Products';
import Home from './components/home/Home';
import Publish from './components/publish/Publish';
import NavBar from './components/NavBar';
import ProductDetail from './components/productDetail/ProductDetail';
import Login from './components/Login';
import axios from 'axios';

require('weui');
require('../node_modules/font-awesome/css/font-awesome.min.css');
require('../node_modules/react-image-gallery/build/image-gallery.css');

//axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="home" component={Home} />
        <Route path="products" component={Home} />
        <Route path="publish" component={Publish} />
      </Route>
        <Route path="/product" component={ProductDetail} />
        <Route path="/login" component={Login} />
    </Router>,
    document.body.appendChild(document.createElement('div'))
);
