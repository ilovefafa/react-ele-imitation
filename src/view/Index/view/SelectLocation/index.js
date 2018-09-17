import React, { Component } from 'react';
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
        this.debounceSearch = debounce(1000, async (query) => {
            let region = store.getState().userInfo.location.city
            if (region !== '选择城市' && query !== '') {
                let respone = await mapService.placeSuggestion(query, region)
                this.searchTips = respone.tips
                this.forceUpdate()
            }
            this.isResquest = false
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
        window.history.go(-2)
    }
    render() {
        let city = store.getState().userInfo.location.city
        return (
            <div className={this.props.toggle ? 'SelectLocation slide-active' : 'SelectLocation'}>
                <div className='warp'>
                    <div className="header" >
                        <img onClick={function () { window.history.back() }} src={require('@icon/leftArrow.svg')} alt="" />
                        <p>选择收货地址</p>
                    </div>
                    <div className="select">
                        <a onClick={() => { window.history.go(-1) }} className="selectCity">
                            <div >
                                <span>{city}</span>
                                <img src={require('@icon/dropdown.svg')} alt="" />
                            </div>
                        </a>
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