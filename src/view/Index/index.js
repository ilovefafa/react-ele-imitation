import React, { Component } from "react";
import Swiper from 'react-id-swiper';
import Icon from '../../components/Icon/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import shopsService from '@services/shopsService'
import BackToTop from '@/components/BackToTop/'
import { throttle } from 'throttle-debounce';
import { store } from '@/index.js'
import { connect } from 'react-redux'
import { locationAction } from '@/redux/actions/'
//css
import location from "@icon/location.svg"
import down from "@icon/down.svg"
import search from "@icon/search.svg"
import './style.scss'
import './swiper.min.css'
//component
import SelectCity from './view/SelectCity/'
import SelectLocation from './view/SelectLocation/'
import FullLoading from '../FullLoading/'

class Index extends Component {
    constructor() {
        super()
        this.state = {
            toggleSelectLocation: false,
            goSelectCity: false,
            goSelectLocation: false,
        }
    }
    handleTogglePage = () => {
        this.setState({ toggleSelectLocation: true })
    }
    goSelectCity = () => {
        this.setState({ goSelectCity: true })
        if (window.history.state === null || (window.history.state.name !== 'selectCity')) {
            window.history.pushState({ name: 'selectCity' }, "test", "")
        }
        window.onpopstate = () => {
            let name = window.history.state && window.history.state.name
            if (name === 'selectCity') {
                this.setState({ goSelectLocation: false, })
                return
            }
            if (name !== 'selectCity' || 'selectLocation') {
                this.setState({ goSelectLocation: false, goSelectCity: false })
                return
            }
        };
    }
    componentDidMount() {
        document.title = "首页"
    }
    componentWillUnmount() {
        window.onpopstate = ''
    }
    componentDidUpdate() {
        let { popupManual } = this.props
        if (popupManual) {
            this.goSelectCity()
            this.props.dispatch(locationAction({ popupManual: false }))
        }
    }
    render() {
        let { isFetch } = this.props
        return (
            <div className="index">
                <Header {...this.props} goSelectCity={this.goSelectCity}></Header>
                <SearchBar />
                <NavBar />
                <Board />
                <ShopListTitle />
                <ShopFilter />
                <ShopList />
                <BackToTop />
                <SelectCity toggle={this.state.goSelectCity} next={() => { this.setState({ goSelectLocation: true }) }}></SelectCity>
                <SelectLocation toggle={this.state.goSelectLocation}></SelectLocation>
                {isFetch ? <FullLoading /> : ''}
            </div>
        )
    }
}

