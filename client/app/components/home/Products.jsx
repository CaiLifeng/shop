import React from 'react';
import Product from './Product';
import config from '../../config.js'

export default class Products extends React.Component {
    static propTypes = {
        data: React.PropTypes.array,
        isMore:React.PropTypes.bool,
        onMoreClick: React.PropTypes.func
    };

    static defaultProps = {
        data: [],
        isMore:true,
        onMoreClick: undefined
    };


    state={
        pageIndex:0
    };

    onMoreClick(){
        if(this.props.onMoreClick){
            this.state.pageIndex++;
            this.props.onMoreClick({pageIndex:this.state.pageIndex});
        }
    };

    render() {
        const {data,isMore,className,...others} = this.props;

        var productsList = data.map(function (item, idx) {
            return (
                <Product imgSrc={item.images[0]} key={idx} id={item._id} price={item.price} category={item.category} title={item.title}
                         createTime={item.createTime}></Product>
            );
        });
        return (
            <div className={className}>
                {productsList}
                <a className="text-center more-link" onClick={this.onMoreClick.bind(this)} href="javascript:void(0);">{isMore?'查看更多':'已全部加载'}</a>
            </div>
        );
    }
}
