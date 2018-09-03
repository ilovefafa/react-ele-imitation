import { combineReducers } from 'redux'

function location(state = {}, action) {
  switch (action.type) {
    case 'LOCATION':
      return {
        ...state,
        ...action.location
      }
    case 'IS_LOCATION_FETCH':
      return {
        ...state,
        isFetch: action.isFetch
      }
    case 'MANUAL_ADD_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'MANUAL_ADD_CITY':
      return {
        ...state,
        name: " ",
        city: action.city
      }
    default:
      return state
  }
}

function info(state = {}, action) {
  switch (action.type) {
    case 'GET_USER_INFO':
      return {
        ...state,
        ...action.info
      }
    case 'UPDATE_USERINFO':
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}

function isLogin(state = {}, action) {
  switch (action.type) {
    case 'LOGIN':
      return action.isLogin
    default:
      return state
  }
}

const userInfo = combineReducers({
  isLogin,
  location,
  info
})

export default userInfo