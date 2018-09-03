import React, { Component } from 'react';
import './style.scss'
import HeaderComponent from '@/components/HeaderComponent/'
import MessageJS from '@/components/MessageJS/'
import Icon from '@/components/Icon/'
import userService from '@/services/userService'
import { updateUserInfo } from '@action/'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
class UserSetting extends Component {
    fileUpload = async (e) => {
        let files = e.target.files
        let file = files[0]
        e.target.value = ''
        if (!file) return
        if (file.size > 1024 * 1024 * 1) {
            MessageJS('图片过大，请上传小于1MB的图片', 3000)
            return
        }
        let formData = new FormData();
        formData.append('file', file)
        formData.append('test1', 'test')
        let res = await userService.upLoadHeadPicture(formData)
        updateUserInfo({ headImgPath: res.data.path })
    }
    render() {
        let { headImgPath, name, encryptPhoneNumber, changeName } = this.props
        return (
            <div className="UserSetting" >
                <HeaderComponent name='账户信息' />
                <div className="bar head">
                    <input onChange={this.fileUpload} type="file" accept="image/jpeg,image/jpg,image/png" />
                    <div className="left">
                        <p>头像</p>
                    </div>
                    <div className="right">
                        <div className="head-photo" alt="" >
                            {headImgPath ? <img src={headImgPath} alt="" /> : ''}
                        </div>
                        <Icon name="arrow-right"></Icon>
                    </div>
                </div>
                <Link to='/profile/userSetting/setName' onClick={e => changeName ? e.preventDefault() : ''}>
                    <div className="bar">
                        <div className="left">
                            <p>用户名</p>
                        </div>
                        <div className="right">
                            <p>{name}</p>
                            <Icon name="arrow-right"></Icon>
                        </div>
                    </div>
                </Link>
                <h2>账号绑定</h2>
                <Link to='/profile/userSetting/setPhone'>
                    <div className="bar">
                        <div className="left">
                            <Icon url={require('@/assets/images/login.svg')} name="mobile"></Icon>
                            <p>手机</p>
                        </div>
                        <div className="right">
                            <p>{encryptPhoneNumber}</p>
                            <Icon name="arrow-right"></Icon>
                        </div>
                    </div>
                </Link>
                <h2>安全设置</h2>
                <Link to='/profile/userSetting/setPassword'>
                    <div className="bar">
                        <div className="left">
                            <p>登录密码</p>
                        </div>
                        <div className="right">
                            <p className="not-set">未设置</p>
                            <Icon name="arrow-right"></Icon>
                        </div>
                    </div>
                </Link>
                <Link to='/'>
                    <div className="login-out">
                        <p>退出登录</p>
                    </div>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        ...state.userInfo.info
    })
}



export default connect(mapStateToProps)(UserSetting)