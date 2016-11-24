import React from 'react';
import { Router, Route, Link } from 'react-router'
import moment from 'moment'
import './index.less'

export default class Product extends React.Component {
    render() {
        const {id,imgSrc,title,digest,category,createTime,price, ...others} = this.props;
        const linkTo="/product/"+id;
        return (
            <div className="weui_panel_bd bd-b">
                <Link to={linkTo} className="weui_media_box weui_media_appmsg">
                    <div className="weui_media_hd">
                        <img width="60px" height="60px" className="weui_media_appmsg_thumb" src={imgSrc} alt=""/>
                    </div>
                    <div className="weui_media_bd"  style={{'minHeight':'60px'}}>
                        <h4 className="weui_media_title">{title}</h4>
                        <p className="text-gray text-md">{category}</p>
                        <span className="text-gray text-md pull-left">{moment(createTime).format('YYYY/MM/DD')}</span>
                        <span className="text-orange pull-right">{price+'元'}</span>
                    </div>
                </Link>
            </div>
        );
    }
}
