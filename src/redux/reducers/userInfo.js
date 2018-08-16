const userInfo = (state = {}, action) => {
  switch (action.type) {
    case 'LOCATION':
      return {
        ...state,
        location: action.location
      }
    case 'MANUAL_ADD_CITY':
      return {
        ...state,
        location: {
          city: action.city
        }

      }
    case 'MANUAL_ADD_NAME':
      // let { location } = state
      // location.name = action.name
      return {
        ...state,
        location: { ...state.location, name: action.name }
      }
    default:
      return state
  }
}

export default userInfo