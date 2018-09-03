import request from '../utlis/request'

function upLoadHeadPicture(file) {
    return request({
        url: '/api/user/upLoadHeadPicture',
        method: 'post',
        data: file,
    })
}

function changeName(name) {
    return request({
        url: '/api/user/name',
        method: 'post',
        data: {
            name
        },
    })
}

function getAuthCode() {
    return request({
        url: '/api/user/authCode',
        method: 'post',
        data: {

        },
    })
}

function confirmAuthCode(authCode) {
    return request({
        url: '/api/user/confirmAuthCode',
        method: 'post',
        data: {
            authCode
        },
    })
}


function getNewPhoneAuthCode(phoneNumber) {
    return request({
        url: '/api/user/newPhoneAuthCode',
        method: 'post',
        data: {
            phoneNumber
        },
    })
}

function confirmNewPhoneAuthCode(authCode, phoneNumber) {
    return request({
        url: '/api/user/newPhoneConfirmAuthCode',
        method: 'post',
        data: {
            authCode,
            phoneNumber
        },
    })
}


export default {
    upLoadHeadPicture,
    changeName,
    getAuthCode,
    confirmAuthCode,
    getNewPhoneAuthCode,
    confirmNewPhoneAuthCode
}