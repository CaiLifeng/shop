import React from 'react';
import {Link,History} from 'react-router';
import classNames from 'classnames'
import './index.less'

export default class NavBar extends React.Component {
    render() {
        let {className,...others}=this.props;

        let clz = classNames({
            nav: true
        }, className);

        return (
            <div className={clz}>
                <ul>
                    <li className="tab" >
                        <Link to="/home" className="link" activeStyle={{color: 'orange'}}>
                            <div className="icon-top">
                                <i className="fa fa-home" aria-hidden="true"></i>
                            </div>
                            <div className="nav-font">首页</div>
                        </Link>
                    </li>
                    <li className="tab">
                        <Link to="/publish" className="link" activeStyle={{color: 'orange'}}>
                            <div className="icon-top">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </div>
                            <div className="nav-font">发布</div>
                        </Link>
                    </li>
                    <li className="tab">
                        <Link to="/message" className="link" activeStyle={{color: 'orange'}}>
                            <div className="icon-top">
                                <i className="fa fa-commenting" aria-hidden="true"></i>
                            </div>
                            <div className="nav-font">消息</div>
                        </Link>
                    </li>
                    <li className="tab">
                        <Link to="/personal" className="link" activeStyle={{color: 'orange'}}>
                            <div className="icon-top">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </div>
                            <div className="nav-font">我的</div>
                        </Link>
                    </li>
                </ul>
            </div>

        );
    }
}