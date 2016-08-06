import React from 'react';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    getInitialState(){
        return {liked: false};
    }
    handleClick(){
        this.setState({liked: !this.state.liked});
    }

    render() {
        return (
            <div className="weui_search_bar" id="search_bar">
                <form className="weui_search_outer">
                    <div className="weui_search_inner">
                        <i className="weui_icon_search"></i>
                        <input type="search" className="weui_search_input" id="search_input" placeholder="搜索" required/>
                        <a href="javascript:" className="weui_icon_clear" id="search_clear"></a>
                    </div>
                    <label for="search_input" className="weui_search_text" id="search_text">
                        <i className="weui_icon_search"></i>
                        <span>搜索</span>
                    </label>
                </form>
                <a href="javascript:" className="weui_search_cancel" id="search_cancel">取消</a>
            </div>
        );
    }
}
