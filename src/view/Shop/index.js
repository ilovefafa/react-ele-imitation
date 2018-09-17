import React, { Component } from "react";
import "./style.scss";
import Icon from '@/components/Icon'
import Loading from '@/components/Loading'
import { formatRespone, eleImg } from '@/utils/parse'
import svgService from '@services/svgService'
import { NavLink, Route } from 'react-router-dom'
import ScrollReveal from 'scrollreveal'
import animateScrollTo from 'animated-scroll-to';
import { debounce } from 'throttle-debounce'
import { updateCart } from '@action/'
import { connect } from 'react-redux'
export default class Shop extends Component {
  constructor() {
    super()
    this.state = {
      isFetch: true,
      openShopMessage: false,
      openShopDiscount: false,
      parseData: {
        rst: ''
      },
    }
  }
  componentWillMount = async () => {
    let res = await window.simulateRequest(require('@/data/menu.json'), 200)
    let parseData = formatRespone(res)
    this.setState({
      parseData,
      isFetch: false
    })
    svgService(require('./svg1.svg'))
    svgService(require('./svg2.svg'))
  }
  componentDidMount() {
  }
  render() {
    let { rst } = this.state.parseData
    let { isFetch, openShopMessage, openShopDiscount } = this.state
    let { match } = this.props
    return (
      isFetch
        ? <Loading />
        : <div className="Shop" >
          <div className="bg" style={{ backgroundImage: `url(${eleImg(rst.shop_sign.image_hash, '750x')})` }}>
            <div className="back" onClick={() => { window.history.back() }}></div>
            <div className="head-img">
              <img src={eleImg(rst.image_path)} alt="" />
            </div>
          </div>
          <div className="desc">
            <h1>
              <span>粤煲悦好煲仔饭(市桥店)</span>
              <i onClick={() => { this.setState({ openShopMessage: true }) }} />
            </h1>
            <h2>
              <span>评价4.7</span>
              <span>月售7760单</span>
              <span>蜂鸟快送<span>约40分钟</span></span>
            </h2>
            <h3>
              <div>
                <span className="label">满减</span>
                <span className="reduce-price">满22减7，满33减9，满44减11</span>
              </div>
              <div>
                <span onClick={() => this.setState({ openShopDiscount: true })}>51个优惠</span>
              </div>
            </h3>
            <h4>
              公告：【粤煲悦好煲仔饭】承蒙各位亲一直以来的支持和厚爱！从即日起新增（粥、粉、面）系列产品，欢迎大家光临惠顾！
        </h4>
          </div>
          {openShopMessage
            ? <div className="shopMessage">
              <div className="warp">
                <h1>{rst.name}</h1>
                <div className="desc-group">
                  <div className="desription">
                    <h1>{rst.rating}</h1>
                    <h2>评分</h2>
                  </div>
                  <div className="desription">
                    <h1>{`${rst.recent_order_num}单`}</h1>
                    <h2>月售</h2>
                  </div>
                  <div className="desription">
                    <h1>蜂鸟快送</h1>
                    <h2>{`约${rst.order_lead_time}分钟`}</h2>
                  </div>
                  <div className="desription">
                    <h1>{`2.5元`}</h1>
                    <h2>配送费</h2>
                  </div>
                  <div className="desription">
                    <h1>{`${Math.ceil(rst.distance / 100) / 10}km`}</h1>
                    <h2>距离</h2>
                  </div>
                </div>
                <div className="notice-title">
                  <span>公告</span>
                </div>
                <div className="notice-text">
                  {rst.promotion_info}
                </div>
              </div>
              <div onClick={() => { this.setState({ openShopMessage: false }) }} className="close">
                <img src="https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/" alt="" />
              </div>
              <div onClick={() => { this.setState({ openShopMessage: false }) }} className="shade"></div>
            </div>
            : ''}
          {openShopDiscount
            ? <div className="shopDiscount">
              <div className="shade" onClick={() => this.setState({ openShopDiscount: false })}></div>
              <div className="warp">
                <Icon onClick={() => this.setState({ openShopDiscount: false })} name='gray-close' />
                <h1>优惠活动</h1>
                <div className="activities">
                  {rst.activities.map((item, index) => {
                    return (
                      <div key={index} className="activitiy">
                        <span className="label" style={{ backgroundColor: '#' + item.icon_color }}>{item.icon_name}</span>
                        <span className="text">{item.description}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            : ''}
          <div className="navbar">
            {[
              { name: '点餐', path: '' },
              { name: '评价', path: '/review' },
              { name: '商家', path: '/shopInfo' }
            ].map((item, index) => {
              return (
                <NavLink replace exact className="item" key={index} to={`${match.url}${item.path}`}>
                  <p>{item.name}</p>
                </NavLink>
              )
            })}
          </div>
          <Route exact path={`${match.url}`} render={props => <Order data={this.state.parseData}  {...props} />} />
          <Route path={`${match.url}/review`}
            render={props =>
              <Review data={this.state.orderData}
                onOrderFetch={(res) =>
                  this.setState({ orderData: res })}
                {...props} />} />
          <Route path={`${match.url}/shopInfo`} render={props => <ShopInfo data={rst} {...props} />} />
        </div>)
  }
}



class OrderConnect extends Component {
  constructor(props) {
    super(props);
    this.currentPosition = 0
    this.state = {
      isDetailCart: false,
      activeSort: '热销'
    };
  }
  componentDidMount() {
    ScrollReveal({
      container: document.querySelector('.menu-list')
    }).reveal('.menu-list .item')
  }
  componentWillMount() {
    this.debounceMenuScroll = debounce(50, this.menuScroll)
  }
  openDetailCart = () => {
    this.setState({ isDetailCart: !this.state.isDetailCart })
  }
  orderDishes = (dish, action) => {
    let { rst } = this.props.data
    let data = {
      rst,
      dish,
      action
    }
    updateCart(data)
  }
  jumpAnchor = (id, e) => {
    // let element = document.querySelector(`#a${id}`)
    // let elementPosition = element.offsetTop;
    // let scrollTargetNode = document.querySelector('.menu-list')
    // scrollTargetNode.scrollTo({
    //   top: elementPosition,
    // });
    let activeSort = e.currentTarget.querySelector('span').innerText
    let scrollTargetNode = document.querySelector('.menu-list')
    let element = document.querySelector(`#a${id}`)
    this.setState({ activeSort })
    animateScrollTo(element, {
      minDuration: 100,
      maxDuration: 200,
      element: scrollTargetNode,
    })
  }
  //lazyload img
  // menuScroll = () => {
  //   let lazyloadNode = document.querySelectorAll('.lazyload')
  //   let menuHeight = document.querySelector('.menu-list').clientHeight
  //   let scrollTop = document.querySelector('.menu-list').scrollTop
  //   lazyloadNode.forEach(item => {
  //     if (scrollTop > item.offsetTop - menuHeight) {
  //       item.src = item.getAttribute('data-src')
  //       item.className = ''
  //     }
  //   })
  // }
  //监听滚动，激活分类菜单样式
  menuScroll = () => {
    let scrollTop = document.querySelector('.menu-list').scrollTop
    let groupNode = document.querySelectorAll('.menu-group')

    for (let i = 0; i < groupNode.length; i++) {
      if ((i === groupNode.length - 1 && scrollTop >= groupNode[i].offsetTop - 3) ||
        (scrollTop >= groupNode[i].offsetTop - 3 && scrollTop < groupNode[i + 1].offsetTop - 3)) {
        let activeSort = groupNode[i].querySelector('.menu-title').childNodes[0].nodeValue
        this.setState({ activeSort })
      }
    }
  }
  deleteAll = () => {
    this.orderDishes('', 'deleteAll')
    this.setState({ isDetailCart: !this.state.isDetailCart })
  }
  render() {

    let { menu, rst } = this.props.data
    let findShoppingCart = this.props.shoppingCart.find((item) => item.rst.id === rst.id)
    let recommend = this.props.data.recommend[0].items
    let { isDetailCart, activeSort } = this.state
    let totalQuantity = findShoppingCart && findShoppingCart.order.reduce((acc, current) => acc + current.orderQuantity, 0)
    let totalPrice = findShoppingCart && findShoppingCart.order.reduce((acc, current) => acc + current.orderQuantity * current.specfoods[0].price, 0) + 0.5
    return (
      <div className="Order">
        <div className="recommend">
          <h1>商家推荐</h1>
          <div className="swiper">
            <div className="swiper-warp">
              {recommend.map((item, index) => {
                let matchElement = findShoppingCart && findShoppingCart.order.find((item1) => item1.virtual_food_id === item.virtual_food_id)
                return (
                  <div key={index} className="item">
                    <img src={eleImg(item.image_path, '240x')} alt="" />
                    <h1>{item.name}</h1>
                    <h2>{`月售${item.month_sales} 好评率${item.satisfy_rate}%`}</h2>
                    <h3>
                      <p>{item.activity ? `￥${item.activity.fixed_price}` : '数据错误'}</p>
                      <div className="operator">
                        {matchElement ?
                          <React.Fragment>
                            <Icon onClick={this.orderDishes.bind(this, item, -1)} name="cart-add" />
                            <div className="quantity">{matchElement.orderQuantity}</div>
                          </React.Fragment>
                          : ''}
                        <Icon onClick={this.orderDishes.bind(this, item, 1)} name="cart-minus" />
                      </div>
                    </h3>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="menu">
          <div className="sort">
            {menu.map((item, index) => {
              return (
                <div onClick={this.jumpAnchor.bind(this, item.id)} key={index} className={activeSort === item.name ? "sort-item sort-item-active" : 'sort-item'}>
                  {item.icon_url ? <img src={eleImg(item.icon_url, '26x')} alt="" /> : ''}
                  <span>{item.name}</span>
                </div>
              )
            })}
          </div>
          {/* <div className="menu-list" onScroll={this.menuScroll}> */}
          <div className="menu-list" onScroll={this.debounceMenuScroll}>
            <div className="menu-warp">
              {menu.map((item, index) => {
                return (
                  <div key={index} className="menu-group">
                    <div id={`a${item.id}`} className="menu-title">{item.name}<span>{item.description}</span></div>
                    {item.foods.map((item1, index1) => {
                      let dish = findShoppingCart && findShoppingCart.order.find(item2 => item1.virtual_food_id === item2.virtual_food_id)
                      return (
                        <div key={index1} className="item">
                          <img src={eleImg(item1.image_path, '140x140')} alt="" />
                          {/* <img className={index > 0 ? "lazyload" : ''} src={index > 0 ? require('./load.gif') : eleImg(item1.image_path, '140x140')} data-src={eleImg(item1.image_path, '140x140')} alt="" /> */}
                          <div className="menu-desc">
                            <div>
                              <h1>{item1.name}</h1>
                              <h2>{`月售${item1.month_sales}份 好评率${item1.satisfy_rate}%`}</h2>
                            </div>
                            <div className="add-price">
                              <p>{`￥${item1.specfoods[0].price}`}</p>
                              <div className="dish-operator">
                                {
                                  dish && dish.orderQuantity
                                    ? <React.Fragment>
                                      <Icon onClick={this.orderDishes.bind(this, item1, -1)} name="cart-add" />
                                      <div className="quantity">
                                        {dish.orderQuantity}
                                      </div>
                                    </React.Fragment>
                                    : ''
                                }
                                <Icon onClick={this.orderDishes.bind(this, item1, 1)} name="cart-minus" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="shopping-cart">
          <div style={isDetailCart ? { transform: 'translateY(0%)' } : {}} className="detail-cart">
            <div className="disconut">
              <p>欢迎订购</p>
            </div>
            <div className="title">
              <p className="title-desc">已选商品</p>
              <div className="delete-all" onClick={this.deleteAll}>
                <Icon name="cart-remove" />
                <span>清空</span>
              </div>
            </div>
            <div className="list">
              {
                findShoppingCart ? findShoppingCart.order.map((item) => {
                  let price = item.specfoods[0].price
                  let quantity = item.orderQuantity
                  let total = price * quantity
                  return (
                    <div className="item" key={item.virtual_food_id}>
                      <div className="item-desc">
                        <div>
                          <h1>{item.name}</h1>
                          <h2>{item.name}</h2>
                        </div>
                        <p>{total}</p>
                      </div>
                      <div className="operator">
                        <Icon onClick={this.orderDishes.bind(this, item, -1)} name="cart-add" />
                        <p>{quantity}</p>
                        <Icon onClick={this.orderDishes.bind(this, item, 1)} name="cart-minus" />
                      </div>
                    </div>
                  )
                })
                  : ''
              }
            </div>
          </div>
          <div onClick={this.openDetailCart} className="mini-cart">
            <div style={findShoppingCart ? {} : { backgroundColor: '#444' }} className="cart-icon">
              {totalQuantity ? <p>{totalQuantity}</p> : ''}
            </div>
            <div className="mini-cart-desc">
              <h1>{totalPrice ? '￥' + totalPrice : '未选购商品'}</h1>
              <h2>另需配送费0.5元</h2>
            </div>
            <div
              style={findShoppingCart ? {} : { backgroundColor: '#333' }}
              className={findShoppingCart ? "button active" : 'button'}>
              去结算
            </div>
          </div>
        </div>
        <div className="placeholder"></div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    shoppingCart: state.userInfo.shoppingCart
  }
}

const Order = connect(mapStateToProps)(OrderConnect)
class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount = async () => {
    if (!this.props.data) {
      let res = await window.simulateRequest(require('./comment.json'), 200)
      this.props.onOrderFetch(res)
    }
  }
  render() {
    return (
      <div className="Review">
        Review
      </div>
    );
  }
}

class ShopInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="ShopInfo">
        ShopInfo
      </div>
    );
  }
}


