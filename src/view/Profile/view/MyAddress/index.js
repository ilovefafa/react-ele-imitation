import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import HeaderComponent from "@/components/HeaderComponent/";
import mapService from "@services/mapService";
import { connect } from "react-redux";
import { debounce } from "throttle-debounce";
import Icon from "@/components/Icon/";
import getSvg from "@services/svgService";
import "./style.scss";
import userService from "@services/userService";
import validate from "@/utils/validate";
class MyAddress extends Component {
  componentWillMount() {
    getSvg(require("@images/iconCollection/myAddress.svg"), "address");
  }
  render() {
    let { match } = this.props;
    return (
      <div className="MyAddress">
        <Route exact path={match.url} component={Index} />
        <Route
          path={match.url + "/add"}
          render={props => <Form name="添加地址" {...props} />}
        />
        <Route
          path={match.url + "/edit"}
          render={props => <Form name="修改地址" {...props} />}
        />
      </div>
    );
  }
}

class Index extends Component {
  constructor() {
    super();
    this.state = {
      addresses: []
    };
  }
  deleteConfirm = _id => {
    window.$confirm(
      {
        name: "确认删除",
        detail: "删除后不能恢复"
      },
      async () => {
        await userService.address({ _id }, "delete");
        let res = await userService.address("get");
        let { addresses } = res.data;
        this.setState({
          addresses
        });
      }
    );
  };
  componentDidMount = async () => {
    let res = await userService.address("get");
    let { addresses } = res.data;
    if (addresses)
      this.setState({
        addresses
      });
  };
  render() {
    let { match } = this.props;
    let { addresses } = this.state;
    return (
      <div className="Index">
        <HeaderComponent name="我的地址" />
        {addresses.map((address, index) => {
          return (
            <div key={address._id} className="address">
              <div className="body">
                <h1>
                  <span> {address.name}</span> <span> {address.gender}</span>
                  <span> {address.phoneNumber}</span>
                </h1>
                <h2>
                  {address.addressLabel ? (
                    <span className="label"> {address.addressLabel}</span>
                  ) : (
                    ""
                  )}
                  <span>
                    {address.address.name +
                      address.houseNumber +
                      address.address.detail}
                  </span>
                </h2>
              </div>
              <div className="operator">
                <Link
                  to={{
                    pathname: match.url + "/edit",
                    state: {
                      ...address
                    }
                  }}
                >
                  <Icon name="edit" />
                </Link>
                <Icon
                  onClick={this.deleteConfirm.bind(this, address._id)}
                  name="delete"
                />
              </div>
            </div>
          );
        })}
        <Link className="newAddress" to={`${match.url}/add`}>
          <img src={require("./add.png")} alt="" /> <p>新增收货地址</p>
        </Link>
      </div>
    );
  }
}

