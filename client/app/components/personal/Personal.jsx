import React from 'react';
import Banner from './banner/Banner.js';
import Panel from './panel/Panel.js';

export default class Personal extends React.Component {
    render() {
        let user=JSON.parse(localStorage.getItem('user'));
        return (
            <div>
                <Banner image={user.image} userId={user._id} name={user.name}/>
                <Panel userId={user._id}/>
            </div>
        );
    }
}