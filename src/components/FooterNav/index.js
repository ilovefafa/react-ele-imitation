import React, { Component } from 'react';
import Icon from '../Icon/'
import './style.scss'

class FooterNav extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="FooterNav" >
                    <Item></Item>
                </div>
                <div className="FooterNav-placeholder"></div>
            </React.Fragment>
        )
    }
}

class Item extends Component {
    render() {
        const itemData = {
            file: 'icons2.sprite',
            items: [
                {
                    name: '首页',
                    icon: 'h5-component-indexRegular',
                    activeIcon: 'h5-component-index'
                },
                {
                    name: '发现',
                    icon: 'h5-component-discoverRegular',
                    activeIcon: 'h5-component-discover'
                },
                {
                    name: '订单',
                    icon: 'h5-component-orderRegular',
                    activeIcon: 'h5-component-order'
                },
                {
                    name: '我的',
                    icon: 'h5-component-profileRegular',
                    activeIcon: 'h5-component-profile'
                },
            ]
        }
        return (
            itemData.items.map((item, index) => {
                return (
                    <a className="item" key={index}>
                        <Icon file={itemData.file} name={item.icon}></Icon>
                        <p>{item.name}</p>
                    </a>
                )
            })
        )
    }
}


export default FooterNav