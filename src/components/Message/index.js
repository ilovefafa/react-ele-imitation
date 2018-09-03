import React, { Component } from 'react';
import './style.scss'


class Message extends Component {
    constructor() {
        super()
        this.state = {
            addAcitve: false
        }
    }
    componentDidMount() {
        this.timeID = setTimeout(() => {
            this.props.onMessageTimeOut()
        }, this.props.timeOut || 3000)
        setTimeout(() => {
            this.setState({ addAcitve: true })
        }, 0)
        setTimeout(() => {
            this.setState({ addAcitve: false })
        }, 2000)
    }
    componentWillUnmount() {
        clearTimeout(this.timeID)
    }
    render() {
        return (
            <div className={this.state.addAcitve ? "message message-active" : "message"}>
                {this.props.message}
            </div>
        )
    }
}

class MessageComponent extends Component {
    constructor() {
        super()
        this.state = {
            show: false,
        }
    }
    handleMessageTimeout = () => {
        this.setState({ show: false })
    }
    componentDidUpdate(pre) {
        if (pre.message !== this.props.message && this.props.message) {
            this.setState({ show: true })
        }
    }
    render() {
        return (
            <div className="message-component" >
                {this.state.show ? <Message onMessageTimeOut={this.handleMessageTimeout} {...this.props}></Message> : ''}
            </div>
        )
    }
}

export default MessageComponent
