import React, { useCallback, useEffect, useState } from 'react'
import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { authenticatedUser } from '../Redux/Actions'
import 'react-toastify/dist/ReactToastify.css'
import './PageStyles/UserManagement.css'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [allUsers, setAllUsers] = useState([])

  const fakeJWT = {
    alg:
      'CfDJ8OW5OI0CPGJBgSNlGwO0x4YF7qbYKVv7KOO-N0eFtDUzXOrL7F9Xd9W1otVi4ueJOkAmAhuoHFWNkqRaFD7zvAMHMSKncl6Vo5QXKmpvy6vqxOKxSURdIey8aZPRi3Nnhp2p9la-Al5xrVKz0lignRdcCHf3O7pF9zv_sNx_c_T7pUe3WsxaJEPX3t_9FO2Wjw',
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  useEffect(() => {
    loadUser()
  }, [])
  // Load all users from firebase
  const loadUser = useCallback(async () => {
    const usersRef = await collection(db, 'usersData')
    getDocs(usersRef).then((data) => {
      let users = []
      data.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id })
      })
      setAllUsers(users)
    })
  }, [])

  const loginUser = (userData) => {
    const checkUser = allUsers.find((user) => {
      return (
        user.email === userData.data.email &&
        user.password === userData.data.password
      )
    })
    if (checkUser) {
      // dispatch(authenticatedUser(checkUser))
      sessionStorage.setItem('fakeJWT', fakeJWT.alg)
      sessionStorage.setItem('userId', checkUser.id)
      toast.success('Authentication Successful')
      setTimeout(() => {
        navigate('/')
      }, 3000)
    } else {
      toast.error('Email or Password is invalid')
    }
  }

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="userForm">
            <form onSubmit={handleSubmit(loginUser)}>
              <h1 className="formTitle">Login</h1>

              <input
                type="text"
                name="email"
                placeholder="Email id"
                {...register('data.email', {
                  required: 'email is required',
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                    message: 'Please Enter Valid Email',
                  },
                })}
              />
              <div>
                {errors.data && errors.data.email && (
                  <span className="inputError">
                    {errors.data.email.message}
                  </span>
                )}
              </div>

              <input
                type="password"
                name="password"
                placeholder="Password"
                {...register('data.password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/,
                    message: 'Password should match policy',
                  },
                })}
              />
              <div>
                {errors.data && errors.data.password && (
                  <span className="inputError">
                    {errors.data.password.message}
                  </span>
                )}
              </div>

              <button className="btn btn-success">Login</button>
            </form>
            <p>
              Don't have an Account?
              <Link to="/register">Register Here!!!</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login
