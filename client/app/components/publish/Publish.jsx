import React from 'react';
import config from '../../config.js'
import axios from 'axios';
import Qiniu from 'qiniu.js';
import {Form,FormCell,CellBody,Uploader} from 'react-weui';
import {Toast} from 'react-weui';
import { browserHistory } from 'react-router';


export default class Publish extends React.Component {
    state={
        description:'',
        desLength:0,
        location:'',
        qnToken:'',
        latitude:'',
        longitude:'',
        demoFiles:[],
        showToast:false,
        toastText:''
    };

    componentWillMount(){
        //获取定位
        if ("geolocation" in navigator) {
            function success(position) {
                var latitude  = position.coords.latitude;
                var longitude = position.coords.longitude;
                this.setState({latitude:position.coords.latitude,longitude:position.coords.longitude});
                axios.post(config.apiUrl.getLocationInfo,{
                    latitude:latitude,
                    longitude:longitude
                }).then(function(response) {
                    if(response.status==200){
                        let location=response.data.data.addressComponent.province+response.data.data.addressComponent.city+response.data.data.addressComponent.district;
                        console.log(location);
                        this.setState({
                            location:location
                        });
                    }

                }.bind(this))
                    .catch(function (error) {
                        console.log(error);
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
        function getQnToken(){
            axios.get(config.apiUrl.getQnToken).then(function (response) {
                if(response.status==200){
                    this.setState({
                        qnToken:response.data.data.uploadToken
                    });
                }

            }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
        }
        getQnToken.apply(this);

    }

    //使用canvas将dataUrl转换为blob
    uploadFile(token,file){
        var that=this;
        let newFiles = [...that.state.demoFiles, {url:'',status:'0%'}];
        that.setState({
            demoFiles: newFiles
        });

        var axiosInstance = axios.create({
            headers: {'Content-Type': 'multipart/form-data'}
        });

        var formData = new FormData();
        formData.append('name',file.name);
        formData.append('token',token);
        var imgObj=new Image();
        imgObj.src=file.data;
        imgObj.onload=function(){
            var cvs=document.createElement('canvas');
            cvs.width = imgObj.naturalWidth;
            cvs.height = imgObj.naturalHeight;

            var ctx=cvs.getContext('2d').drawImage(imgObj,0,0);
            cvs.toBlob(function(blob){
                formData.append('file',blob);

                axiosInstance({
                    method: 'post',
                    url: 'http://upload.qiniu.com/',
                    data: formData,
                    progress: function (progressEvent) {
                        console.log(progressEvent);

                        let newFiles = that.state.demoFiles.slice(0);
                        newFiles[newFiles.length-1].status=parseInt(progressEvent.loaded/progressEvent.total*100)+'%';
                        that.setState({
                            demoFiles: newFiles
                        });
                    }
                }).then(function (response) {
                    console.log(response);
                    if(response.status==200){
                        var sourceUrl='http://obbapcolf.bkt.clouddn.com/'+response.data.key;

                        let newFiles = that.state.demoFiles.slice(0);
                        newFiles[newFiles.length-1]={url:file.data,status:null,sourceUrl:sourceUrl};

                        that.setState({
                            demoFiles: newFiles
                        });
                    }

                }).catch(function(error) {
                    console.log(error);
                });
            },file.type,1);
        };


    }

    submit(){
        let that=this;

        let description=this.refs.description.value;
        let title=this.refs.title.value;
        let price=this.refs.price.value;
        let location=this.state.location;
        let category=this.refs.category.value;
        let images=[];
        this.state.demoFiles.forEach(function(item,index,array){
            images.push(item.sourceUrl);
        });

        axios.post(config.apiUrl.products,{
            title:title,
            price:price,
            address:location,
            description:description,
            longitude:this.state.longitude,
            latitude:this.state.latitude,
            images:images,
            category:category

        }).then(function(response) {
            if(response.status==200){
                if(response.data.resultCode==1){
                    that.setState({showToast:true,toastText:'发布成功'});
                    setTimeout(function(){
                        that.setState({showToast:false,toastText:''});
                        browserHistory.push('/');
                    },1000);

                }
                else{
                    that.setState({showToast:true,toastText:response.data.resultMsg});
                    setTimeout(function(){
                        that.setState({showToast:false,toastText:''});
                        browserHistory.push('/');
                    },1000);
                }
            }

        })
        .catch(function (error) {
            console.log(error);
        });

    }

    descriptionChange(){
        let description=this.refs.description.value;
        this.setState({
            desLength:description.length
        });

    }
    render() {

        return (
            <div className="publish">
                <div className="weui_cells weui_cells_form m-t-0">
                    <div className="weui_cell">
                        <div className="weui_cell_bd weui_cell_primary">
                            <input className="weui_input" ref="title" type="text" placeholder="标题"/>
                        </div>
                    </div>
                    <div className="weui_cell">
                        <div className="weui_cell_bd weui_cell_primary">
                            <textarea className="weui_textarea" ref="description" maxLength="200" onChange={this.descriptionChange.bind(this)} placeholder="描述" rows="3"></textarea>
                            <div className="weui_textarea_counter"><span>{this.state.desLength}</span>/200</div>
                        </div>
                    </div>
                    <div className="weui_cell">
                        <div className="weui_cell_bd weui_cell_primary">
                            <input className="weui_input" type="number" ref="price" pattern="[0-9]*" max="1000000" min="1" placeholder="价格(单位/元)"/>
                        </div>
                    </div>
                    <div className="weui_cell weui_cell_select">
                        <div className="weui_cell_bd weui_cell_primary">
                            <select ref="category" className="weui_select" name="select1">
                                <option value="微信号">微信号</option>
                                <option value="QQ号">QQ号</option>
                                <option value="Email">Email</option>
                            </select>
                        </div>
                    </div>
                    <div className="weui_cell">
                        <div className="weui_cell_bd weui_cell_primary">
                            <i className="fa fa-location-arrow" aria-hidden="true"></i>
                            <span className="m-l-10">{this.state.location}</span>
                        </div>
                    </div>
                </div>

                <Form>
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

                <div className="weui_btn_area">
                    <a className="weui_btn weui_btn weui_btn_plain_primary" href="javascript:" onClick={this.submit.bind(this)}>确认发布</a>
                </div>

                <Toast show={this.state.showToast}>
                    {this.state.toastText}
                </Toast>
            </div>

        );
    }
}