class Header extends Component {
    render() {
        let { name = 'name', city = 'city' } = this.props
        return (
            <div className="index-header" >
                <div className="location-warp">
                    <a onClick={this.props.goSelectCity}>
                        <div className="selector">
                            <img src={location} alt="" className="location-icon" />
                            <p>{city + name}</p>
                            <img src={down} alt="" className="down-icon" />
                        </div>
                    </a>
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

class NavBar extends Component {
    render() {
        const params = {
            // containerClass: 'navbar-swiper-container',
            pagination: {
                el: '.swiper-pagination.navbar-swiper-pagination',
                clickable: true
            },
            spaceBetween: 30
        }
        const navData = [
            [
                {
                    url: 'https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
                    name: '美食',
                    link: '/'
                },
                {
                    url: 'https://fuss10.elemecdn.com/e/89/185f7259ebda19e16123884a60ef2jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
                    name: '晚餐',
                    link: '/'
                },
                {
                    url: 'https://fuss10.elemecdn.com/c/7e/76a23eb90dada42528bc41499d6f8jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
                    name: '商超便利',
                    link: '/',
                },
                {
                    url: 'https://fuss10.elemecdn.com/0/d0/dd7c960f08cdc756b1d3ad54978fdjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
                    name: '果蔬生鲜',
                    link: '/',
                },
                {
                    url: 'https://fuss10.elemecdn.com/7/0a/af108e256ebc9f02db599592ae655jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
                    name: '医药健康',
                    link: '/',
                },
                {
                    url: 'https://fuss10.elemecdn.com/a/7b/b02bd836411c016935d258b300cfejpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
                    name: '大牌5折',
                    link: '/',
                },
                {
                    url: 'https://fuss10.elemecdn.com/3/01/c888acb2c8ba9e0c813f36ec9e90ajpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
                    name: '浪漫鲜花',
                    link: '/',
                },
                {
                    url: 'https://fuss10.elemecdn.com/e/c7/b7ba9547aa700bd20d0420e1794a8jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
                    name: '麻辣烫',
                    link: '/',
                },
                {
                    url: 'https://fuss10.elemecdn.com/a/8a/ec21096d528b7cfd23cdd894f01c6jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
                    name: '地方菜系',
                    link: '/',
                },
                {
                    url: 'https://fuss10.elemecdn.com/7/b6/235761e50d391445f021922b71789jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
                    name: '披萨意面',
                    link: '/',
                },
            ],
            [
                {
                    url: '//fuss10.elemecdn.com/7/d6/6f2631288a44ec177204e05cbcb93jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
                    name: '地方小吃',
                    link: '/',
                },
            ]
        ]
        return (
            <div className="navbar">
                <Swiper {...params}>
                    {navData.map((item1, index1) => {
                        return (
                            <div className="navbar-group" key={index1}>
                                {item1.map((item2, index2) => {
                                    return (
                                        <div className="item" key={index2}>
                                            <img src={item2.url} alt="" />
                                            <p>{item2.name}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </Swiper>
            </div>
        )
    }
}

class Board extends Component {
    render() {
        const data = [
            {
                title: '品质套餐',
                desc: '搭配齐全吃得好',
                go: '立即抢购 >',
                img: 'https://fuss10.elemecdn.com/d/d4/16ff085900d62b8d60fa7e9c6b65dpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/',
            },
            {
                title: '限量抢购',
                desc: '超值美味 9.9元起',
                go: '立即抢购 >',
                quantity: '1118人',
                img: 'https://fuss10.elemecdn.com/b/e1/0fa0ed514c093a7138b0b9a50d61fpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/',
            },
        ]
        return (
            <div className="board" >
                <div className="warp">
                    {data.map((item, index) => {
                        return (
                            <div className="item" key={index}>
                                <h1>{item.title}</h1>
                                <h2>{item.desc}</h2>
                                <h3><span>{item.quantity}</span>{item.go}</h3>
                                <img src={item.img} alt="" />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

class ShopListTitle extends Component {
    render() {
        return (
            <div className="ShopListTitle" >
                <p>推荐商家</p>
                {/* <div className="shade"></div> */}

            </div>
        )
    }
}

class ShopFilter extends Component {
    constructor() {
        super()
        this.state = {
            expandName: '',
            sortExpandStatus: false,
            activeSortIndex: '',
            filterSelect: {
                service: [],
                event: '',
                perComsumption: ''
            }
        }
        this.filterSelect = {
            service: [],
            event: '',
            perComsumption: ''
        }
    }
    unfoldSort = (e) => {
        let text = e.currentTarget.getElementsByTagName('p')[0].innerText
        let html = document.getElementsByTagName('html')[0]
        if (text === '筛选') this.filterSelect = JSON.parse(JSON.stringify(this.state.filterSelect))
        this.setState({
            sortExpandStatus: !this.state.sortExpandStatus,
            expandName: text
        })
        if (html.scrollTop < 450) html.scrollTop = 450
    }
    handleSort = (name, index) => {
        let activeSortIndex = this.state.activeSortIndex
        if (activeSortIndex === index) {
            this.setState({
                activeSortIndex: '',
                sortExpandStatus: false,
            })
        } else {
            this.setState({
                activeSortIndex: index,
                sortExpandStatus: false,
            })
        }
    }

    handleSelect = (name, index, title) => {
        if (title === '优惠活动 (单选)') {
            this.filterSelect.event = this.filterSelect.event === name ? '' : name
        }
        if (title === '人均消费') {
            this.filterSelect.perComsumption = this.filterSelect.perComsumption === name ? '' : name

        }
        if (title === '商家服务 (可多选)') {
            let findIndex = this.filterSelect.service.indexOf(name)
            if (findIndex !== -1) {
                this.filterSelect.service.splice(findIndex, 1)
            } else {
                this.filterSelect.service.push(name)
            }
        }
        this.forceUpdate()

    }

    confirmFilter = () => {
        this.setState({
            filterSelect: this.filterSelect,
            sortExpandStatus: false
        })
    }

    cancelFilter = () => {
        this.filterSelect = {
            service: [],
            event: '',
            perComsumption: ''
        }
        this.forceUpdate()
    }

    render() {
        const data = [
            {
                name: '综合排序',
            },
            {
                name: '销量最高',
            },
            {
                name: '起送价最低',
            },
            {
                name: '配送最快',
            },
            {
                name: '配送费最低',
            },
            {
                name: '人均从低到高',
            },
            {
                name: '人均从高到低',
            },
        ]
        const filterData = [
            {
                title: '商家服务 (可多选)',
                list: [
                    {
                        img: 'https://fuss10.elemecdn.com/b/9b/45d2f6ff0dbeef3a78ef0e4e90abapng.png?imageMogr/format/webp/thumbnail/!24x24r/gravity/Center/crop/24x24/',
                        name: '蜂鸟专送'
                    },
                    {
                        img: 'https://fuss10.elemecdn.com/6/7c/417ba499b9ef8240b8014a453bf30png.png?imageMogr/format/webp/thumbnail/!24x24r/gravity/Center/crop/24x24/',
                        name: '品牌商家'
                    },
                    {
                        img: 'https://fuss10.elemecdn.com/2/cd/444d002a94325c5dff004fb3b9505png.png?imageMogr/format/webp/thumbnail/!24x24r/gravity/Center/crop/24x24/',
                        name: '食安保'
                    },
                    {
                        img: 'https://fuss10.elemecdn.com/c/93/ded991df780906f7471128a226104png.png?imageMogr/format/webp/thumbnail/!24x24r/gravity/Center/crop/24x24/',
                        name: '新店'
                    },
                    {
                        img: 'https://fuss10.elemecdn.com/3/d4/5668ffc03151826f95b75249bea31png.png?imageMogr/format/webp/thumbnail/!24x24r/gravity/Center/crop/24x24/',
                        name: '开发票'
                    },
                ]
            },
            {
                title: '优惠活动 (单选)',
                list: [{ name: '新用户优惠' }, { name: '特价商品' }, { name: '下单立减' }, { name: '赠品优惠' }, { name: '下单返红包' }, { name: '进店领红包' }]
            },
            {
                title: '人均消费',
                list: [{ name: '¥20以下' }, { name: '¥20 - ¥40' }, { name: '¥40 - ¥60' }, { name: '¥60 - ¥80' }, { name: '¥80 - ¥100' }, { name: '¥100以上' }]
            }
        ]
        let comprehensiveSortClass = 'item'
        this.state.sortExpandStatus ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
        if (typeof this.state.activeSortIndex === 'number') comprehensiveSortClass += ' active'
        if (this.state.sortExpandStatus && this.state.expandName === '综合排序') comprehensiveSortClass += ' activeBlue'
        return (
            <React.Fragment>
                {this.state.sortExpandStatus ?
                    <div onClick={() => this.setState({ sortExpandStatus: false })} className="shade"></div> :
                    ''}

                <div className="ShopFilter" >
                    <div className="warp">
                        <div
                            onClick={this.unfoldSort.bind(this)}
                            className={comprehensiveSortClass}
                        >
                            <p>综合排序</p>
                            <svg viewBox="0 0 72 32" xmlns="http://www.w3.org/2000/svg"><path d="M36 32l36-32h-72z"></path></svg>
                        </div>
                        <div onClick={this.handleSort.bind(this, '距离最近', '距离最近')} className={this.state.activeSortIndex === "距离最近" ? "item active" : "item"}>
                            <p>距离最近</p>
                        </div>
                        <div onClick={this.handleSort.bind(this, '品质联盟', '品质联盟')} className={this.state.activeSortIndex === "品质联盟" ? "item active" : "item"}>
                            <p>品质联盟</p>
                        </div>
                        <div className="item" onClick={this.unfoldSort}>
                            <p>筛选</p>
                            <Icon file="icons1.sprite" name="more-filter"></Icon>
                        </div>
                    </div>
                    <div className={this.state.sortExpandStatus && this.state.expandName === '综合排序' ? "sortList expand" : "sortList"} >
                        <ul>
                            {data.map((item, index) => {
                                return (
                                    <li
                                        onClick={this.handleSort.bind(this, item.name, index)}
                                        key={index}
                                        className={this.state.activeSortIndex === index ? 'active' : ""}
                                    >
                                        <span>{item.name}</span>
                                        <img src={require('@icon/mark.png')} alt="" />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className={this.state.sortExpandStatus && this.state.expandName === '筛选' ? "filterExpand expand" : "filterExpand"} >
                        <div className="filterExpandWarp">
                            {filterData.map((item, index) => {
                                return (
                                    <dl key={index}>
                                        <dt>{item.title}</dt>
                                        <div>
                                            {item.list.map((item1, index1) => {
                                                return (
                                                    <React.Fragment key={index1}>
                                                        <dd onClick={this.handleSelect.bind(this, item1.name, index1, item.title)}
                                                            className={
                                                                (() => {
                                                                    let active
                                                                    if (item.title === '商家服务 (可多选)' && this.filterSelect.service.indexOf(item1.name) !== -1) active = 'active'
                                                                    if (item.title === '优惠活动 (单选)' && this.filterSelect.event === item1.name) active = 'active'
                                                                    if (item.title === '人均消费' && this.filterSelect.perComsumption === item1.name) active = 'active'
                                                                    return active
                                                                })()

                                                            }>
                                                            {item1.img ? <img src={item1.img} alt="" /> : ''}
                                                            <span>{item1.name}</span>
                                                        </dd>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </div>
                                    </dl>
                                )
                            })}
                        </div>
                        <div className="operator">
                            <span onClick={this.cancelFilter}>清空</span>
                            <span onClick={this.confirmFilter}>确定</span>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

class ShopList extends Component {
    constructor(props) {
        super(props);
        this.state = { eventButton: false, listData: [], loading: false };
    }
    unfoldEvent = () => {
        this.setState({
            eventButton: !this.state.eventButton
        })
    }
    lazyLoad = (loadDistance, limit) => {
        let times = 1
        let skip = limit
        return throttle(300, () => {
            if (this.state.loading) return

            let currentDistance = document.documentElement.scrollTop
            let maxMoveDistance = document.body.offsetHeight - window.innerHeight
            if (maxMoveDistance - currentDistance < loadDistance) {
                this.warpShopsService(limit, skip)()
                times += 1
                skip = limit * times
            }
        })
    }
    warpShopsService = (limit, skip) => {
        return async () => {

            this.setState({
                loading: true,
            })
            const respone = await shopsService.get(limit, skip)
            let data = respone.data.data
            for (let i = 0; i < data.length; i++) {
                data[i].unfold = false;
            }
            if (data.length === 0) {
                window.removeEventListener('scroll', this.lazyLoadFunction)
            }
            this.setState({
                listData: [...this.state.listData, ...data],
                loading: false
            })


        }
    }

    componentDidMount() {
        this.lazyLoadFunction = this.lazyLoad(600, 5)
        this.warpShopsService(5)()
        window.addEventListener('scroll', this.lazyLoadFunction)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.lazyLoadFunction)
    }
    render() {
        return (
            <div className="ShopList" >
                {this.state.listData.map((item, index) => {
                    return (
                        <div className="warp" key={index}>
                            <div className="logo">
                                <img src={item.img} alt="" />
                            </div>
                            <div className="desc">
                                <div className="section1">
                                    <div>
                                        {item.brand ? <i>品牌</i> : null}
                                        <span>{item.name}</span>
                                    </div>
                                </div>
                                <div className="section2">
                                    <div className="left">
                                        <div className="star-warper">
                                            <div><img src={require("@icon/hollowStar.svg")} alt="" /></div>
                                            <div style={{ width: (item.grade / 5) * 100 + '%' }}>  <img src={require("@icon/star.svg")} alt="" /></div>
                                        </div>
                                        <span className="grade">{item.grade}</span>
                                        <span >月售{item.monthlySales}单</span>
                                    </div>
                                    <div className="right">
                                        <div className="hummingbirdDelivery">
                                            蜂鸟专送
                                            </div>
                                    </div>
                                </div>
                                <div className="section3">
                                    <div className="left">
                                        <span>¥{item.minOrderPrice}起送</span>
                                        <span>配送费¥{item.deliveryPrice}</span>
                                    </div>
                                    <div className="right">
                                        <span>{item.distance}</span>
                                        <span>{item.time}分钟</span>
                                    </div>
                                </div>
                                <div className="section4">
                                    <span>{item.label[0]}
                                        <span>{item.label[0]}</span>
                                    </span>
                                </div>
                                <div className='section5' >
                                    <div><span>首<span>首</span></span><p>{item.firstOrder}</p></div>
                                    <div onClick={() => {
                                        this.setState({
                                            'listData[index][unfold]': true
                                        })
                                        item.unfold = !item.unfold
                                    }} ><span>{item.event.length + 2}个活动</span><img className={this.state.eventButton ? '' : 'rotate'} src={require('@icon/dropdown1.svg')} alt="" /></div>
                                </div>
                                <div className="section6">
                                    <div> <span>满<span>满</span></span><p>{item.discount}</p></div>
                                </div>
                                <div className="section7" style={item.unfold ? { display: 'block', } : { display: 'none', }}>
                                    {item.event.map((item1, key1) => {
                                        return (
                                            <div key={key1}> <span>首<span>首</span></span><p>{item1}</p></div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="loading">
                    {this.state.loading ?
                        <div><FontAwesomeIcon icon="spinner" className="spinner" />正在加载... </div> : ''}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    ...state.userInfo.location
})

export default connect(mapStateToProps)(Index)