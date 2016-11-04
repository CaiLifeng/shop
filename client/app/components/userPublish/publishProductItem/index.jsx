import React from 'react';
import { Router, Route, Link,hashHistory } from 'react-router'
import moment from 'moment'
import {Toast,Dialog} from 'react-weui';

const {Alert, Confirm} = Dialog;

export default class Product extends React.Component {
    static propTypes = {
        id: React.PropTypes.string,
        imgSrc: React.PropTypes.string,
        title: React.PropTypes.string,
        category: React.PropTypes.string,
        createTime: React.PropTypes.string,
        price:React.PropTypes.number,
        delCallBack:React.PropTypes.func
    };

    static defaultProps = {
        id: '',
        imgSrc: '',
        title: '',
        category: '',
        createTime: '',
        price:'',
        delCallBack:undefined
    };

    handleDelete(id,e){
        e.stopPropagation();
        this.props.delCallBack(id);
    }

    handleToDetail(){
        const linkTo="/product/"+this.props.id;
        hashHistory.push(linkTo);
    }

    render() {
        const {id,imgSrc,title,category,createTime,price, ...others} = this.props;
        return (
            <div className="weui_panel_bd bd-b">
                <div onClick={this.handleToDetail.bind(this)} className="weui_media_box weui_media_appmsg">
                    <div className="weui_media_hd">
                        <img width="60px" height="60px" className="weui_media_appmsg_thumb" src={imgSrc} alt=""/>
                    </div>
                    <div className="weui_media_bd"  style={{'minHeight':'60px'}}>
                        <h4 className="weui_media_title">
                            {title}
                            <i className="fa fa-trash pull-right text-gray" onClick={this.handleDelete.bind(this,id)} aria-hidden="true"></i>
                        </h4>
                        <p className="text-gray text-md">{category}</p>
                        <span className="text-gray text-md pull-left">{moment(createTime).format('YYYY/MM/DD')}</span>
                        <span className="text-orange pull-right">{price+'元'}</span>
                    </div>
                </div>
            </div>
        );
    }
}
