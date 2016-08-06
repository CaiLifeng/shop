import React from 'react';
import classNames from 'classnames';




export default class FilterBar extends React.Component {
    state={
        index:0,
        focus:false,
        data:[{
            name: '区域',
            id: '1',
            data: ['南山区', '宝安区', '福田区', '罗湖区']
        }, {
            name: '品种',
            id: '2',
            data: ['啪啪啪', '啦啦啦', '嘿嘿嘿', '哔哔哔']
        }, {
            name: '面交',
            id: '3',
            data: ['不限', '面交', '在线']
        }, {
            name: '品种',
            id: '4',
            data: ['不限', '0~1000', '1000~2000', '1000~2000']
        }],
        selected:[
            {
                id:1,
                data:''
            },
            {
                id:2,
                data:''
            },
            {
                id:3,
                data:''
            },
            {
                id:4,
                data:''
            }
        ]
    };

    componentDidMount(){

    }

    handleExpandItemClick(idx,subItem,event){
        let newState = Object.assign({}, this.state);
        newState.data[idx].name=subItem;
        newState.selected[idx].data=subItem;
        this.setState(newState);
        console.log(newState);
    }

    handleHeaderClick(idx){
        if(this.state.index==idx){
            if(this.state.focus){
                this.setState({index: idx,focus:false});
            }
            else{
                this.setState({index: idx,focus:true});
            }
        }
        else{
            this.setState({index: idx,focus:true});
        }
    }

    renderCloseItems(data){
        let items = data.map((item, idx)=>{
            return <li className="tab" key={idx} onClick={this.handleHeaderClick.bind(this,item.id)}>
                <span className="nav-font">{item.name}</span>
                <span className="icon-right">
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                </span>
            </li>
        });

        return (
            <ul className="f-b-close">
                {items}
                <li className="clearfix"></li>
            </ul>
        );
    }

    //shouldComponentUpdate(nextProps,nextState){
    //    console.log(nextState);
    //    return false;
    //}

    renderExpendItems(data){
        let items = data.map((item, idx)=>{
            return (
                <ul className="expand" key={idx} ref="" style={{display:(this.state.index==item.id&&this.state.focus)?'block' : 'none'}}>
                    {
                        item.data.map((subItem,subIdx)=>{
                            return (
                                <li className="tab" key={subIdx} onClick={this.handleExpandItemClick.bind(this,idx,subItem)}>
                                    {subItem}
                                </li>
                            )
                        })
                    }
                </ul>
            )
        });
        return (
            <div className="expand_b" style={{display:(this.state.index!=0&&this.state.focus)?'block' : 'none'}} onClick={this.handleHeaderClick.bind(this,0)}>
                {items}
            </div>
        );
    }

    render() {


        return (
            <div className="filter-bar">
                {this.renderCloseItems(this.state.data)}
                {this.renderExpendItems(this.state.data)}
            </div>

        );
    }
}