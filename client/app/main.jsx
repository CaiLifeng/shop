import React from 'react';
import {Router, Route, browserHistory, hashHistory, IndexRoute} from 'react-router';
import ReactDOM from 'react-dom';
import App from './components/App';
import Home from './components/home';
import Publish from './components/publish/index';
import ProductDetail from './components/productDetail';
import Login from './components/login';
import Information from './components/information';
import UserCollect from './components/userCollect';
import Personal from './components/personal/index';
import UserPublish from './components/userPublish';
import ChooseProvince from './components/chooseProvince';
import ChooseCity from './components/ChooseCity';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'


require('weui');
require('../node_modules/font-awesome/css/font-awesome.min.css');
require('../node_modules/react-image-gallery/build/image-gallery.css');


const middleware = [thunk];
middleware.push(createLogger());
const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

ReactDOM.render(
    <Provider store={store}>
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
            <Route path="/chooseProvince" component={ChooseProvince}/>
            <Route path="/province/:id" component={ChooseCity}/>
        </Router>

    </Provider>,
    document.body.appendChild(document.createElement('div'))
);
