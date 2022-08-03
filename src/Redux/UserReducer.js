import { createSlice } from '@reduxjs/toolkit'

const UserReducer = createSlice({
  name: 'allUsers',
  initialState: {
    users: [],
    totalUsers: 0,
    pending: false,
    error: false,
  },
  reducers: {
    requestPending: (state) => {
      state.pending = true
    },
    allUsers: (state, action) => {
      state.users = action.payload
      state.totalUsers = action.payload.length
      state.pending = false
      state.error = false
    },
    requestError: (state) => {
      state.pending = false
      state.error = true
    },
  },
})
export const { requestPending, allUsers, requestError } = UserReducer.actions
export default UserReducer.reducer
