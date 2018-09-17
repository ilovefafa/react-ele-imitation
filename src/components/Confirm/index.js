import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./style.scss";
export default function(
  options = {
    name: "确认删除",
    detail: "删除后不能恢复"
  },
  cb = function() {
    console.log("confirm");
  }
) {
  if (!document.querySelector("#confirm")) {
    let div = document.createElement("div");
    div.id = "confirm";
    let root = document.querySelector("#root");
    root.appendChild(div);
  }
  ReactDOM.render(
    <Confirm options={options} cb={cb} />,
    document.querySelector("#confirm")
  );
}

class Confirm extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      leave: false
    };
  }
  confirm = () => {
    this.props.cb();
    this.close();
  };
  close = () => {
    this.setState({ leave: true });
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(document.querySelector("#confirm"));
    }, 300);
    // ReactDOM.unmountComponentAtNode(document.querySelector("#confirm"));
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    });
  }

  render() {
    let { options } = this.props;
    let { name, detail } = options;
    let { show, leave } = this.state;
    return (
      <div className="Confirm">
        <React.Fragment>
          <div
            className={
              show ? (leave ? "warp active leave" : "warp active") : "warp"
            }
          >
            <h1> {name}</h1>
            <h2> {detail}</h2>
            <div className="operator">
              <div onClick={this.close} className="button cancel">
                取消
              </div>
              <div onClick={this.confirm} className="button confirm">
                确定
              </div>
            </div>
          </div>
          <div
            onClick={this.close}
            className={
              show
                ? leave
                  ? "shade shade-active shade-leave"
                  : "shade shade-active"
                : "shade"
            }
          />
        </React.Fragment>
      </div>
    );
  }
}
