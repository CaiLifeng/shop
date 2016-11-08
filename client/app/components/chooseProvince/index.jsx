import React from 'react';
import config from '../../config.js'
import axiosIns from '../../utils.js';
import { Router, Route, Link } from 'react-router';
import jsonp from 'jsonp';
import './index.less';

export default class ChooseProvince extends React.Component {
    state = {
        city: '',
        provinces: [],
        cities: []
    };

    //获取定位
    getLocation() {
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

    getProvinces() {
        let that = this;
        axiosIns.get(config.apiUrl.provinces).then(function (data) {
            if (data.resultCode == 1) {
                that.setState({provinces: data.data});
            }
            else {
                console.log(data.resultMsg);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    getCities(provinceCode) {
        let that = this;
        that.setState({isCity:true});
        axiosIns.get(config.apiUrl.cities + '?code=' + provinceCode).then(function (data) {
            if (data.resultCode == 1) {
                that.setState({cities: data.data});
            }
            else {
                console.log(data.resultMsg);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    componentWillMount() {
        if(this.props.location.query.city){
            this.setState({city: this.props.location.query.city});
        }
        else{
            this.getLocation();
        }
        this.getProvinces();
    }

    render() {
        let that = this;
        let provinceList = this.state.provinces.map(function (item, idx) {
            let url='province/'+item.code;
            return (
                <Link to={url} key={idx} className="weui_cell link">
                    <div className="weui_cell_hd"></div>
                    <div className="weui_cell_bd weui_cell_primary">
                        <p>{item.name}</p>
                    </div>
                    <span className="weui_cell_ft"></span>
                </Link>
            );
        });

        return (
            <div className="choose-province">
                    <div className="weui_panel">
                        <div className="weui_panel_hd">
                            <i className="fa fa-2 fa-map-marker" aria-hidden="true"></i>
                            <span className="m-l-5">当前定位</span>
                        </div>
                        <div className="weui_panel_bd">
                            <div className="weui_media_box weui_media_small_appmsg">
                                <div className="weui_cells weui_cells_access">
                                    <Link to={{pathname:'/',query:{city:this.state.city}}} className="weui_cell link">
                                        <div className="weui_cell_hd"></div>
                                        <div className="weui_cell_bd weui_cell_primary">
                                            <p>{this.state.city}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="weui_panel">
                        <div className="weui_panel_hd">热门城市</div>
                        <div className="weui_panel_bd">
                            <div className="weui_media_box weui_media_small_appmsg">
                                <div className="weui_cells weui_cells_access">
                                    <Link to={{pathname:'/',query:{city:'广州市'}}} className="weui_cell link">
                                    <div className="weui_cell_hd"></div>
                                        <div className="weui_cell_bd weui_cell_primary">
                                            <p>广州市</p>
                                        </div>

                                    </Link>
                                    <Link to={{pathname:'/',query:{city:'深圳市'}}} className="weui_cell link">

                                    <div className="weui_cell_hd"></div>
                                        <div className="weui_cell_bd weui_cell_primary">
                                            <p>深圳市</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="weui_panel">
                        <div className="weui_panel_hd">按省份选择城市</div>
                        <div className="weui_panel_bd">
                            <div className="weui_media_box weui_media_small_appmsg">
                                <div className="weui_cells weui_cells_access">
                                    {provinceList}
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
        );
    }


}