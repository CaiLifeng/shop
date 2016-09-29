import React from 'react';
import { Router, Route, Link } from 'react-router'
import moment from 'moment'
import {Toast,Dialog} from 'react-weui';
import config from '../../config.js';
import axiosIns from '../../utils.js';

const {Alert, Confirm} = Dialog;

export default class Product extends React.Component {
    static propTypes = {
        id: React.PropTypes.string,
        imgSrc: React.PropTypes.string,
        title: React.PropTypes.string,
        category: React.PropTypes.string,
        createTime: React.PropTypes.string,
        price:React.PropTypes.number,
        delCallBack:React.PropTypes.func
    };

    static defaultProps = {
        id: '',
        imgSrc: '',
        title: '',
        category: '',
        createTime: '',
        price:'',
        delCallBack:undefined
    };

    handleDelete(id,event){
        console.log(event);
        event.stopPropagation();
        event.stopImmediatePropagation();
        this.props.delCallBack(id);

    }

    render() {
        const {id,imgSrc,title,category,createTime,price, ...others} = this.props;
        const linkTo="/product/"+id;
        return (
            <div className="weui_panel_bd bd-b">
                <a href="#/product/57c560c60fa3c9e01c61446d" className="weui_media_box weui_media_appmsg">
                    <div className="weui_media_hd">
                        <img width="60px" height="60px" className="weui_media_appmsg_thumb" src={imgSrc} alt=""/>
                    </div>
                    <div className="weui_media_bd"  style={{'min-height':'60px'}}>
                        <h4 className="weui_media_title">
                            {title}
                            <i className="fa fa-trash pull-right text-gray" onClick={this.handleDelete.bind(this,id,event)} aria-hidden="true"></i>
                        </h4>
                        <p className="text-gray text-md">{category}</p>
                        <span className="text-gray text-md pull-left">{moment(createTime).format('YYYY/MM/DD')}</span>
                        <span className="text-orange pull-right">{price+'元'}</span>
                    </div>
                </a>
            </div>
        );
    }
}
