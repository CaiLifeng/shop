import React from 'react';

export default class Contact extends React.Component {
    render() {
        return (
            <div className="fixed-bottom contact">
                <div className="per-info">
                    <img className="per-logo" src="http://pic5.duowan.com/news/1006/139656342925/139657474733.jpg"/>
                    <span className="per-name">程先生</span>
                </div>
                <div className="tab chat-tab">
                    <div className="icon-top">
                        <i className="fa fa-weixin" aria-hidden="true"></i>
                    </div>
                    <div className="tab-font">聊天</div>
                </div>
                <a href="tel:10086" className="tab contact-tab">
                    <div className="icon-top">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                    </div>
                    <div className="tab-font">联系看房</div>
                </a>
            </div>
        );
    }
}