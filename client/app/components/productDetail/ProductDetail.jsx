import React from 'react';
import ImageGallery from 'react-image-gallery';
import Contact from './Contact';
import axios from 'axios';
import config from '../../config.js';

export default class ProductDetail extends React.Component {
    state = {
        productDetail:{}
    };

    componentDidMount() {
        let that=this;
        let url = config.apiUrl.products+'/'+this.props.params.productId;
        axios.get(url).then(function (response) {
            if (response.status == 200) {
                if (response.data.resultCode == 1) {
                    console.log(response.data.data);
                    that.setState({
                        productDetail:response.data.data
                    });
                }
                else {
                    console.log(response);
                }
            }
            else {
                console.log(response);
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

                <Contact>
                </Contact>
            </div>
        );
    }
}