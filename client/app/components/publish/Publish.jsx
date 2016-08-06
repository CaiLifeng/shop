import React from 'react';

export default class Publish extends React.Component {
    render() {
        return (
            <div className="publish">
                <div className="weui_cells weui_cells_form m-t-0">
                    <div className="weui_cell">
                        <div className="weui_cell_bd weui_cell_primary">
                            <input className="weui_input" type="number" pattern="[0-9]*" placeholder="标题"/>
                        </div>
                    </div>
                    <div className="weui_cell">
                        <div className="weui_cell_bd weui_cell_primary">
                            <textarea className="weui_textarea" placeholder="描述" rows="3"></textarea>
                            <div className="weui_textarea_counter"><span>0</span>/200</div>
                        </div>
                    </div>
                    <div className="weui_cell">
                        <div className="weui_cell_bd weui_cell_primary">
                            <input className="weui_input" type="number" pattern="[0-9]*" placeholder="价格"/>
                        </div>
                    </div>
                    <div className="weui_cell weui_cell_select">
                        <div className="weui_cell_bd weui_cell_primary">
                            <select className="weui_select" name="select1">
                                <option selected="" value="1">微信号</option>
                                <option value="2">QQ号</option>
                                <option value="3">Email</option>
                            </select>
                        </div>
                    </div>
                    <div className="weui_cell">
                        <div className="weui_cell_bd weui_cell_primary">
                            <i className="fa fa-location-arrow" aria-hidden="true"></i>
                            <span className="m-l-10">广东省深圳市</span>
                        </div>
                    </div>
                </div>
                <div className="weui_cells weui_cells_form">
                    <div className="weui_cell">
                        <div className="weui_cell_bd weui_cell_primary">
                            <div className="weui_uploader">
                                <div className="weui_uploader_hd weui_cell">
                                    <div className="weui_cell_bd weui_cell_primary">图片上传</div>
                                    <div className="weui_cell_ft">0/2</div>
                                </div>
                                <div className="weui_uploader_bd">
                                    <ul className="weui_uploader_files">
                                        <li className="weui_uploader_file" style={{'background-url':'./images/photo.jpg'}}></li>
                                        <li className="weui_uploader_file"></li>
                                        <li className="weui_uploader_file"></li>
                                        <li className="weui_uploader_file weui_uploader_status">
                                            <div className="weui_uploader_status_content">
                                                <i className="weui_icon_warn"></i>
                                            </div>
                                        </li>
                                        <li className="weui_uploader_file weui_uploader_status">
                                            <div className="weui_uploader_status_content">50%</div>
                                        </li>
                                    </ul>
                                    <div className="weui_uploader_input_wrp">
                                        <input className="weui_uploader_input" type="file" accept="image/jpg,image/jpeg,image/png,image/gif" multiple=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="weui_btn_area">
                    <a className="weui_btn weui_btn weui_btn_plain_primary" href="javascript:" id="showTooltips">确认发布</a>
                </div>
            </div>

        );
    }
}
