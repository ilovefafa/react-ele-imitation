import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './style.scss'
class AuthRoute extends Component {
  render() {
    let { component: Component, isLogin, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={props =>
          isLogin ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.userInfo.isLogin
  }
}

export default withRouter(connect(mapStateToProps)(AuthRoute))
