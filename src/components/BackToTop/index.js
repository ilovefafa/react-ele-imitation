import React, { Component } from 'react';
import { throttle } from 'throttle-debounce'
import './style.scss'

class BackToTop extends Component {
    constructor() {
        super()
        this.state = {
            isShow: false
        }
    }
    handleScroll = () => {
        if (document.documentElement.scrollTop > 700) {
            this.setState({
                isShow: true
            })
        } else {
            this.setState({
                isShow: false
            })
        }
    }
    render() {
        return (
            <div onClick={() => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            }} className={this.state.isShow ? 'backToTop backToTopShow' : 'backToTop'}>
                <img src={require('@icon/backToTop.svg')} alt="" />
            </div>
        )
    }
    componentDidMount() {
        this.throltteHandleScroll = throttle(500, this.handleScroll)
        window.addEventListener('scroll', this.throltteHandleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.throltteHandleScroll)
    }
}


export default BackToTop