import React, { Component } from 'react';
import HeaderComponent from '@/components/HeaderComponent/'
import userService from '@services/userService'
import { updateUserInfo } from '@action'
import { connect } from 'react-redux'
import validate from '@/utils/validate'
import { Redirect } from 'react-router-dom'
import './style.scss'

export default class SetPassword extends Component {
    constructor() {
        super()
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            buttonDisable: true,
            done: false
            // verifiedOldPassword:false,
            // verifiedNewPassword:false,
            // verifiedConfirmPassword:false,
        }
    }
    listenBlur = (e) => {
        let name = e.target.name
        let value = e.target.value
        if (value === '') {
            this.setState({ [name]: '' })
            return
        }
        if (value.length < 6 || value.length > 20) {
            this.setState({ [name]: false })
        } else {
            this.setState({ [name]: value })
        }
    }
    listenConfirmPassword = (e) => {
        let value = e.target.value
        this.setState({ confirmPassword: value })
        if (value && this.state.newPassword === value) {
            this.setState({ buttonDisable: false })
        } else {
            this.setState({ buttonDisable: true })
        }
    }
    save = async () => {
        if (this.state.buttonDisable) return
        let res = await userService.updatePassword(this.state.newPassword, this.state.oldPassword)
        if (res.code === 200) {
            this.setState({ done: true })
        } else {
            window.$message(res.message)
        }
    }
    render() {
        let { done, oldPassword, newPassword, buttonDisable, confirmPassword } = this.state
        return (
            done
                ? <Redirect to="/profile/userSetting" />
                : <div className="setPassword">
                    <HeaderComponent name="账户信息" />
                    <div className="warp">
                        <div className="warpInput">
                            <input name="oldPassword" onBlur={this.listenBlur} placeholder="旧密码，如未设置过密码，不需要填写" type="password" />
                            {oldPassword === false ? <div className="validate">密码长度为 6－20 位</div> : ''}
                        </div>
                        <div className="warpInput">
                            <input name="newPassword" onBlur={this.listenBlur} placeholder="新密码" type="password" />
                            {newPassword === false ? <div className="validate">密码长度为 6－20 位</div> : ''}
                        </div>
                        <div className="warpInput">
                            <input name="confirmPassword" onChange={this.listenConfirmPassword} placeholder="确认新密码" type="password" />
                            {!confirmPassword || confirmPassword === newPassword || newPassword === false ? '' : <div className="validate">两次输入密码不一致</div>}
                        </div>
                    </div>
                    <div
                        className={buttonDisable ? 'button disable' : 'button'}
                        onClick={this.save}>
                        确认并保存
                </div>
                </div>
        )
    }

}