import React from 'react';
import {section,ButtonArea,Button} from 'react-weui';
import { browserHistory,hashHistory } from 'react-router';
import {Link,History} from 'react-router';

export default class Panel extends React.Component {
    loginOut(){
        // localStorage.clear();
        hashHistory.push('/login');
    }
    render() {
        return (
            <div>
            <div className="weui_panel">
                <div className="weui_panel_bd">
                    <div className="weui_media_box weui_media_small_appmsg">
                        <div className="weui_cells weui_cells_access">
                            <a className="weui_cell" href="javascript:;">
                                <div className="weui_cell_hd"></div>
                                <div className="weui_cell_bd weui_cell_primary">
                                    <Link to="/userPublish" className="link">
                                        <p>我发布的产品</p>
                                    </Link>
                                </div>
                                <span className="weui_cell_ft"></span>
                            </a>
                            <a className="weui_cell" href="javascript:;">
                                <div className="weui_cell_hd"></div>
                                <div className="weui_cell_bd weui_cell_primary">
                                    <Link to="/userCollect" className="link">
                                        <p>我的收藏</p>
                                    </Link>
                                </div>
                                <span className="weui_cell_ft"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
                <section>
                    <ButtonArea>
                        <Button type="warn" onClick={this.loginOut.bind(this)}>退出登录</Button>
                    </ButtonArea>
                </section>
                </div>
        );
    }
}