export default {
    password(str) {
        // (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(str))
        return /^(?=.*[a-z])(?=.*\d)[^]{1,16}$/.test(str)
    },
    phoneNumber(str) {
        if (!str || str.length !== 11 || isNaN(str)) return false
        return true
    },
    authCode(str) {
        if (str.length !== 6) return '验证码必须等于6位'
        if (isNaN(str)) return '验证码必须是数字'
    }
}



