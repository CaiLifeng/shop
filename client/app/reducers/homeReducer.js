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
import _ from 'lodash';


const initialState = {
    productList: [],
    city: '',
    isMore: true,
    searchText: '',
    filterData: [{
        name: '区域',
        type: 'address',
        id: '1',
        data: ['不限'],
        selected: ''
    }, {
        name: '品种',
        type: 'category',
        id: '2',
        data: config.categoryList,
        selected: ''
    }, {
        name: '方式',
        id: '3',
        data: config.tradeType,
        selected: '',
        type: 'tradeType'
    }, {
        name: '价格',
        id: '4',
        data: config.priceList,
        selected: '',
        type: 'price'
    }]
};

const home = (state = initialState, action) => {
    let newState = _.cloneDeep(state);
    switch (action.type) {
        //搜索框中改变
        case SEARCH_TEXT_CHANGE:
            if (state.searchText !== action.text) {
                return Object.assign({}, state, {productList: [], searchText: action.text});
            }
            break;
        //根据浏览器定位获取到城市
        case GET_CITY_SUCCESS:
            return Object.assign({}, state, {city: action.data});
            break;
        //根据城市获取到区
        case GET_REGION_SUCCESS:
            let regions = action.data;
            newState.filterData[0].data = initialState.filterData[0].data.concat(regions);
            return newState;
            break;
        //成功获取到产品列表
        case RECEIVE_PRODUCTS:
            if (action.data.pageCount === action.data.pageIndex + 1 || action.data.pageCount == 0) {
                return Object.assign({}, state, {
                    isMore: false,
                    productList: state.productList.concat(action.data.data)
                });
            }
            else {
                return Object.assign({}, state, {productList: state.productList.concat(action.data.data)});
            }
            break;
        //筛选栏改变了
        case FILTER_BAR_CHANGE:
            newState.productList = [];
            newState.filterData = action.data;
            return newState;
            break;
        //清空产品列表
        case CLEAR_PRODUCTS:
            newState.productList = [];
            return newState;
            break;
        default:
            return state
    }
};

export {home};

