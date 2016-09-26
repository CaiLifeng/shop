import React from 'react';
import classNames from 'classnames';

export default class FilterBar extends React.Component {
    static propTypes = {
        data: React.PropTypes.array,
        onSelectChange: React.PropTypes.func
    };

    static defaultProps = {
        data: [],
        onSelectChange: undefined
    };

    state = {
        index: 0,
        focus: false,
        data: this.props.data
    };

    handleExpandItemClick(idx, subItem, event) {
        let newState = Object.assign({}, this.state);
        newState.data[idx].selected = subItem;
        this.setState(newState);
        if (this.props.onSelectChange) {
            this.props.onSelectChange(this.state.data);
        }
    }

    handleHeaderClick(idx) {
        if (this.state.index == idx) {
            if (this.state.focus) {
                this.setState({index: idx, focus: false});
            }
            else {
                this.setState({index: idx, focus: true});
            }
        }
        else {
            this.setState({index: idx, focus: true});
        }
        console.log(this.state);
    }

    renderCloseItems(data) {
        let items = data.map((item, idx)=> {
            return (<li className="tab" style={{color:(this.state.index==item.id&&this.state.focus)?'red' : 'black'}} key={idx} onClick={this.handleHeaderClick.bind(this,item.id)}>
                <span className="nav-font">{item.selected ? item.selected : item.name}</span>
                <span className="icon-right">
                    {(this.state.index==item.id&&this.state.focus)?<i className="fa fa-angle-up" aria-hidden="true"></i>:<i className="fa fa-angle-down" aria-hidden="true"></i>}
                </span>
            </li>)
        });

        return (
            <ul className="f-b-close">
                {items}
                <li className="clearfix"></li>
            </ul>
        );
    }

    renderExpendItems(data) {
        let items = data.map((item, idx)=> {
            return (
                <ul className="expand" key={idx} ref=""
                    style={{display:(this.state.index==item.id&&this.state.focus)?'block' : 'none'}}>
                    {
                        item.data.map((subItem, subIdx)=> {
                            return (
                                <li className="tab" key={subIdx}
                                    onClick={this.handleExpandItemClick.bind(this,idx,subItem)}>
                                    {subItem}
                                </li>
                            )
                        })
                    }
                </ul>
            )
        });
        return (
            <div className="expand_b" style={{display:(this.state.index!=0&&this.state.focus)?'block' : 'none'}}
                 onClick={this.handleHeaderClick.bind(this,0)}>
                {items}
            </div>
        );
    }

    render() {
        const {data,onSelectChange, ...others} = this.props;

        return (
            <div className="filter-bar">
                {this.renderCloseItems(data)}
                {this.renderExpendItems(data)}
            </div>

        );
    }
}