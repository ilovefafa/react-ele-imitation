import React, { Component } from 'react';
import './style.scss'

class Icon extends Component {
    render() {
        const { file, name, url } = this.props
        if (file) {
            return (
                <svg className={`${name}`} >
                    <use xlinkHref={`#${file}_${name}`} />
                </svg>
            )
        } else if (url) {
            return (
                <svg className={`${name}`} >
                    <use xlinkHref={`${url}#${name}`} />
                </svg>
            )
        } else {
            return (
                <svg className={`${name}`} >
                    <use xlinkHref={`#${name}`} />
                </svg>
            )
        }

    }
}


export default Icon