class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      gender: "",
      houseNumber: "",
      addressLabel: "",
      address: {
        name: "",
        detail: ""
      }
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  clickLabel = e => {
    if (e.currentTarget === e.target) return;
    let name = e.currentTarget.getAttribute("name");
    let value = e.target.innerText;
    this.setState({
      [name]: value
    });
  };
  reciveAddress = (name, detail) => {
    this.setState({
      address: {
        name,
        detail
      }
    });
  };
  submit = async () => {
    let { name, gender, phoneNumber, address, houseNumber } = this.state;
    let message = (() => {
      if (!name) return "请填写姓名";
      if (!gender) return "请选择性别";
      if (!validate.phoneNumber(phoneNumber)) return "请填写请正确的号码";
      if (!address.name) return "请选择地址";
      if (!houseNumber) return "请输入门牌号";
    })();
    if (message) {
      window.$message(message);
      return;
    }
    if (this.props.name === "修改地址") {
      await userService.address(this.state, "put");
    } else {
      await userService.address(this.state, "post");
    }
    window.history.back();
  };
  componentDidMount() {
    let { name, location } = this.props;
    if (name === "修改地址") {
      this.setState({
        ...location.state
      });
    }
  }
  render() {
    let { name, match, location } = this.props;
    let {
      phoneNumber,
      address,
      addressLabel,
      gender,
      houseNumber
    } = this.state;
    return (
      <React.Fragment>
        <div
          style={
            location.pathname.indexOf("searchAddress") !== -1
              ? {
                  display: "none"
                }
              : {
                  display: "block"
                }
          }
          className="Form"
        >
          <HeaderComponent name={name} />
          <div className="warp">
            <section className="multi">
              <div className="field">
                <p>联系人</p>
              </div>
              <div className="group">
                <div className="inputWarp">
                  <input
                    name="name"
                    placeholder="你的姓名"
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.name}
                  />
                </div>
                <div
                  onClick={this.clickLabel}
                  name="gender"
                  className="labelGroup"
                >
                  {["先生", "女士"].map((item, index) => {
                    return (
                      <div
                        className={item === gender ? "label checked" : "label"}
                        key={index}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
            <section>
              <div className="field">
                <p>电话</p>
              </div>
              <div className="inputWarp">
                <input
                  name="phoneNumber"
                  placeholder="你的手机号"
                  onChange={this.handleChange}
                  type="text"
                  value={phoneNumber}
                  maxLength="11"
                />
              </div>
            </section>
            <section className="multi">
              <div className="field">
                <p className={address.detail ? "detailPop" : ""}>地址</p>
                <p>门牌号</p>
              </div>
              <div className="group">
                <Link to={`${match.url}/searchAddress`}>
                  <div
                    className={address.detail ? "inputWarp top" : "inputWarp"}
                  >
                    <input
                      value={address ? address.name : ""}
                      name="address"
                      readOnly="redOnly"
                      placeholder="小区/写字楼/学校等"
                      onChange={this.handleChange}
                      type="text"
                    />
                    <Icon name="arrow-right" />
                  </div>
                  {address.detail ? (
                    <p className="addressDetail"> {address.detail}</p>
                  ) : (
                    ""
                  )}
                </Link>
                <div className="inputWarp">
                  <textarea
                    rows="2"
                    name="houseNumber"
                    placeholder="10号楼5层501室"
                    onChange={this.handleChange}
                    type="text"
                    value={houseNumber}
                  />
                  <Icon name="edit" />
                </div>
              </div>
            </section>
            <section>
              <div className="field">
                <p>标签</p>
              </div>
              <div
                onClick={this.clickLabel}
                name="addressLabel"
                className="labelGroup"
              >
                {["家", "学校", "公司"].map((item, index) => {
                  return (
                    <div
                      className={
                        item === addressLabel ? "label checked" : "label"
                      }
                      key={index}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
          <div className="buttonWarp">
            <div onClick={this.submit} className="button">
              确定
            </div>
          </div>
        </div>
        <Route
          path={`${match.url}/searchAddress`}
          render={props => (
            <SearchAddress transmitAddress={this.reciveAddress} {...props} />
          )}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  let { location } = state.userInfo;
  return {
    ...location
  };
};

const SearchAddress = connect(mapStateToProps)(
  class SearchAddress extends Component {
    constructor() {
      super();
      this.state = {
        informations: []
      };
    }
    componentDidMount() {
      let search = async e => {
        let value = e.target.value;
        let res = await mapService.placeSuggestion(value, this.props.city);
        this.setState({
          informations: res.tips
        });
      };
      this.debounceSearch = debounce(1000, search);
    }
    autoSearch = e => {
      e.persist();
      this.searchValue = e.target.value;
      this.debounceSearch(e);
    };
    buttonSearch = async () => {
      let res = await mapService.placeSuggestion(
        this.searchValue,
        this.props.city
      );
      this.setState({
        informations: res.tips
      });
    };
    selectAddress = e => {
      let index = e.currentTarget.getAttribute("index");
      let selectAddress = this.state.informations[index];
      let { name, district, address } = selectAddress;
      this.props.transmitAddress(name, district + address);
      window.history.back();
    };
    render() {
      let { informations } = this.state;
      return (
        <div className="SearchAddress">
          <HeaderComponent name="搜索地址" />
          <div className="warp">
            <div className="searchBox">
              <input
                onChange={this.autoSearch}
                autoFocus
                placeholder="请输入小区/写字楼/学校等"
                type="text"
              />
              <div onClick={this.buttonSearch} className="button">
                搜索
              </div>
            </div>
            <div className="informations">
              {informations.map((information, index) => {
                let { district, name, address } = information;
                return (
                  <div
                    onClick={this.selectAddress}
                    key={index}
                    index={index}
                    className="information"
                  >
                    <h1> {name}</h1> <h2> {district + address}</h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }
);
export default MyAddress;
