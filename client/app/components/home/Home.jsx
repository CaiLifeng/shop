import React from 'react';
import Products from './Products';
import FilterBar from './FilterBar';
import WeUI from 'react-weui';
import axiosIns from '../../utils.js';
import config from '../../config.js';
import Header from './Header';
import jsonp from 'jsonp'

require('./../App.css');

const {SearchBar} = WeUI;

export default class Home extends React.Component {
    state = {
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

    getProducts({pageIndex=0, address='', category='', priceMin='', priceMax='',tradeType='',title='',pageSize=5}) {
        const that = this;
        let url = config.apiUrl.products + '?pageSize=' + pageSize + '&pageIndex=' + pageIndex + '&address=' + address + '&category=' + category + '&priceMin=' + priceMin + '&priceMax=' + priceMax + '&tradeType=' + tradeType + '&title=' + title;
        axiosIns.get(url).then(function (data) {
            if (data.resultCode == 1) {
                if (data.pageCount === pageIndex + 1) {
                    that.setState({isMore: false});
                }
                that.setState({
                    productList: that.state.productList.concat(data.data)
                });
            }
            else {
                console.log(data.resultMsg);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }


    //根据城市获取所在地区列表
    getRegions() {
        let that=this;
        axiosIns.get(config.apiUrl.regions+'?city='+this.props.location.query.city).then(function (data) {
            if (data.resultCode == 1) {
                let districts = data.data;
                let filterDate = that.state.filterData.slice(0);
                filterDate[0].data = filterDate[0].data.concat(districts);
                that.setState({filterData: filterDate});
            }
            else {
                console.log(data.resultMsg);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    //获取定位
    getCity() {
        const that = this;
        if ("geolocation" in navigator) {
            function success(position) {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                jsonp('http://api.map.baidu.com/geocoder/v2/?output=json&ak=' + config.baiduKey + '&pois=0&location=' + latitude + ',' + longitude, null, function (err, data) {
                    if (err) {
                        alert(err.message);
                    } else {
                        if (data.status == 0) {
                            that.setState({city: data.result.addressComponent.city});
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
    }

    componentWillMount() {
        if (this.props.location.query.city) {
            this.setState({city: this.props.location.query.city});
        }
        else {
            this.getCity();
        }
        this.getRegions();
        this.getProducts({pageIndex: 0});
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
        if (this.state.searchText !== text) {
            this.state.productList = [];
            this.state.searchText = text;
            this.getProducts({title: this.state.searchText});
        }

    }

    handelClear(text) {
        this.state.filterData.forEach(function (item, index, array) {
            item.selected = '';
        });
    }

    render() {
        return (
            <div className="content">
                <Header city={this.state.city}></Header>
                <SearchBar onChange={this.handelSearch.bind(this)} onClear={this.handelClear.bind(this)}
                           placeholder="搜索标题"/>
                <FilterBar data={this.state.filterData} onSelectChange={this.filterBarSelectChange.bind(this)}/>
                <Products className="m-t-0 products" data={this.state.productList} isMore={this.state.isMore}
                          onMoreClick={this.getProducts.bind(this)}/>
            </div>
        );
    }
}

