import React from 'react';
import Product from './Product';
import axios from 'axios';
import config from '../../config.js'

export default class Products extends React.Component {
    static propTypes = {
        data: React.PropTypes.array,
        onMoreClick: React.PropTypes.func
    };

    state={
        pageIndex:0
    };

    onMoreClick(){
        if(this.props.onMoreClick){
            this.props.onMoreClick('',this.state.pageIndex+1);
        }
    };

    static defaultProps = {
        data: [],
        onMoreClick: undefined
    };


    render() {
        const {data,...others} = this.props;

        var productsList = data.map(function (item, idx) {
            return (
                <Product imgSrc={item.images[0]} key={idx} id={item._id} title={item.title}
                         digest={item.description}></Product>
            );
        });

        return (
            <div className="m-t-0 products">
                {productsList}
                <a className="text-center more-link" onClick={this.onMoreClick.bind(this)} href="javascript:void(0);">查看更多</a>
            </div>
        );
    }
}
