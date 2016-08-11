import React from 'react';
import Products from './Products';
import FilterBar from './FilterBar';
import WeUI from 'react-weui';
import axios from 'axios';
import config from '../../config.js';
require('./../App.css');

const {SearchBar} = WeUI;

export default class Home extends React.Component {
    state = {
        productList: []
    };

    componentWillMount() {
        const that = this;
        axios.get(config.apiUrl.products, {}).then(function (response) {
            if (response.status == 200) {
                if (response.data.resultCode == 1) {
                    console.log(response);

                    that.setState({
                        productList: response.data.data
                    });
                    console.log(response.data.data);
                }
                else {
                    console.log(response);
                }
            }

        })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (
            <div className="content">
                <SearchBar/>
                <FilterBar/>
                <Products productList={this.state.productList}/>
            </div>
        );
    }
}

