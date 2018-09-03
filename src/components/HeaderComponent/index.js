import React, { Component } from 'react';
import './style.scss'


export default class Header extends Component {
    componentDidMount() {
        document.title = this.props.name
    }
    render() {
        let { name, onBack } = this.props
        return (
            <div className="headerComponent">
                <div className="header">
                    <img onClick={typeof onBack === 'function' ? onBack : () => { window.history.back() }} src={require('@icon/leftArrow.svg')} alt="" />
                    <p>{name}</p>
                </div>
            </div>
        )
    }
}
