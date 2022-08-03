import axios from 'axios'
import { allUsers, requestError, requestPending } from './UserReducer'

export const fetchAllUsers = async (dispatch) => {
  dispatch(requestPending())
  try {
    const fetchUsers = await axios.get(
      'https://jsonplaceholder.typicode.com/users',
    )
    dispatch(allUsers(fetchUsers.data))
  } catch (error) {
    dispatch(requestError())
  }
}
