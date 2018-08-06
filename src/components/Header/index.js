import React, { Component } from 'react';
import location from "./location.svg"
import down from "./down.svg"
import search from "./search.svg"
import './style.scss'
class Header extends Component {
    render() {
        return (
            <div className="header" >
                <Location></Location>
            </div>
        )
    }
}

class Location extends Component {
    render() {
        return (
            <div className="location-warp">
                <div className="selector">
                    <img src={location} alt="" className="location-icon" />
                    <p>广州市番禺区人民政府</p>
                    <img src={down} alt="" className="down-icon" />
                </div>
            </div>
        )
    }
}

class SearchBar extends Component {
    render() {
        return (
            <div className="search-bar">
                <div className="button">
                    <a href="/">
                        <img src={search} alt="" className="search-icon" />
                        <span>搜索饿了么商家、商品名称</span>
                    </a>
                </div>
            </div>
        )
    }
}


export { Header, SearchBar } 