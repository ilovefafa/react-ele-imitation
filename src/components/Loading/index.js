import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.scss'


export default class Loading extends Component {
    render() {
        return (
            <div className="ComponentLoading">
                <div className="loading"><FontAwesomeIcon icon="spinner" className="spinner" />正在加载... </div>
            </div>
        )
    }
}
