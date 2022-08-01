const initialState = {
  allUsers: [],
  authenticatedUser: [],
}
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return {
        ...state,
        allUsers: action.payload,
      }
    case 'USER_PROFILE_DETAILS':
      return {
        ...state,
        authenticatedUser: action.payload,
      }
    default:
      return state
  }
}
export default UserReducer
