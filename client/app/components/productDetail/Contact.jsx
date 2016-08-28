import React from 'react';

export default class Contact extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
        telephone: React.PropTypes.string,
        image:React.PropTypes.string
    };

    static defaultProps = {
        name: '',
        telephone: '',
        image:''
    };
    render() {
        return (
            <div className="fixed-bottom contact">
                <div className="per-info">
                    <img className="per-logo" src={this.props.image}/>
                    <span className="per-name">{this.props.name}</span>
                </div>
                <div className="tab chat-tab">
                    <div className="icon-top">
                        <i className="fa fa-weixin" aria-hidden="true"></i>
                    </div>
                    <div className="tab-font">聊天</div>
                </div>
                <a href={"tel:"+this.props.telephone} className="tab contact-tab">
                    <div className="icon-top">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                    </div>
                    <div className="tab-font">联系看房</div>
                </a>
            </div>
        );
    }
}