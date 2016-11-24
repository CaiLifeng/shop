import React from 'react';
import Product from '../../productItem';

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

    //下拉加载
    handleScroll(){
        if(this.props.isMore){
            let vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            let bottom_dis=this.refs.moreTag.getBoundingClientRect().bottom;
            if(bottom_dis+50<=vh){
                console.log(this.refs.moreTag.getBoundingClientRect().bottom);
                this.onMoreClick();
            }
        }
    }

    render() {
        const {data,isMore,className,...others} = this.props;

        let productsList = data.map(function (item, idx) {
            return (
                <Product imgSrc={item.images[0]} key={idx} id={item._id} price={item.price} category={item.category} title={item.title}
                         createTime={item.createTime}></Product>
            );
        });
        return (
            <div className={className} ref="productListContent" onScroll={this.handleScroll.bind(this)}>
                {productsList}
                <div ref="moreTag" className="text-center p-10">
                    {
                        isMore?<i className="fa fa-spinner fa-spin fa-2 fa-fw"></i>:'已全部加载'
                    }
                </div>
            </div>
        );
    }
}
