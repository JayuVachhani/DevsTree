import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './styles/Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('fakeJWT')
  const logout = () => {
    sessionStorage.removeItem('fakeJWT')
    sessionStorage.removeItem('userId')
    navigate('/login')
  }
  return (
    <>
      <div className="navbar">
        <div className="navbarContainer">
          <div className="navbarLeft">
            <div className="companyLogo">
              <b>DevsTree</b>
            </div>
          </div>
          <div className="navbarRight">
            {token ? (
              <>
                <Link to="/" className="allusers">
                  All Users
                </Link>
                <div className="dropdown">
                  <span>User</span>
                  <div className="dropdown-content">
                    <div>
                      <Link to="/profile" className="btn profilebtn">
                        My Profile
                      </Link>
                    </div>

                    <button className="btn logoutbtn" onClick={logout}>
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
