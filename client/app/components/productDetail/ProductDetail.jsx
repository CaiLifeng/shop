import React from 'react';
import ImageGallery from 'react-image-gallery';
import Contact from './Contact';
import axiosIns from '../../utils.js';
import config from '../../config.js';

export default class ProductDetail extends React.Component {
    state = {
        productDetail:{},
        user:{}
    };

    componentDidMount() {
        let that=this;
        let url = config.apiUrl.products+'/'+this.props.params.productId;
        axiosIns.get(url).then(function (data) {
            if (data.resultCode == 1) {
                that.setState({
                    productDetail:data.data,
                    user:data.data.user||{}
                });
            }
            else {
                console.log(data.resultMsg);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleImageLoad(event) {
        console.log('Image loaded ', event.target)
    }

    handlePause() {
        this._imageGallery.pause()
    }

    render() {
        let images=[];
        if(this.state.productDetail.images){
            this.state.productDetail.images.forEach(function(item,index,array){
                images.push({
                    original: item,
                    thumbnail: item,
                    originalClass: 'h-250',
                    thumbnailClass: 'h-250',
                });
            });
        }



        return (
            <div className="bg-default product-detail">
                <ImageGallery
                    ref={i => this._imageGallery = i}
                    items={images}
                    slideInterval={2000}
                    onImageLoad={this.handleImageLoad}
                    showBullets={true}
                    showIndex={true}
                    showThumbnails={false}
                    showNav={false}/>
                <div className="weui_panel p-l-10 p-r-10">
                    <p className="title">{this.state.productDetail.title}</p>
                    <p className="price">￥{this.state.productDetail.price}</p>
                    <div className="det-line">
                        <div className="span-group">
                            <span className="text-gray">交易方式：</span>
                            <span>{this.state.productDetail.tradeType}</span>
                        </div>
                        <div className="span-group">
                            <span className="text-gray">种类：</span>
                            <span>{this.state.productDetail.category}</span>
                        </div>
                    </div>
                    <div className="det-line">
                        <div className="span-group">
                            <span className="text-gray">地址：</span>
                            <span>{this.state.productDetail.address}</span>
                        </div>
                    </div>
                </div>

                <div className="weui_panel">
                    <div className="weui_panel_hd">详情</div>
                    <div className="weui_panel_bd">
                        <div className="weui_media_box weui_media_text">
                            <p className="text-gray text-sm">
                                {this.state.productDetail.description}
                            </p>
                        </div>
                    </div>
                </div>

                <Contact image={this.state.user.image} telephone={this.state.user.telephone} name={this.state.user.name}>
                </Contact>
            </div>
        );
    }
}