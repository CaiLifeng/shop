import React from 'react';
import config from '../../config.js'
import axiosIns from '../../utils.js';
import axios from 'axios';
import Qiniu from 'qiniu.js';
import jsonp from 'jsonp';
import {
    Form,
    FormCell,
    CellBody,
    Uploader,
    CellHeader,
    Select,
    Input,
    Label,
    CellFooter,
    vcodeSrc,
    Icon,
    TextArea,
    section,
    ButtonArea,
    Button
} from 'react-weui';
import {Toast} from 'react-weui';
import {browserHistory, hashHistory} from 'react-router';


export default class Publish extends React.Component {
    state = {
        title: null,
        price: null,
        category: '不限',
        tradeType: '不限',
        description: null,
        location: null,
        qnToken: null,
        latitude: null,
        longitude: null,
        demoFiles: [],
        showToast: false,
        toastText: null
    };

    categoryList = config.categoryList.map(function (item, index, array) {
        let obj = {};
        obj.value = item;
        obj.label = item;
        return obj;
    });
    tradeTypeList = config.tradeType.map(function (item, index, array) {
        let obj = {};
        obj.value = item;
        obj.label = item;
        return obj;
    });

    componentWillMount() {
        let that = this;
        //获取定位
        if ("geolocation" in navigator) {
            function success(position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude});
                jsonp('http://api.map.baidu.com/geocoder/v2/?output=json&ak=' + config.baiduKey + '&pois=0&location=' + latitude + ',' + longitude, null, function (err, data) {
                    if (err) {
                        alert(err.message);
                    } else {
                        if (data.status == 0) {
                            let location = data.result.addressComponent.province + data.result.addressComponent.city + data.result.addressComponent.district;
                            that.setState({
                                location: location
                            });

                        }
                        else {
                            console.log('获取位置失败');
                        }
                    }
                });
            };

