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
        filterData: [{
            name: '区域',
            id: '1',
            data: ['不限']
        }, {
            name: '品种',
            id: '2',
            data: config.categoryList
        }, {
            name: '方式',
            id: '3',
            data: ['不限', '面交', '在线']
        }, {
            name: '价格',
            id: '4',
            data: config.priceList
        }]
    };

    getProducts(pageSize=10,pageIndex=0) {
        const that = this;
        axios.get(config.apiUrl.products+'?pageSize='+pageSize+'&pageIndex='+pageIndex).then(function (response) {
            if (response.status == 200) {
                if (response.data.resultCode == 1) {
                    console.log(response.data.data);
                    that.setState({
                        productList: that.state.productList.concat(response.data.data)
                    });
                }
                else {
                    console.log(response);
                }
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
                    axios.get(config.apiUrl.districts+'?latitude='+latitude+'&longitude='+longitude).then(function (response) {
                        if (response.status == 200) {
                            if (response.data.resultCode == 1) {
                                console.log(response);
                                let districts=response.data.data;
                                let filterDate=that.state.filterData.slice(0);
                                filterDate[0].data=filterDate[0].data.concat(districts);

                                console.log(districts);
                                that.setState({filterData:filterDate});
                            }
                            else {
                                console.log(response);
                            }
                        }

                    }).catch(function (error) {
                        console.log(error);
                    });
                }

            };

            function error() {
                alert('定位失败');
            };
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            alert('您的浏览器不支持定位');
        }
    }

    componentWillMount() {
        this.getProducts();
        this.getLocation();
    }

    filterBarSelectChange(data){

    }

    onMoreClick(pageIndex,pageSize){

    }

    render() {
        return (
            <div className="content">
                <SearchBar/>
                <FilterBar data={this.state.filterData} onSelectChange={this.filterBarSelectChange.bind(this)}/>
                <Products data={this.state.productList} onMoreClick={this.getProducts.bind(this)}/>
            </div>
        );
    }
}

