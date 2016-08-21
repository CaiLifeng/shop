import React from 'react';
import Products from './Products';
import FilterBar from './FilterBar';
import WeUI from 'react-weui';
import axios from 'axios';
import config from '../../config.js';
require('./../App.css');

const {SearchBar} = WeUI;

export default class Home extends React.Component {
    state = {
        productList: [],
        city: '',
        isMore: true,
        searchText:'',
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

    getProducts({pageIndex=0, address='', category='', priceMin='', priceMax='',tradeType='',title='',pageSize=10}) {
        const that = this;
        let url = config.apiUrl.products + '?pageSize=' + pageSize + '&pageIndex=' + pageIndex + '&address=' + address + '&category=' + category + '&priceMin=' + priceMin + '&priceMax=' + priceMax + '&tradeType=' + tradeType + '&title=' + title;
        axios.get(url).then(function (response) {
            if (response.status == 200) {
                if (response.data.resultCode == 1) {
                    if (response.data.pageCount === pageIndex + 1) {
                        that.setState({isMore: false});
                    }
                    that.setState({
                        productList: that.state.productList.concat(response.data.data)
                    });
                }
                else {
                    console.log(response);
                }
            }
            else {
                console.log(response);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    //获取定位
    getLocation() {
        const that = this;
        if ("geolocation" in navigator) {
            function success(position) {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;

                getFilterData();
                function getFilterData() {
                    axios.get(config.apiUrl.districts + '?latitude=' + latitude + '&longitude=' + longitude).then(function (response) {
                        if (response.status == 200) {
                            if (response.data.resultCode == 1) {
                                console.log(response);
                                let districts = response.data.data;
                                let filterDate = that.state.filterData.slice(0);
                                filterDate[0].data = filterDate[0].data.concat(districts);

                                console.log(districts);
                                that.setState({filterData: filterDate});
                            }
                            else {
                                console.log(response);
                            }
                        }

                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            }

            function error() {
                alert('定位失败');
            }

            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            alert('您的浏览器不支持定位');
        }
    }

    componentWillMount() {
        this.getProducts({pageIndex:0});
        this.getLocation();
    }

    filterBarSelectChange(data) {
        this.setState({productList: []});
        let params = {pageSize: 10, pageIndex: 0};
        data.forEach(function (item, index, array) {
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
        console.log(params);
        this.getProducts(params);
    }

    onMoreClick() {
        this.getProducts();
    }

    handelSearch(text) {
        console.log(text);
        if(this.state.searchText!==text){
            this.state.productList=[];
            this.state.searchText=text;
            this.getProducts({title: this.state.searchText});
        }

    }

    handelClear(text) {
        this.state.filterData.forEach(function(item,index,array){
            item.selected='';
        });
    }

    render() {
        return (
            <div className="content">
                <SearchBar onChange={this.handelSearch.bind(this)} onClear={this.handelClear.bind(this)}
                           placeholder="搜索标题"/>
                <FilterBar data={this.state.filterData} onSelectChange={this.filterBarSelectChange.bind(this)}/>
                <Products data={this.state.productList} isMore={this.state.isMore}
                          onMoreClick={this.getProducts.bind(this)}/>
            </div>
        );
    }
}

