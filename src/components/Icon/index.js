import React, { Component } from "react";
import "./style.scss";

class Icon extends Component {
  render() {
    const { file, name, url } = this.props;
    return (
      <svg onClick={this.props.onClick} className={`${name}`}>
        {file ? <use xlinkHref={`#${file}_${name}`} /> : ""}
        {url ? <use xlinkHref={`${url}#${name}`} /> : ""}
        {!file && !url ? <use xlinkHref={`#${name}`} /> : ""}
      </svg>
    );
  }
}

export default Icon;
