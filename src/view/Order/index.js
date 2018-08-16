import React, { Component } from 'react';
import './style.scss'

class Order extends Component {
    componentDidMount() {
        document.title = "订单"
    }
    render() {
        return (
            <div className="Order" >
                <div className="header">
                    <img src={require('@icon/leftArrow.svg')} alt="" />
                    <p>订单</p>
                </div>
                <section>
                    <img src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" alt="" />
                    <p>登录后查看外卖订单</p>
                    <button>立即登录</button>
                </section>
            </div>
        )
    }
}


export default Order