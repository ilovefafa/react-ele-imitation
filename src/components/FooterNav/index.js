import React, { Component } from 'react';
import Icon from '../Icon/'
import './style.scss'
import { NavLink, withRouter } from 'react-router-dom'
class FooterNav extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="FooterNav" >
                    <RouterItem></RouterItem>
                </div>
                <div className="FooterNav-placeholder"></div>
            </React.Fragment>
        )
    }
}

const RouterItem = withRouter(props => <Item {...props} />);

class Item extends Component {
    constructor() {
        super()
        this.activeIndex = 0
    }
    render() {
        const itemData = {
            file: 'icons2.sprite',
            items: [
                {
                    name: '首页',
                    icon: 'h5-component-indexRegular',
                    activeIcon: 'h5-component-index',
                    link: '/'
                },
                {
                    name: '发现',
                    icon: 'h5-component-discoverRegular',
                    activeIcon: 'h5-component-discover',
                    link: '/explore'
                },
                {
                    name: '订单',
                    icon: 'h5-component-orderRegular',
                    activeIcon: 'h5-component-order',
                    link: '/order'
                },
                {
                    name: '我的',
                    icon: 'h5-component-profileRegular',
                    activeIcon: 'h5-component-profile',
                    link: '/profile'
                },
            ]
        }
        return (
            itemData.items.map((item, index) => {
                return (
                    // <NavLink isActive={() => { if (this.state.activeIndex !== index) this.setState({ activeIndex: index }) }} exact={item.link === "/"} to={item.link} className="item" key={index}>
                    <NavLink exact={item.link === "/"} to={item.link} className="item" key={index}>
                        <Icon file={itemData.file} name={this.props.location.pathname === item.link ? item.activeIcon : item.icon}></Icon>
                        <p>{item.name}</p>
                    </NavLink>

                )
            })
        )
    }
}


export default FooterNav