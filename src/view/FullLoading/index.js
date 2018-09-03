import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.scss'


export default class FullLoading extends Component {
    render() {
        return (
            <div className="FullLoading">
                <div className="loading"><FontAwesomeIcon icon="spinner" className="spinner" />正在加载... </div>
            </div>
        )
    }
}
