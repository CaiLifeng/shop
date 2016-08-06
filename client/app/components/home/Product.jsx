import React from 'react';

export default class Product extends React.Component {

    render() {
        const {imgSrc,title,digest, ...others} = this.props;

        return (
            <div className="weui_panel_bd bd-b">
                <a href="javascript:void(0);" className="weui_media_box weui_media_appmsg">
                    <div className="weui_media_hd">
                        <img className="weui_media_appmsg_thumb" src={imgSrc} alt=""/>
                    </div>
                    <div className="weui_media_bd">
                        <h4 className="weui_media_title">{title}</h4>
                        <p className="weui_media_desc">{digest}</p>
                    </div>
                </a>
            </div>

        );
    }
}
