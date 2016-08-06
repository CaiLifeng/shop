import React from 'react';
import Products from './Products';
import FilterBar from './FilterBar';
import WeUI from 'react-weui';
require('./../App.css');

const {SearchBar} = WeUI;

export default class Home extends React.Component {
    render() {
        return (
            <div className="content">
                <SearchBar/>
                <FilterBar/>
                <Products/>
            </div>
        );
    }
}

