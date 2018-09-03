import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './style.scss'

class Page404 extends Component {
    componentDidMount() {
        document.title = "出错啦..."
    }
    render() {
        return (
            <div className="page404">
                <img src="https://fuss10.elemecdn.com/c/fc/0bf0f273cc4d059cd23f49c1255f1png.png" alt="" />
                <h1>页面好像被送餐员带走了...</h1>
                <p>出现了这个问题，也许是因为您访问了不正确的链接地址，但更可能是由于我们对程序做出了更新，没有及时通知您所造成的。</p>
                <div className="nav">
                    <p>你现在可以:<Link to="/">返回首页</Link></p>
                </div>
            </div>
        )
    }
}


export default Page404