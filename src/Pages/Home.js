import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DisplayUsers from '../Components/DisplayUsers'
import { ToastContainer, toast } from 'react-toastify'
import { fetchAllUsers } from '../Redux/Actions'
import './PageStyles/Home.css'
const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchUser, setSearchUser] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const allUsersfromReducer = useSelector((state) => state.UserReducer.allUsers)

  const token = sessionStorage.getItem('fakeJWT')

  useEffect(() => {
    loadUsers()
  }, [])
  // load Available Users
  const loadUsers = async () => {
    if (token) {
      const usersData = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      )
      // setUsers(usersData.data)
      dispatch(fetchAllUsers(usersData.data))
    } else {
      toast.warn('Please login first')
      navigate('/login')
    }
  }

  // search users
  let searchResult = []

  if (searchUser === '' || searchUser === null) {
    searchResult = allUsersfromReducer
  } else {
    const result = allUsersfromReducer.filter((user) => {
      return user.name.includes(searchUser)
    })
    searchResult = result
  }
  // pagination
  const showItemsPerPage = 5
  const pageVisited = pageNumber * showItemsPerPage
  const itemsToDisplay = searchResult.slice(
    pageVisited,
    pageVisited + showItemsPerPage,
  )
  const pageCount = Math.ceil(searchResult.length / showItemsPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  return (
    <>
      <div className="container">
        <input
          type="text"
          className="searchInput"
          placeholder="Search User by Name"
          onChange={(e) => setSearchUser(e.target.value)}
          value={searchUser}
        />
        <div className="displayAllUsersContainer">
          {itemsToDisplay && itemsToDisplay.length > 0 ? (
            <DisplayUsers users={itemsToDisplay} />
          ) : (
            <p>No Users To Display</p>
          )}
        </div>

        <div className="pagination">
          <ReactPaginate
            nextLabel={'Next'}
            previousLabel="Previous"
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName="paginationBtns"
            previousLinkClassName="previousBtn"
            nextLinkClassName="nextBtn"
            disabledClassName="paginationDisabled"
            activeClassName="paginationActive"
          />
        </div>
      </div>
    </>
  )
}

export default Home
