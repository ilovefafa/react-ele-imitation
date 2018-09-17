import React, { Component } from 'react';
import './style.scss'
import Icon from '@/components/Icon/'
import HeaderComponent from '@/components/HeaderComponent/'
import FooterNav from '@/components/FooterNav/'

class Explore extends Component {

    render() {
        return (
            <div className="Explore" >
                <HeaderComponent name="发现" />
                <div className="banner">
                    <img src="https://fuss10.elemecdn.com/2/9f/cedf0f9959a7e699f81dba18d0aa6gif.gif" alt="" />
                </div>
                <section className="three">
                    <div >
                        <div className="warp">
                            <h1>金币商城</h1>
                            <p>0元好物在这里</p>
                        </div>
                        <img src="https://fuss10.elemecdn.com/8/38/9c9aea0e856149083d84af3444b78jpeg.jpeg?imageMogr/format/webp/" alt="" />
                    </div>
                    <div >
                        <div className="item">
                            <div className="warp">
                                <h1>推荐有奖</h1>
                                <p>5元现金拿不停</p>
                                <img src="https://fuss10.elemecdn.com/6/76/8d42eef97ff4c1c2b671085358541jpeg.jpeg?imageMogr/format/webp/" alt="" />
                            </div>
                        </div>
                        <div className="item">
                            <div className="warp">
                                <h1>推荐有奖</h1>
                                <p>5元现金拿不停</p>
                                <img src="https://fuss10.elemecdn.com/5/10/2351e989d4171479ba0d7b5c06053jpeg.jpeg?imageMogr/format/webp/" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="gift">
                    <div className="title">
                        <div className="line1">
                            <span className="line-left"></span>
                            <Icon name='alarm'></Icon>
                            <p>限时好礼</p>
                            <span className="line-right"></span>
                        </div>
                        <p className="line2">金币换豪礼</p>
                    </div>
                    <div className="merchandise">
                        <div className="item">
                            <p className="label">限时优惠</p>
                            <img src="https://fuss10.elemecdn.com/c/66/89cc6ef54261bbd98b94deeff2546jpeg.jpeg?imageMogr/format/webp/" alt="" />
                            <p className="name">3元饿了么红包</p>
                            <p className="price">90金币<span>¥3</span></p>
                        </div>
                        <div className="item">
                            <p className="label">限时优惠</p>
                            <img src="https://fuss10.elemecdn.com/c/66/89cc6ef54261bbd98b94deeff2546jpeg.jpeg?imageMogr/format/webp/" alt="" />
                            <p className="name">3元饿了么红包</p>
                            <p className="price">90金币<span>¥3</span></p>
                        </div>
                        <div className="item">
                            <p className="label">限时优惠</p>
                            <img src="https://fuss10.elemecdn.com/c/66/89cc6ef54261bbd98b94deeff2546jpeg.jpeg?imageMogr/format/webp/" alt="" />
                            <p className="name">3元饿了么红包</p>
                            <p className="price">
                                <span>90金币</span>
                                <span className="small">¥3</span>
                            </p>
                        </div>
                    </div>
                    <div className="more">
                        <p>查看更多<span>></span></p>
                    </div>
                </section>
                <FooterNav></FooterNav>
            </div>
        )
    }
}


export default Explore