            function error() {
                alert('定位失败');
            };
            navigator.geolocation.getCurrentPosition(success.bind(this), error);
        } else {
            alert('您的浏览器不支持定位');
        }

        //获取七牛token
        (function getQnToken() {
            axiosIns.get(config.apiUrl.getQnToken).then(function (data) {
                if (data.resultCode == 1) {
                    that.setState({
                        qnToken: data.data.uploadToken
                    });
                }
                else {
                    console.log(data);
                }
            })
                .catch(function (error) {
                    console.log(error);
                });
        })();
    }

    //使用canvas将dataUrl转换为blob
    uploadFile(token, file) {
        var that = this;
        let newFiles = [...that.state.demoFiles, {url: '', status: '0%'}];
        that.setState({
            demoFiles: newFiles
        });

        var axiosInstance = axios.create({
            headers: {'Content-Type': 'multipart/form-data'}
        });

        var formData = new FormData();
        formData.append('name', file.name);
        formData.append('token', token);
        var imgObj = new Image();
        imgObj.src = file.data;
        imgObj.onload = function () {
            var cvs = document.createElement('canvas');
            cvs.width = imgObj.naturalWidth;
            cvs.height = imgObj.naturalHeight;

            var ctx = cvs.getContext('2d').drawImage(imgObj, 0, 0);
            cvs.toBlob(function (blob) {
                formData.append('file', blob);

                axiosInstance({
                    method: 'post',
                    url: config.uploadUrl,
                    data: formData,
                    progress: function (progressEvent) {
                        let newFiles = that.state.demoFiles.slice(0);
                        newFiles[newFiles.length - 1].status = parseInt(progressEvent.loaded / progressEvent.total * 100) + '%';
                        that.setState({
                            demoFiles: newFiles
                        });
                    }
                }).then(function (response) {
                    console.log(response);
                    if (response.status == 200) {
                        var sourceUrl = 'http://obbapcolf.bkt.clouddn.com/' + response.data.key;

                        let newFiles = that.state.demoFiles.slice(0);
                        newFiles[newFiles.length - 1] = {url: file.data, status: null, sourceUrl: sourceUrl};

                        that.setState({
                            demoFiles: newFiles
                        });
                    }

                }).catch(function (error) {
                    console.log(error);
                });
            }, file.type, 1);
        };
    }

    submit() {
        let that = this;
        let userId = JSON.parse(localStorage.getItem('user'))._id;
        let description = this.state.description;
        let title = this.state.title;
        let price = this.state.price;
        let location = this.state.location;
        let category = this.state.category;
        let tradeType = this.state.tradeType;
        let images = [];
        this.state.demoFiles.forEach(function (item, index, array) {
            images.push(item.sourceUrl);
        });

        if (!userId || !description || !title || !price || !location || !category || !tradeType) {
            that.setState({showToast: true, toastText: '缺少验证参数'});
            setTimeout(function () {
                that.setState({showToast: false, toastText: ''});
            }, 1000);
            return;
        }

        axiosIns.post(config.apiUrl.products, {
            userId: userId,
            title: title,
            price: price,
            category: category,
            address: location,
            description: description,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            images: images,
            tradeType: tradeType
        }).then(function (data) {
            if (data.resultCode == 1) {
                that.setState({showToast: true, toastText: '发布成功'});
                setTimeout(function () {
                    that.setState({showToast: false, toastText: ''});
                    hashHistory.push('/');
                }, 1000);

            }
            else {
                that.setState({showToast: true, toastText: data.resultMsg});
                setTimeout(function () {
                    that.setState({showToast: false, toastText: ''});
                    hashHistory.push('/');
                }, 1000);
            }
        });
    }

    render() {
        return (
            <div className="publish p-b-50">
                <Form>
                    <FormCell>
                        <CellBody>
                            <Input type="text" placeholder="标题" value={this.state.title}
                                   onChange={e=>this.setState({title: e.target.value})}/>
                        </CellBody>
                    </FormCell>

                    <FormCell>
                        <CellBody>
                            <TextArea placeholder="描述" rows="3" maxlength="200" value={this.state.description}
                                      onChange={e=>this.setState({description: e.target.value})}></TextArea>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellBody>
                            <Input type="number" placeholder="价格(单位/元)" value={this.state.price}
                                   onChange={e=>this.setState({price: e.target.value})} pattern="[0-9]*" max="1000000"
                                   min="1"/>
                        </CellBody>
                    </FormCell>

                    <FormCell select selectPos="after">
                        <CellHeader>产品类型</CellHeader>
                        <CellBody>
                            <Select data={this.categoryList} value={this.state.category}
                                    onChange={e=>this.setState({category: e.target.value})}/>
                        </CellBody>
                    </FormCell>

                    <FormCell select selectPos="after">
                        <CellHeader>交易方式</CellHeader>
                        <CellBody>
                            <Select data={this.tradeTypeList} value={this.state.tradeType}
                                    onChange={e=>this.setState({tradeType: e.target.value})}/>
                        </CellBody>
                    </FormCell>

                    <div className="weui_cell">
                        <div className="weui_cell_bd weui_cell_primary">
                            <i className="fa fa-location-arrow" aria-hidden="true"></i>
                            <span className="m-l-10">{this.state.location}</span>
                        </div>
                    </div>

                    <FormCell>
                        <CellBody>
                            <Uploader
                                title="图片上传"
                                maxCount={7}
                                maxWidth={500}
                                files={this.state.demoFiles}
                                onError={msg => alert(msg)}
                                onChange={file => {
                                    this.uploadFile(this.state.qnToken,file);
                                }}
                            />
                        </CellBody>
                    </FormCell>
                </Form>
                <section>
                    <ButtonArea>
                        <Button onClick={this.submit.bind(this)}>确认发布</Button>
                    </ButtonArea>
                </section>
                <Toast show={this.state.showToast}>
                    {this.state.toastText}
                </Toast>
            </div>

        );
    }
}
