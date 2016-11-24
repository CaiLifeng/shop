import React from 'react';
import _ from 'lodash';
import './index.less';

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
        focus: false
    };

    handleExpandItemClick(idx, subItem, event) {
        let newData = _.cloneDeep(this.props.data);
        newData[idx].selected = subItem;
        if (this.props.onSelectChange) {
            this.props.onSelectChange(newData);
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
    }

    renderCloseItems(data) {
        let items = data.map((item, idx)=> {
            return (
                <li className="tab" style={{color: (this.state.index == item.id && this.state.focus) ? 'red' : 'black'}}
                    key={idx} onClick={this.handleHeaderClick.bind(this, item.id)}>
                    <span className="nav-font">{item.selected ? item.selected : item.name}</span>
                    <span className="icon-right">
                    {(this.state.index == item.id && this.state.focus) ?
                        <i className="fa fa-angle-up" aria-hidden="true"/> :
                        <i className="fa fa-angle-down" aria-hidden="true"/>}
                </span>
                </li>)
        });

        return (
            <ul className="f-b-close">
                {items}
                <li className="clearfix"/>
            </ul>
        );
    }

    renderExpendItems(data) {
        let items = data.map((item, idx)=> {
            return (
                <ul className="expand" key={idx} ref=""
                    style={{display: (this.state.index == item.id && this.state.focus) ? 'block' : 'none'}}>
                    {
                        item.data.map((subItem, subIdx)=> {
                            return (
                                <li className="tab" key={subIdx}
                                    onClick={this.handleExpandItemClick.bind(this, idx, subItem)}>
                                    {subItem}
                                </li>
                            )
                        })
                    }
                </ul>
            )
        });
        return (
            <div className="expand_b" style={{display: (this.state.index != 0 && this.state.focus) ? 'block' : 'none'}}
                 onClick={this.handleHeaderClick.bind(this, 0)}>
                {items}
            </div>
        );
    }

    render() {
        return (
            <div className="filter-bar">
                {this.renderCloseItems(this.props.data)}
                {this.renderExpendItems(this.props.data)}
            </div>

        );
    }
}