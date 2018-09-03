import React, { Component } from 'react';
import './style.scss'
import cityData from './city.json'
import { debounce } from 'throttle-debounce'
import { manualAddCity } from '@/redux/actions'
import { connect } from 'react-redux'

class SelectCity extends Component {
    constructor() {
        super()
        this.state = {
            transition: false,
            goSelectLocation: false,
        }
    }
    jumpAnchor = (e) => {
        let element = document.querySelector('#' + e.target.innerText)
        let headerOffset = (window.innerWidth / 100) * 23.466;
        let elementPosition = element.getBoundingClientRect().top;
        let SelectCity = document.querySelector('.SelectCity')
        SelectCity.scrollBy({
            // behavior: 'smooth',
            top: elementPosition - headerOffset,
        });
    }
    search = (e) => {
        this.value = e.target.value
        this.debounceSearch(this.value)
    }

    select = (e) => {
        this.props.dispatch(manualAddCity(e.target.innerText))
        this.props.next()
        this.goSelectLocation()
    }

    goSelectLocation = () => {
        window.history.pushState({ name: 'selectLocation' }, "test", "")
    }

    componentDidMount() {
        this.debounceSearch = debounce(300, (val) => {
            let tem = []
            cityData.forEach(ele1 => {
                ele1.list.forEach((ele2) => {
                    if (ele2.indexOf(val) !== -1) {
                        tem.push(ele2)
                    }
                })
            });
            this.setState({
                filterDate: tem
            })
        })
        this.setState({ transition: true })
    }
    render() {
        return (
            <React.Fragment>
                <div className={this.props.toggle ? 'SelectCity slide-active' : 'SelectCity'}>
                    <div className='warp'>
                        <div className="header">
                            <img onClick={() => {
                                window.history.back()
                            }} src={require('@icon/leftArrow.svg')} alt="" />
                            <p>城市选择</p>
                        </div>
                        <div className="select">
                            <div className="input">
                                <img src={require("@icon/search.svg")} alt="" />
                                <input onChange={this.search} type="search" placeholder="输入城市名、拼音或首字母查询" />
                            </div>
                        </div>
                        <div className="list">
                            {this.value ?
                                this.state.filterDate.map((item, index) => {
                                    return (
                                        <div key={index} onClick={this.select} className="item" >{item}</div>
                                    )
                                })
                                : cityData.map((item1, index1) => {
                                    return (
                                        <React.Fragment key={index1}>
                                            <div className="title" id={item1.letter}>{item1.letter}</div>
                                            {item1.list.map((item2, index2) => {
                                                return (
                                                    <div onClick={this.select} className="item" key={index2}>{item2}</div>
                                                )
                                            })}
                                        </React.Fragment>
                                    )
                                })}
                        </div>
                    </div>
                    <div className="letterBar">
                        <ul>
                            {cityData.map((item, index) => {
                                return (
                                    <li onClick={this.jumpAnchor} key={index}>{item.letter}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(SelectCity)