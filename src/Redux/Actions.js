export const fetchAllUsers = (users) => {
  return {
    type: 'FETCH_USERS',
    payload: users,
  }
}
export const authenticatedUser = (user) => {
  return {
    type: 'USER_PROFILE_DETAILS',
    payload: user,
  }
}
