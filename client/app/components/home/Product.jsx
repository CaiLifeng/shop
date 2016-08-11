import React from 'react';
import { Router, Route, Link } from 'react-router'

export default class Product extends React.Component {

    render() {
        const {id,imgSrc,title,digest, ...others} = this.props;
        const linkTo="/product/"+id;
        return (
            <div className="weui_panel_bd bd-b">
                <Link to={linkTo} className="weui_media_box weui_media_appmsg">
                    <div className="weui_media_hd">
                        <img className="weui_media_appmsg_thumb" src={imgSrc} alt=""/>
                    </div>
                    <div className="weui_media_bd">
                        <h4 className="weui_media_title">{title}</h4>
                        <p className="weui_media_desc">{digest}</p>
                    </div>
                </Link>
            </div>

        );
    }
}
