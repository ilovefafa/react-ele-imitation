import React, { Component } from 'react';
import HeaderComponent from '@/components/HeaderComponent/'
import userService from '@services/userService'
import { updateUserInfo } from '@action'
import { connect } from 'react-redux'
import validate from '@/utils/validate'
import { Redirect } from 'react-router-dom'
import './style.scss'


class setPhone extends Component {
    constructor() {
        super()
        this.state = {
            confirmDisable: true,
            goNewPhone: false,
            done: false,
        }
    }
    getAuthCode = async () => {
        let res = await userService.getAuthCode()
        window.$message(res.data.authCode)
    }
    confirmAuthCode = async () => {
        if (this.state.confirmDisable) return
        let validateMessage = validate.authCode(this.authCode)
        if (validateMessage) {
            window.$message(validateMessage)
            return
        }
        let res = await userService.confirmAuthCode(this.authCode)
        if (res.errMessage) {
            window.$message(res.errMessage)
            return
        }
        let inputArray = document.querySelectorAll('input')
        inputArray.forEach((input) => {
            input.value = ''
        })
        this.setState({ goNewPhone: true })
    }
    authCodeChange = async (e) => {
        this.authCode = e.target.value
        if (this.authCode.length === 6) {
            this.setState({ confirmDisable: false })
        } else {
            this.setState({ confirmDisable: true })
        }
    }
    changeNewPhone = async (e) => {
        this.newPhoneNumber = e.target.value
    }
    getNewPhoneAuthCode = async () => {
        let res = await userService.getNewPhoneAuthCode(this.newPhoneNumber)
        window.$message(res.data.authCode)
    }
    newPhoneConfirmAuthCode = async () => {
        if (this.state.confirmDisable) return
        let validateMessage = validate.authCode(this.authCode)
        if (validateMessage) {
            window.$message(validateMessage)
            return
        }
        let res = await userService.confirmNewPhoneAuthCode(this.authCode, this.newPhoneNumber)
        if (res.errMessage) {
            window.$message(res.errMessage)
            return
        }
        updateUserInfo(res.data)
        this.setState({ done: true })
    }
    render() {
        let { confirmDisable, goNewPhone, done } = this.state
        let { encryptPhoneNumber } = this.props.info
        return (
            done
                ? <Redirect to="/profile/userSetting" />
                : <div className="setPhone">
                    <HeaderComponent name="换绑手机" />
                    <div className="warp">
                        <div className="inputGroup">
                            <div className="inputWarp">
                                <div className="valuePair">
                                    <span className="field">{goNewPhone ? '新手机号码' : '手机号'}</span>
                                    {goNewPhone
                                        ?
                                        <input maxLength="11" size="10" onChange={this.changeNewPhone} placeholder="" type="text" />
                                        :
                                        <input maxLength="11" size="10" defaultValue={encryptPhoneNumber} readOnly="readonly" placeholder="" type="text" />
                                    }
                                </div>
                                <button onClick={goNewPhone ? this.getNewPhoneAuthCode : this.getAuthCode} className="getAuthCode">获取验证码</button>
                            </div>
                            <div className="inputWarp">
                                <div className="valuePair">
                                    <span className="field">验证码</span>
                                    <input maxLength='6' onChange={this.authCodeChange} placeholder="请输入验证码" type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="buttonWarp" >
                            <button className={confirmDisable ? "" : "success"} onClick={goNewPhone ? this.newPhoneConfirmAuthCode : this.confirmAuthCode}>{goNewPhone ? '确认绑定' : '验证后绑定新手机号'}</button>
                        </div>
                    </div>
                </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.userInfo
    }
}

export default connect(mapStateToProps)(setPhone)