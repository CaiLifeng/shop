import {
    SEARCH_TEXT_CHANGE,
    CLEAR_SEARCH,
    RECEIVE_PRODUCTS,
    GET_CITY_SUCCESS,
    GET_REGION_SUCCESS,
    FILTER_BAR_CHANGE,
    CLEAR_PRODUCTS,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_SUCCESS
} from '../constants/ActionTypes'
import config from '../config.js';
import axiosIns from '../utils.js';
import jsonp from 'jsonp';


//搜索文字改变的情况下
export const searchTextChange = (text) => ({
    type: SEARCH_TEXT_CHANGE,
    text
});

//清除搜索关键字
export const clearSearch = () => ({
    type: CLEAR_SEARCH,
});

//从后端获取到产品列表
export const receiveProducts = (data)=>({
    type: RECEIVE_PRODUCTS,
    data
});

//开始发产品请求
export const fetchProductsRequest = (data)=>({
    type: FETCH_PRODUCTS_REQUEST,
    data
});

//请求产品列表成功
export const fetchProductsSuccess = (data)=>({
    type: FETCH_PRODUCTS_SUCCESS,
    data
});

//请求产品失败
export const fecthProductsFaile = (data)=>({
    type: FETCH_PRODUCTS_FAILURE,
    data
});


//获取定位城市成功
export const getCitySuccess = (data)=>({
    type: GET_CITY_SUCCESS,
    data
});

//根据城市获取区成功
export const getRegionSuccess = (data)=>({
    type: GET_REGION_SUCCESS,
    data
});
//搜索栏改变
export const filterBarChange = (data)=>({
    type: FILTER_BAR_CHANGE,
    data
});
//将产品列表清空
export const clearProducts = ()=>({
    type: CLEAR_PRODUCTS
});

//获取产品
export const getProducts = ({pageIndex = 0, address = '', category = '', priceMin = '', priceMax = '', tradeType = '', title = '', pageSize = 5}) => dispatch => {
    let url = config.apiUrl.products + '?pageSize=' + pageSize + '&pageIndex=' + pageIndex + '&address=' + address + '&category=' + category + '&priceMin=' + priceMin + '&priceMax=' + priceMax + '&tradeType=' + tradeType + '&title=' + title;
    return axiosIns.get(url).then(function (data) {
        if (data.resultCode == 1) {
            dispatch(receiveProducts(data));
        }
        else {
            console.log(data.resultMsg);
        }
    }).catch(function (error) {
        console.log(error);
    });
};

//根据定位获取所在城市
export const getCity = () => dispatch => {
    if ("geolocation" in navigator) {
        function success(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            return jsonp('http://api.map.baidu.com/geocoder/v2/?output=json&ak=' + config.baiduKey + '&pois=0&location=' + latitude + ',' + longitude, null, function (err, data) {
                if (err) {
                    alert(err.message);
                } else {
                    if (data.status == 0) {
                        dispatch(getCitySuccess(data.result.addressComponent.city));
                    }
                    else {
                        alert('定位失败');
                    }
                }
            });
        }

        function error() {
            alert('定位失败');
        }

        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert('您的浏览器不支持定位');
    }
};

//获取城市下面的区列表
export const getRegion = (city) =>dispatch => {
    return axiosIns.get(config.apiUrl.regions + '?city=' + city).then(function (data) {
        if (data.resultCode == 1) {
            dispatch(clearProducts());
            dispatch(getRegionSuccess(data.data));
        }
        else {
            console.log(data.resultMsg);
        }
    }).catch(function (error) {
        console.log(error);
    });
};
