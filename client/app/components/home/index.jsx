import React from 'react';
import Products from './products';
import FilterBar from './filterBar';
import WeUI from 'react-weui';
import config from '../../config.js';
import Header from './header';
import jsonp from 'jsonp';
import {connect} from 'react-redux';
import _ from 'lodash';
import {
    searchTextChange,
    clearSearch,
    getProducts,
    getCity,
    getRegion,
    getCitySuccess,
    filterBarChange,
    clearProducts,
} from '../../actions/homeAction'

require('./../App.css');

const {SearchBar} = WeUI;

class Home extends React.Component {

    componentWillMount() {
        const dispatch = this.props.dispatch;
        if (this.props.location.query.city) {
            dispatch(getCitySuccess(this.props.location.query.city));
        }
        else {
            dispatch(getCity());
        }
    }


    componentWillReceiveProps(nextProps) {
        const dispatch = nextProps.dispatch;
        //搜索框中文字改变了
        if (nextProps.data.searchText !== this.props.data.searchText) {
            dispatch(getProducts({
                title: nextProps.data.searchText,
                pageSize: 10,
                pageIndex: 0,
                address: nextProps.data.city
            }))
        }
        //所在城市改变了
        if (nextProps.data.city !== this.props.data.city) {
            dispatch(getRegion(nextProps.data.city));
            dispatch(getProducts({pageSize: 10, pageIndex: 0, address: nextProps.data.city}));
        }
        //搜索条件改变了
        if (!_.isEqual(nextProps.data.filterData, this.props.data.filterData)) {
            let params = {pageSize: 10, pageIndex: 0, address: this.props.data.city};
            nextProps.data.filterData.forEach(function (item, index, array) {
                if (item.type == 'price') {
                    if (item.selected !== '不限') {
                        params.priceMin = item.selected.split('~')[0];
                        params.priceMax = item.selected.split('~')[1];
                    }
                }
                else {
                    params[item.type] = item.selected == '不限' ? '' : item.selected;
                }
            });
            dispatch(getProducts(params));
        }
    }

    filterBarSelectChange(data) {
        this.props.dispatch(filterBarChange(data));
    }

    handelSearch(text) {
        const dispatch = this.props.dispatch;
        dispatch(searchTextChange(text));
    }

    handelClear() {
        this.state.filterData.forEach(function (item, index, array) {
            item.selected = '';
        });
    }

    handelMoreClick() {
        const dispatch = this.props.dispatch;
        dispatch(getProducts({}));
    }

    render() {
        const {city, productList, isMore, filterData, ...others} = this.props.data;
        return (
            <div className="content">
                <Header city={city}/>
                <SearchBar onChange={this.handelSearch.bind(this)} onClear={this.handelClear.bind(this)}
                           placeholder="搜索标题"/>
                <FilterBar data={filterData} onSelectChange={this.filterBarSelectChange.bind(this)}/>
                <Products className="m-t-0 products" data={productList} isMore={isMore}
                          onMoreClick={this.handelMoreClick.bind(this)}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.home
});

export default connect(mapStateToProps)(Home)

