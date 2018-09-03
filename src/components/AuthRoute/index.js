import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './style.scss'
class AuthRoute extends Component {
  render() {
    let { exact, component: Component, isLogin, ...rest } = this.props
    let _exact = true
    if (exact === false) { _exact = false }
    return (
      <Route
        exact={_exact}
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
// export default AuthRoute
