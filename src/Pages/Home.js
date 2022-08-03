import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DisplayUsers from '../Components/DisplayUsers'
import { ToastContainer, toast } from 'react-toastify'
import './PageStyles/Home.css'
import { fetchAllUsers } from '../Redux/Actions'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchUser, setSearchUser] = useState('')
  const [pageNumber, setPageNumber] = useState(0)

  const allUsersfromReducer = useSelector((state) => state.users)

  const token = sessionStorage.getItem('fakeJWT')

  useEffect(() => {
    loadUsers()
  }, [])
  // load Available Users
  const loadUsers = () => {
    if (token) {
      fetchAllUsers(dispatch)
    } else {
      toast.warn('Please login first')
      navigate('/login')
    }
  }

  // search users
  const searchResult = allUsersfromReducer.users.filter((user) => {
    return Object.keys(user).some((key) =>
      user[key].toString().toLowerCase().includes(searchUser.toLowerCase()),
    )
  })

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
      {!allUsersfromReducer.error ? (
        <div className="container">
          <input
            type="text"
            className="searchInput"
            placeholder="Search User...."
            onChange={(e) => setSearchUser(e.target.value)}
            value={searchUser}
          />
          <span>Showing {searchResult.length} users</span>
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
      ) : (
        <span>{toast.error('Something Went Wrong while fetching Users!')}</span>
      )}
      <ToastContainer />
    </>
  )
}

export default Home
