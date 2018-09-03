import React, { Component } from 'react';
import Index from './view/Index/index.js'
import Explore from './view/Explore/'
import Order from './view/Order/'
import Profile from './view/Profile/'
import Login from './view/Login/'
import Page404 from './view/404/'
import Share from './view/Share/'
import RouteTest from './routeTest'
import FooterNav from './components/FooterNav/'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import mapService from '@/services/mapService'
import { locationAction } from '@/redux/actions/'
import { isFetch } from '@/redux/actions/'
//css reset
import './css/normalize.css'
import './css/reset.css'
import './css/global.scss'
//svg sprite
import './assets/images/icons2.sprite.svg'
//font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel, faSpinner } from '@fortawesome/free-solid-svg-icons'
library.add(faStroopwafel, faSpinner)

class App extends Component {
  constructor() {
    super()
    this.state = {
      isFetch: true,
    }
  }
  getLocation = async () => {
    isFetch(true)
    let location = await mapService.getLocationAuto()
    if (location) {
      location.locationWay = 'auto'
      location.popupManual = false
      this.props.dispatch(locationAction(location))
    } else {
      location = {
        locationWay: 'manual',
        popupManual: true,
      }
      this.props.dispatch(locationAction(location))
    }
    isFetch(false)
  }
  componentWillMount() {
    this.getLocation()
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/" render={(props) => <Index {...props} />} />
            <Route path="/order" component={Order} />
            <Route path="/explore" component={Explore} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/routetest" component={RouteTest} />
            <Route path='/share' component={Share} />
            <Route component={Page404} />
          </Switch>
          <FooterNav></FooterNav>
        </div >
      </Router>
    );
  }
}

export default connect()(App)