import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { store } from '@/index.js'
import './style.scss'
import { debounce } from 'throttle-debounce'
import mapService from '@services/mapService'
import { manualAddName } from '@action'
class SelectLocation extends Component {
    constructor() {
        super()
        this.state = {
            location: {
                city: '选择城市'
            }
        }
        this.searchTips = []
        this.isResquest = false
    }
    componentDidMount() {
        let location = store.getState().userInfo.location
        this.setState({ city: location.city })
        this.debounceSearch = debounce(1000, async (query) => {
            let region = store.getState().userInfo.location.city
            if (region !== '选择城市' && query !== '') {
                let respone = await mapService.placeSuggestion(query, region)
                this.searchTips = respone.data.tips
                this.isResquest = false
                this.forceUpdate()
            }
        })
    }
    search = (e) => {
        if (!this.isResquest) {
            let query = e.target.value
            if (this.searchTips !== []) {
                this.searchTips = []
                this.forceUpdate()
            }
            this.isResquest = true
            this.debounceSearch(query)
        }
    }
    handleClickItem = (e) => {
        let name = e.currentTarget.querySelector('h3').innerText
        this.props.dispatch(manualAddName(name))
        window.localStorage.setItem('name', name)
        window.history.back()
    }
    render() {
        return (
            <div className="SelectLocation">
                <div className='warp'>
                    <div className="header" >
                        <img onClick={function () { window.history.back() }} src={require('@icon/leftArrow.svg')} alt="" />
                        <p>选择收货地址</p>
                    </div>
                    <div className="select">
                        <Link to="/selectCity" className="selectCity">
                            <div >
                                <span>{this.state.city}</span>
                                <img src={require('@icon/dropdown.svg')} alt="" />
                            </div>
                        </Link>
                        <div className="input">
                            <img src={require("@icon/search.svg")} alt="" />
                            <input onChange={this.search} type="search" placeholder="请输入地址" />
                        </div>
                    </div>
                    <div className="list">
                        {this.searchTips.map((item, index) => {
                            return (
                                <div key={index} className="item">
                                    <div className="warp" onClick={this.handleClickItem}>
                                        <h3>{item.name}</h3>
                                        <p>{item.district + item.address}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}


export default connect()(SelectLocation)