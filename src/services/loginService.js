import request from '../utils/request'

function loginByAccount(account, password) {
    return request({
        url: '/api/login/loginByAccount',
        method: 'post',
        data: {
            account,
            password,
        }
    })
}

function loginByPhoneNumber(phoneNumber, authCode) {
    return request({
        url: '/api/login/loginByPhoneNumber',
        method: 'post',
        data: {
            phoneNumber,
            authCode,
        }
    })
}

function check() {
    return request({
        url: '/api/login/check',
        method: 'get',
    })
}

function getAuthCode(phoneNumber) {
    return request({
        url: '/api/login/getAuthCode',
        method: 'post',
        data: {
            phoneNumber,
        }
    })
}

const loginService = { loginByAccount, loginByPhoneNumber, check, getAuthCode }

export default loginService