import React from 'react';
import config from '../../config.js'
import axiosIns from '../../utils.js';
import { Router, Route, Link } from 'react-router';
import './index.less';

export default class ChooseCity extends React.Component {
    state = {
        cities: []
    };

    getCities(provinceCode) {
        let that = this;
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
        this.getCities(this.props.params.id);
    }

    render() {
        let that = this;
        let cityList = this.state.cities.map(function (item, idx) {
            return (
                <Link key={idx} className="weui_cell" to={{pathname:'/',query:{city:item.name}}}>
                    <div className="weui_cell_hd"></div>
                    <div className="weui_cell_bd weui_cell_primary">
                        <p>{item.name}</p>
                    </div>
                </Link>
            );
        });

        return (
            <div className="choose-city">
                <div className="weui_panel">
                    <div className="weui_panel_hd">
                        <Link to="ChooseProvince" className="link">
                            <i className="fa fa-2 fa-chevron-left" aria-hidden="true"></i>
                            <span className="m-l-5">返回</span>
                        </Link>
                    </div>
                    <div className="weui_panel_bd">
                        <div className="weui_media_box weui_media_small_appmsg">
                            <div className="weui_cells weui_cells_access">
                                {cityList}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}