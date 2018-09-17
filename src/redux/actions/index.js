import { store } from '@/index.js'

export const updateCart = (data) => (store.dispatch(
    {
        type: 'UPDATE_SHOPPINGCART',
        data,
    }
))

export const updateUserInfo = (data) => (store.dispatch(
    {
        type: 'UPDATE_USERINFO',
        data
    }
))


export const isLogin = (isLogin) => (store.dispatch(
    {
        type: 'LOGIN',
        isLogin
    }
))

export const isFetch = (isFetch) => (store.dispatch(
    {
        type: 'IS_LOCATION_FETCH',
        isFetch
    }
))

export const locationAction = (location) => (
    {
        type: 'LOCATION',
        location
    }
)

export const manualAddCity = city => (
    {
        type: 'MANUAL_ADD_CITY',
        city
    }
)

export const manualAddName = name => (
    {
        type: 'MANUAL_ADD_NAME',
        name
    }
)


export const getUserInfo = info => (
    {
        type: 'GET_USER_INFO',
        info
    }
)