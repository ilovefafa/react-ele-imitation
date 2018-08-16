import React, { Component } from 'react';
import './style.scss'
import Icon from '@/components/Icon/'
class Profile extends Component {
    componentDidMount() {
        document.title = "我的"
    }
    render() {
        return (
            <div className="Profile" >
                <div className="header">
                    <img src={require('@icon/leftArrow.svg')} alt="" />
                    <p>我的</p>
                </div>
                <section className="info">
                    <div className="warp">
                        <img src={require("@icon/eleInfoLogo.png")} alt="" />
                        <div className="login">
                            <h1>登录/注册</h1>
                            <p>
                                <Icon name="mobile"></Icon>
                                <span>登录后享受更多特权</span>
                            </p>
                        </div>
                        <div>
                            <Icon name="arrow-right"></Icon>
                        </div>
                    </div>
                </section>
                <section className="money">
                    <a className="warp" href="/">
                        <div className="item">
                            <Icon name="profile-balance"></Icon>
                            <p>钱包</p>
                        </div>
                    </a>
                    <a className="warp" href="/">
                        <div className="item">
                            <Icon name="profile-balance"></Icon>
                            <p>钱包</p>
                        </div>
                    </a>
                    <a className="warp" href="/">
                        <div className="item">
                            <Icon name="profile-balance"></Icon>
                            <p>钱包</p>
                        </div>
                    </a>
                </section>
                <section className="bar-single">
                    <a className="warp" href="">
                        <Icon name="address"></Icon>
                        <div className="address-arrow">
                            <span>我的地址</span>
                            <Icon name="arrow-right"></Icon>
                        </div>
                    </a>
                </section>
                <section className="bar-group">
                    <section className="bar">
                        <a className="warp" href="">
                            <Icon name="address"></Icon>
                            <div className="address-arrow">
                                <span>我的地址</span>
                                <Icon name="arrow-right"></Icon>
                            </div>
                        </a>
                    </section>
                    <section className="bar">
                        <a className="warp" href="">
                            <Icon name="address"></Icon>
                            <div className="address-arrow">
                                <span>我的地址</span>
                                <Icon name="arrow-right"></Icon>
                            </div>
                        </a>
                    </section>
                </section>
                <section className="bar-group">
                    <section className="bar">
                        <a className="warp" href="">
                            <Icon name="address"></Icon>
                            <div className="address-arrow">
                                <span>我的地址</span>
                                <Icon name="arrow-right"></Icon>
                            </div>
                        </a>
                    </section>
                    <section className="bar">
                        <a className="warp" href="">
                            <Icon name="address"></Icon>
                            <div className="address-arrow">
                                <span>我的地址</span>
                                <Icon name="arrow-right"></Icon>
                            </div>
                        </a>
                    </section>
                </section>
            </div>
        )
    }
}


export default Profile