import React, { Component } from 'react';
import './style.scss'

class Icon extends Component {
    render() {
        const { file, name } = this.props
        if (file) {
            return (
                <svg className={`${name}`} >
                    <use xlinkHref={`#${file}_${name}`} />
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