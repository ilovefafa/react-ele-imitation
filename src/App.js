import React, { Component } from 'react';
import Index from './view/Index/index.js'
import SelectCity from './view/SelectCity/'
import SelectLocation from './view/SelectLocation/'
import Explore from './view/Explore/'
import Order from './view/Order/'
import Profile from './view/Profile/'
import Login from './view/Login/'
import FooterNav from './components/FooterNav/'
import { connect } from 'react-redux'
import { getLocationAuto } from './services/mapService'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
//css reset
import './css/normalize.css'
import './css/reset.css'
import './css/global.scss'
//svg sprite
import icons1 from './assets/images/icons1.sprite.svg'
import './assets/images/icons2.sprite.svg'
//font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel, faSpinner } from '@fortawesome/free-solid-svg-icons'
// import { connect } from 'net';
library.add(faStroopwafel, faSpinner)




class App extends Component {
  constructor() {
    super()
    this.state = {
      location: ''
    }
  }
  render() {
    return (
      <Router>
        <div className="app">
          <img src={icons1} alt="" />
          <Switch>
            <Route exact path="/" render={(props) => <Index {...props} location={this.state.location} />} />
            <Route path="/selectlocation" component={SelectLocation} />
            <Route path="/selectCity" render={(props) => <SelectCity {...props} />} />
            <Route path="/explore" component={Explore} />
            <Route path="/order" component={Order} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
          </Switch>
          <FooterNav></FooterNav>
        </div >
      </Router>
    );
  }
  async componentDidMount() {
    try {
      // let location = await getLocationAuto()
      // let location = { city: '广州', title: '番禺广场' }
      // this.props.dispatch(locationAction(location))
      // this.setState({ location: `${location.surroundingPois[0].city}${location.surroundingPois[0].title}` })
    }
    catch (err) {
    }
  }
}

// export default App;
export default connect()(App)