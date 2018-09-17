import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Icon from '@/components/Icon/'
import loginService from '@services/loginService'
import './style.scss'
import svgUrl from '@/assets/images/login.svg'
import { isLogin, getUserInfo } from '@/redux/actions/'
import { connect } from 'react-redux'
import validate from '@/utils/validate';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            way: '账号登录',
            account: '',
            password: '',
            phoneNumber: '',
            authCode: '',
            redirectToReferrer: false,
            message: '',
            toggleMessage: false,
            timer: 10,
            timerID: ''
        }
    }
    toggleLoginWay = (e) => {
        document.querySelector('#loginForm').reset()
        this.setState({
            way: e.target.innerText,
        })

    }
    inputChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]: value
        })
    }
    hintPopup = (message, toggleMessage) => {
        this.setState({ message, [toggleMessage]: true })
        this.timeOutID = setTimeout(() => {
            this.setState({ [toggleMessage]: false })
        }, 4000);
    }
    login = async () => {
        let res, message
        let { way, account, password, phoneNumber, authCode } = this.state
        if (way === '账号登录') {
            if (!account || !password) {
                message = '账号密码不能为空'
                this.hintPopup(message, 'toggleMessage')
                return
            }
            if (account.length < 3) {
                message = '账号最少3位'
                this.hintPopup(message, 'toggleMessage')
                return
            }
            if (password.length < 3) {
                message = '密码最少3位'
                this.hintPopup(message, 'toggleMessage')
                return
            }
            if (!validate.password(password)) {
                message = '密码需字母+数字组合'
                this.hintPopup(message, 'toggleMessage')
                return
            }
            res = await loginService.loginByAccount(account, password)
        } else if (way === '短信登录') {
            if (phoneNumber.length !== 11 || isNaN(phoneNumber)) {
                message = '请输入正确的手机号码'
                this.hintPopup(message, 'toggleMessage')
                return
            }
            res = await loginService.loginByPhoneNumber(phoneNumber, authCode)
        }
        if (res.code === 200) {
            isLogin(true)
            this.props.dispatch(getUserInfo(res.data.userInfo))
            this.setState({ redirectToReferrer: true })
        } else {
            message = res.message
            this.hintPopup(message, 'toggleMessage')
        }
    }
    getAuthCode = async () => {
        if (!validate.phoneNumber(this.state.phoneNumber)) return
        let timerID = setInterval(() => {
            if (this.state.timer === 0) {
                clearInterval(this.state.timerID)
                this.setState({ timerID: '', timer: 10 })
                return
            }
            this.setState({ timer: this.state.timer - 1 })
        }, 1000)
        this.setState({ timerID })
        let res = await loginService.getAuthCode(this.state.phoneNumber)
        let message = res.message
        this.setState({ authCode: res.authCode })
        this.hintPopup(message, 'toggleMessage')
    }
    componentWillUnmount() {
        window.clearTimeout(this.timeOutID)
        clearInterval(this.state.timerID)
    }
    render() {
        return (
            this.state.redirectToReferrer
                ?
                <Redirect to={(() => {
                    let value
                    if (this.props.location.state) {
                        if (this.props.location.state.from) {
                            value = this.props.location.state.from
                        }
                    } else {
                        value = { pathname: '/' }
                    }
                    return value
                })()}></Redirect>
                :
                <div className="Login">
                    <div className="warp">
                        <Icon url={svgUrl} name="logo"></Icon>
                        <div className="toggleLoginWay">
                            <div onClick={this.toggleLoginWay} className={this.state.way === '账号登录' ? "item active" : 'item'}>账号登录</div>
                            <div onClick={this.toggleLoginWay} className={this.state.way === '短信登录' ? "item active" : 'item'}>短信登录</div>
                        </div>
                        <form id="loginForm">
                            {
                                (() => {
                                    switch (this.state.way) {
                                        case '账号登录':
                                            return (
                                                <React.Fragment>
                                                    <div className="simpleInput">
                                                        <input name="account" value={this.state.account} onChange={this.inputChange} placeholder="账号" />
                                                    </div>
                                                    <div className="simpleInput">
                                                        <input name="password" value={this.state.password} onChange={this.inputChange} type="password" placeholder="密码" />
                                                    </div>
                                                </React.Fragment>
                                            )
                                        case '短信登录':
                                            return (
                                                <React.Fragment>
                                                    <div className="simpleInput">
                                                        <input name="phoneNumber" value={this.state.phoneNumber} onChange={this.inputChange} type="tel" maxLength="11" placeholder="手机号" />
                                                        {this.state.timerID
                                                            ?
                                                            <button type='button'>{`请等待(${this.state.timer}s)`}</button>
                                                            :
                                                            <button type='button' onClick={this.getAuthCode} className={validate.phoneNumber(this.state.phoneNumber) ? 'active' : ''}>获取验证码</button>
                                                        }
                                                    </div>
                                                    <div className="simpleInput">
                                                        <input name="authCode" value={this.state.authCode} onChange={this.inputChange} type="tel" maxLength="8" placeholder="验证码" />
                                                    </div>
                                                </React.Fragment>
                                            )
                                        default: return
                                    }
                                })()
                            }
                            <div className="tip">
                                <p>
                                    温馨提示：未注册饿了么账号，登录时将自动注册，且代表您已同意
                            <a href="">《用户服务协议》</a>
                                </p>
                                <Message toggle={this.state.toggleMessage} message={this.state.message} ></Message>
                            </div>
                            <button type="button" onClick={this.login} className="loginButton">登录</button>
                        </form>
                        <div className="aboutMe">关于我们</div>
                    </div>
                </div>
        )
    }
}

class Message extends Component {
    render() {
        return (
            <div className={this.props.toggle ? "message messageActive" : "message"}>
                {this.props.message}
            </div>
        )
    }
}


export default connect()(Login)