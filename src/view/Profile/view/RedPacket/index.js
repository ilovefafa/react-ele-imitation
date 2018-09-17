import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom'
import HeaderComponent from '@/components/HeaderComponent/'
import Icon from '@/components/Icon/'
import './style.scss'

class RedPacket extends Component {
    render() {
        let { match, location } = this.props
        return (
            <div className="RedPacket">
                <HeaderComponent name="我的优惠" />
                <div className="nav">
                    <NavLink replace exact className="item" to={`${match.url}`}>
                        <div >
                            <span>红包 2 个</span>
                        </div>
                    </NavLink>
                    <NavLink replace className="item" to={`${match.url}/shopHongbao`}>
                        <div>
                            <span>店铺红包 0 张</span>
                        </div>
                    </NavLink>
                </div>
                <Route exact path={`${match.url}`} component={Hongbao}></Route>
                <Route path={`${match.url}/shopHongbao`} component={ShopHongbao}></Route>
            </div>
        )
    }
}

class Hongbao extends Component {
    render() {
        return (
            <div className="warp">
                <div className="recommand">
                    <img src={require('@images/activity/recommand.svg')} alt="" />
                </div>
                <div className="coupon">
                    <Icon name="h5-component-newBadge" />
                    <div className="value">
                        <h1><span>￥</span>3</h1>
                        <h2>满15元可用</h2>
                    </div>
                    <div className="desc">
                        <h1>新人红包</h1>
                        <p>2018-09-10到期</p>
                        <p>限收货手机号为 155 1111 2222</p>
                    </div>
                    <div className="button">
                        去使用
                        </div>
                </div>
                <div className="coupon">
                    <Icon name="h5-component-newBadge" />
                    <div className="value">
                        <h1><span>￥</span>3</h1>
                        <h2>满15元可用</h2>
                    </div>
                    <div className="desc">
                        <h1>新人红包</h1>
                        <p>2018-09-10到期</p>
                        <p>限收货手机号为 155 1111 2222</p>
                    </div>
                    <div className="button">
                        去使用
                        </div>
                </div>
            </div>
        )
    }
}

class ShopHongbao extends Component {
    render() {
        return (
            <div className="ShopHongbao">
                <img src="https://fuss10.elemecdn.com/d/7b/808900d6a7c79c906b2e0cace8538gif.gif" alt="" />
                <h1>没有店铺红包</h1>
                <button>去领卷中心看看</button>
            </div>
        )
    }
}

export default RedPacket