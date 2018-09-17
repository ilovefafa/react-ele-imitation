import React, { Component } from 'react';
import './style.scss'
import FooterNav from '@/components/FooterNav/'
import { connect } from 'react-redux'

class Order extends Component {
    componentDidMount() {
        document.title = "订单"
    }
    render() {
        let { isLogin } = this.props
        return (
            <div className="Order" >
                <div className="header">
                    <img src={require('@icon/leftArrow.svg')} alt="" />
                    <p>订单</p>
                </div>
                {isLogin ?
                    <div>订单</div>
                    : <section>
                        <img src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" alt="" />
                        <p>登录后查看外卖订单</p>
                        <button>立即登录</button>
                    </section>
                }

                <FooterNav />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.userInfo.isLogin
    }
}
export default connect(mapStateToProps)(Order)