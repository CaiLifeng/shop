import React from 'react';
import {Link,History} from 'react-router';

export default class NavBar extends React.Component {
    render() {
        return (
            <div className="fixed-bottom nav">
                <ul>
                    <li className="tab">
                        <Link to="/home" className="link">
                            <div className="icon-top">
                                <i className="fa fa-home" aria-hidden="true"></i>
                            </div>
                            <div className="nav-font">首页</div>
                        </Link>
                    </li>
                    <li className="tab">
                        <Link to="/publish" className="link">
                            <div className="icon-top">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </div>
                            <div className="nav-font">发布</div>
                        </Link>
                    </li>
                    <li className="tab">
                        <Link to="/home" className="link">
                            <div className="icon-top">
                                <i className="fa fa-commenting" aria-hidden="true"></i>
                            </div>
                            <div className="nav-font">消息</div>
                        </Link>
                    </li>
                    <li className="tab">
                        <Link to="/personal" className="link">
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