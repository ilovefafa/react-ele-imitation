import React, { Component } from 'react';
import Index from './view/Index'
import FooterNav from './components/FooterNav/'
//css reset
import './css/normalize.css'
import './css/reset.css'
import './css/global.scss'
//svg sprite
import './assets/images/icons1.sprite.svg'
import './assets/images/icons2.sprite.svg'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Index></Index>
        <FooterNav></FooterNav>
      </div >
    );
  }
}

export default App;
