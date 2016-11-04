import {SEARCH_TEXT_CHANGE,CLEAR_SEARCH,RECEIVE_PRODUCTS,GET_CITY_SUCCESS,GET_REGION_SUCCESS} from '../constants/ActionTypes'
import config from '../config.js';



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
    switch (action.type) {
        case SEARCH_TEXT_CHANGE:
            if (state.searchText !== action.text) {
                return Object.assign({},state,{productList:[],searchText:action.text});
            }
            break;
        case GET_CITY_SUCCESS:
            return Object.assign({},state,{city:action.data});
            break;
        case GET_REGION_SUCCESS:
            let districts = data.data;
            let filterDate = state.filterData.slice(0);
            filterDate[0].data = filterDate[0].data.concat(districts);
            return Object.assign({},state,{filterData: filterDate});
            break;
        case RECEIVE_PRODUCTS:
            if (action.data.pageCount === action.data.pageIndex + 1||action.data.pageCount==0) {
                return Object.assign({},state,{isMore:false,productList:state.productList.concat(action.data.data)});
            }
            else{
                return Object.assign({},state,{productList:state.productList.concat(action.data.data)});
            }
        default:
            return state
    }
};

export {home};

