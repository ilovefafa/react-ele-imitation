import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./style.scss";
import Gold from "./view/Gold/";
import GoldShop from "./view/GoldShop/";
import MyAddress from "./view/MyAddress/";
import MyService from "./view/MyService/";
import RedPacket from "./view/RedPacket/";
import UserSetting from "./view/UserSetting/";
import SetName from "./view/SetName/";
import SetPassword from "./view/SetPassword/";
import SetPhone from "./view/SetPhone/";
import Money from "./view/Money/";
import Icon from "@/components/Icon/";
import { connect } from "react-redux";
import AuthRoute from "@/components/AuthRoute/";
import HeaderComponent from "@/components/HeaderComponent/";
import FooterNav from "@/components/FooterNav/";

class Profile extends Component {
  render() {
    let { match } = this.props;
    return (
      <div>
        <Route
          exact
          strict
          path="/profile"
          component={connect(mapStateToProps)(ProfileIndex)}
        />
        <AuthRoute path={`${match.url}/gold`} component={Gold} />
        <AuthRoute path={`${match.url}/money`} component={Money} />
        <AuthRoute path={`${match.url}/goldShop`} component={GoldShop} />
        <AuthRoute path={`${match.url}/myAddress`} component={MyAddress} />
        <AuthRoute path={`${match.url}/myService`} component={MyService} />
        <AuthRoute path={`${match.url}/redPacket`} component={RedPacket} />
        <AuthRoute
          exact={true}
          path={`${match.url}/userSetting`}
          component={UserSetting}
        />
        <AuthRoute
          path={`${match.url}/userSetting/setName`}
          component={SetName}
        />
        <AuthRoute
          path={`${match.url}/userSetting/setPassword`}
          component={SetPassword}
        />
        <AuthRoute
          path={`${match.url}/userSetting/setPhone`}
          component={SetPhone}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
});

class ProfileIndex extends Component {
  componentDidMount() {
    document.title = "我的";
  }
  render() {
    let { userInfo, match } = this.props;
    let isLogin = userInfo.isLogin;
    let info = userInfo.info;
    return (
      <div className="Profile">
        <HeaderComponent name="我的" />
        <section className="info">
          <Link to={match.url + "/userSetting"}>
            <div className="warp">
              <img
                src={
                  info.headImg ? info.headImg : require("@icon/eleInfoLogo.png")
                }
                alt=""
              />
              {isLogin ? (
                <div className="login">
                  <h1>{info.name}</h1>
                  <p>
                    <Icon name="mobile" />
                    <span>{info.encryptPhoneNumber}</span>
                  </p>
                </div>
              ) : (
                <div className="login">
                  <h1>登录/注册</h1>
                  <p>
                    <Icon name="mobile" />
                    <span>登录后享受更多特权</span>
                  </p>
                </div>
              )}
              <div>
                <Icon name="arrow-right" />
              </div>
            </div>
          </Link>
        </section>
        <section className="money">
          <Link to={`${match.url}`} className="warp">
            <div className="item">
              {isLogin ? (
                <div style={{ color: "rgb(0, 152, 251)" }} className="value">
                  {info.balance}
                  <span>元</span>
                </div>
              ) : (
                <Icon name="profile-balance" />
              )}
              <p>{"钱包"}</p>
            </div>
          </Link>
          <Link to={`${match.url}/redPacket`} className="warp">
            <div className="item">
              {isLogin ? (
                <div style={{ color: "rgb(255, 95, 62)" }} className="value">
                  {info.redEnvelope}
                  <span>个</span>
                </div>
              ) : (
                <Icon name="luckybag" />
              )}
              <p>{"红包"}</p>
            </div>
          </Link>
          <Link to={`${match.url}/gold`} className="warp">
            <div className="item">
              {isLogin ? (
                <div style={{ color: "rgb(106, 194, 11)" }} className="value">
                  {info.gold}
                  <span>个</span>
                </div>
              ) : (
                <Icon name="profile-coins" />
              )}
              <p>{"金币"}</p>
            </div>
          </Link>
        </section>
        <section className="bar-warp">
          <section className="bar-single">
            <Link className="warp" to={`${match.url}/myAddress`}>
              <Icon name="address" />
              <div className="address-arrow">
                <span>我的地址</span>
                <Icon name="arrow-right" />
              </div>
            </Link>
          </section>
          <section className="bar-group">
            <section className="bar">
              <Link className="warp" to={`${match.url}/goldShop`}>
                <Icon name="point" />
                <div className="address-arrow">
                  <span>金币商城</span>
                  <Icon name="arrow-right" />
                </div>
              </Link>
            </section>
            <section className="bar">
              <Link className="warp" to={`/share`}>
                <Icon name="commend" />
                <div className="address-arrow">
                  <span>分享拿10元现金</span>
                  <Icon name="arrow-right" />
                </div>
              </Link>
            </section>
          </section>
          <section className="bar-group">
            <section className="bar">
              <Link className="warp" to={`${match.url}/myService`}>
                <Icon name="service" />
                <div className="address-arrow">
                  <span>我的客服</span>
                  <Icon name="arrow-right" />
                </div>
              </Link>
            </section>
            <section className="bar">
              <a download="testFile" className="warp" href="/favicon.ico">
                <Icon style={{ fill: "#fff" }} name="download" />
                <div className="address-arrow">
                  <span>下载饿了么APP</span>
                  <Icon name="arrow-right" />
                </div>
              </a>
            </section>
          </section>
        </section>
        <FooterNav />
      </div>
    );
  }
}

export default Profile;
