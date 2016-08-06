import React from 'react';
import ImageGallery from 'react-image-gallery';
import Contact from './Contact'

export default class ProductDetail extends React.Component {
    handleImageLoad(event) {
        console.log('Image loaded ', event.target)
    }

    handlePause() {
        this._imageGallery.pause()
    }
    render() {

        const images = [
            {
                original: 'http://pic5.duowan.com/news/1006/139656342925/139657474733.jpg',
                thumbnail: 'http://pic5.duowan.com/news/1006/139656342925/139657474733.jpg',
            },
            {
                original: 'http://pic5.duowan.com/news/1006/139656342925/139657474733.jpg',
                thumbnail: 'http://pic5.duowan.com/news/1006/139656342925/139657474733.jpg'
            },
            {
                original: 'http://pic5.duowan.com/news/1006/139656342925/139657474733.jpg',
                thumbnail: 'http://pic5.duowan.com/news/1006/139656342925/139657474733.jpg'
            }
        ];

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
                    <p className="title">标题</p>
                    <p className="price">￥2300</p>
                    <div className="det-line">
                        <div className="span-group">
                            <span className="text-gray">户型：</span>
                            <span>2室一厅</span>
                        </div>
                        <div className="span-group">
                            <span className="text-gray">面积：</span>
                            <span>54平方米</span>
                        </div>
                    </div>
                    <div className="det-line">
                        <div className="span-group">
                            <span className="text-gray">户型：</span>
                            <span>2室一厅</span>
                        </div>
                        <div className="span-group">
                            <span className="text-gray">面积：</span>
                            <span>54平方米</span>
                        </div>
                    </div>
                    <div className="det-line">
                        <div className="span-group">
                            <span className="text-gray">地址：</span>
                            <span>广东省深圳市南山区</span>
                        </div>
                    </div>
                </div>

                <div className="weui_panel">
                    <div className="weui_panel_hd">详情</div>
                    <div className="weui_panel_bd">
                        <div className="weui_media_box weui_media_text">
                            <p className="text-gray text-sm">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
                        </div>
                    </div>
                </div>

                <Contact>
                </Contact>
            </div>
        );
    }
}