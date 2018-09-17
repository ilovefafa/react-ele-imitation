import axios from 'axios'
//redux
import { store } from '../index'
import { isLogin } from '../redux/actions/index'
const client = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8080'
        : 'http://yinengdk.com/ele',
})

client.interceptors.request.use(function (config) {
    if (config.noInterceptors) return config
    config.headers = {
        'X-Custom-Header': 'foobar',
        // 'Accept': 'application/json,image/*'
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

function request(options) {
    function onSuccess(response) {
        let _isLogin = store.getState().userInfo.isLogin
        if (response.data.login === undefined) return response.data
        if (response.data.login === true) {
            if (_isLogin === false) { isLogin(true) }
        } else {
            if (_isLogin === true) { isLogin(false) }
        }
        return response.data
    }
    function onError(error) {
        // console.error('Request Failed:', error.config);
        console.error(error);

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            // console.error('Status:', error.response.status);
            // console.error('Data:', error.response.data);
            // console.error('Headers:', error.response.headers);

        } else {
            // Something else happened while setting up the request
            // triggered the error
            // console.error('Error Message:', error.message);
        }

        return Promise.reject(error.response || error.message);
    }

    return client(options).then(onSuccess).catch(onError)
}



export default request