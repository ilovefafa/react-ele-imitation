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

function isLogin(state = false, action) {
  switch (action.type) {
    case 'LOGIN':
      return action.isLogin
    default:
      return state
  }
}

function shoppingCart(state = [], action) {
  switch (action.type) {
    case 'UPDATE_SHOPPINGCART':
      if (action.data.action === 'deleteAll') {
        return []
      }
      let currentRSTIndex = ''
      let newState = []
      let deleteRSTIndex = ''
      state.forEach((item, index) => { // 判断购物车中是否已有该饭店的菜单
        if (item.rst.id === action.data.rst.id) {
          currentRSTIndex = index // 记录存在饭店的索引
        }
      })
      if (currentRSTIndex !== '') { //如果存在该饭店
        newState = state.map((item, index) => { // 修改该饭店订单数据，其他饭店不变
          if (currentRSTIndex === index) { // 找到要修改的饭店
            let isExist = false //菜品存在flag
            let deleteIndex = '' // 数量为0的索引
            item.order.forEach((item1, index1) => {// 判断是否已存在该菜
              if (item1.virtual_food_id === action.data.dish.virtual_food_id) {
                item1.orderQuantity = item1.orderQuantity //存在则进行加减
                  + action.data.action
                isExist = true
                if (item1.orderQuantity === 0) {// 如果数量为0，去除该菜的信息。
                  deleteIndex = index1
                }
              }
            })
            if (deleteIndex !== "") {
              item.order.splice(deleteIndex, 1)
            }
            if (item.order.length === 0) deleteRSTIndex = index //如果菜单中没有菜，删除该项
            if (!isExist) {//如果菜单中没有该菜,添加
              action.data.dish.orderQuantity = 1
              item.order.push(action.data.dish)
            }
          }
          return item
        })
        if (deleteRSTIndex !== "") { newState.splice(deleteRSTIndex, 1) }
      } else {
        let newItem = {
          rst: action.data.rst,
          order: [
            action.data.dish
          ]
        }
        newItem.order[0].orderQuantity = 1
        newState = state.slice(0)
        newState.push(newItem)
      }
      return newState
    default:
      return state
  }
}

const userInfo = combineReducers({
  isLogin,
  location,
  info,
  shoppingCart
})

export default userInfo