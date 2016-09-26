/**
 * Created by clf on 2016/8/23.
 */
import React from 'react';
import config from '../config.js'
import axiosIns from '../utils.js';
import axios from 'axios';
import Qiniu from 'qiniu.js';
import {Form,FormCell,CellBody,Uploader,CellHeader,Select,Input,Label,CellFooter,vcodeSrc,Icon,TextArea,section,ButtonArea,Button} from 'react-weui';
import {Toast} from 'react-weui';
import { browserHistory,hashHistory } from 'react-router';


export default class Publish extends React.Component {
    state = {
        user:JSON.parse(localStorage.getItem('user')),
        qnToken: null,
        demoFiles: [],
        showToast: false,
        toastText: null
    };

    //使用canvas将dataUrl转换为blob
    uploadFile(token, file) {
        const that = this;
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
                    url: 'http://upload.qiniu.com/',
                    data: formData,
                    progress: function (progressEvent) {
                        console.log(progressEvent);

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

                        that.state.user.image=newFiles[0];
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
        const that = this;

        let id = this.state.user._id;
        let name = this.state.user.name;
        let age = this.state.user.age;
        let sex = this.state.user.sex||'男';
        let image = this.state.user.image;

        if (!id || !name || !age || !sex || !image) {
            that.setState({showToast: true, toastText: '缺少验证参数'});
            setTimeout(function () {
                that.setState({showToast: false, toastText: ''});
            }, 1000);
            return;
        }

        let imageUrl=image.sourceUrl;

        axiosIns.post(config.apiUrl.updateUserInfo, {
            id:id,
            name:name,
            age:age,
            sex:sex,
            image:imageUrl
        }).then(function (data) {
            if (data.resultCode == 1) {
                that.setState({showToast: true, toastText: '提交成功'});
                localStorage.setItem('user',JSON.stringify(data.user));
                setTimeout(function () {
                    hashHistory.push('/');
                }, 1000);
            }
            else {
                that.setState({showToast: true, toastText: data.resultMsg});
                setTimeout(function () {
                    hashHistory.push('/');
                }, 1000);
            }
        })

    }

    componentWillMount(){
        let that=this;
        //获取七牛token
        (function getQnToken() {
            axiosIns.get(config.apiUrl.getQnToken).then(function (data) {
                if(data.resultCode==1){
                    that.setState({
                        qnToken: data.data.uploadToken
                    });
                }
                else{
                    console.log(data.resultMsg);
                }
            })
        })();
    }

    render() {
        return (
            <div className="publish p-b-50">
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>手机号码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" disabled="disabled" value={this.state.user.telephone} onChange={e=>this.state.user.telephone=e.target.value}/>
                        </CellBody>
                    </FormCell>

                    <FormCell>
                        <CellHeader>
                            <Label>姓名</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请输入姓名" value={this.state.user.name} onChange={e=>this.state.user.name=e.target.value}/>
                        </CellBody>
                    </FormCell>

                    <FormCell>
                        <CellHeader>
                            <Label>年龄</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="number" placeholder="请输入年龄" value={this.state.user.age} onChange={e=>this.state.user.age=e.target.value}/>
                        </CellBody>
                    </FormCell>

                    <FormCell select selectPos="after">
                        <CellHeader>性别</CellHeader>
                        <CellBody>
                            <Select data={[{value:'男',label:'男'},{value:'女',label:'女'}]} value={this.state.user.sex} onChange={e=>this.state.user.sex=e.target.value}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellBody>
                            <Uploader
                                title="头像"
                                maxCount={1}
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
                        <Button onClick={this.submit.bind(this)}>提交</Button>
                    </ButtonArea>
                </section>
                <Toast show={this.state.showToast}>
                    {this.state.toastText}
                </Toast>
            </div>

        );
    }
}
