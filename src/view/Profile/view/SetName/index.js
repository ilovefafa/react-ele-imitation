import React, { Component } from 'react';
import HeaderComponent from '@/components/HeaderComponent/'
import userService from '@services/userService'
import { updateUserInfo } from '@action'

import './style.scss'


export default class setName extends Component {
    constructor() {
        super()
        this.state = {
            confirmDisable: true,
        }
    }
    handleChange = (e) => {
        let value = e.target.value
        this.value = value
        if (value.length >= 5 && value.length <= 24) {
            this.setState({ confirmDisable: false })
        } else {
            this.setState({ confirmDisable: true })
        }
    }
    handleClick = async () => {
        if (this.state.confirmDisable === true) return
        let name = this.value
        let res = await userService.changeName(name)
        updateUserInfo(res.data)
        window.history.back()
    }
    render() {
        let { confirmDisable } = this.state
        return (
            <div className="setName">
                <HeaderComponent name="账户信息" />
                <input onChange={this.handleChange} placeholder="用户名" type="text" />
                <div className="confirm">
                    <p className="desc">用户名只能修改一次（5-24个字）</p>
                    <button onClick={this.handleClick} className={confirmDisable ? "button disable" : "button"}>
                        确认修改
                </button>
                </div>
            </div>
        )
    }
}
