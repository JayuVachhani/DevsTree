import React, { useState } from 'react'
import { db } from './firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './PageStyles/UserManagement.css'
import { Link } from 'react-router-dom'

const Register = () => {
  // connection with Firebase
  const usersRef = collection(db, 'usersData')
  const navigate = useNavigate()
  const [isValidated, setIsValidated] = useState(false)

  // form controller
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm({})

  // create user
  const createUser = async (userData) => {
    try {
      const setUser = await addDoc(usersRef, {
        name: userData.data.fullname,
        email: userData.data.email,
        phone: userData.data.phone,
        dob: userData.data.dob,
        password: userData.data.password,
      })
      if (setUser) {
        setIsValidated(true)

        toast.success('User Created Successfully')
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="userForm">
            <form onSubmit={handleSubmit(createUser)}>
              <h1 className="formTitle">Register</h1>

              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                {...register('data.fullname', {
                  required: 'Full Name is required',
                  minLength: {
                    value: 4,
                    message: 'Name should be min 4 chars',
                  },
                })}
              />
              {/* show errors if any */}
              <div>
                {errors.data && errors.data.fullname && (
                  <span className="inputError">
                    {errors.data.fullname.message}
                  </span>
                )}
              </div>

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
                type="tel"
                name="phone"
                value={getValues('data.phone')}
                placeholder="Phone Number"
                {...register('data.phone', {
                  required: 'Phone Number is required',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Mobile No. should be in 10 digits',
                  },
                })}
              />
              <div>
                {errors.data && errors.data.phone && (
                  <span className="inputError">
                    {errors.data.phone.message}
                  </span>
                )}
              </div>

              <input
                type="password"
                name="password"
                value={getValues('data.password')}
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

              <input
                type="password"
                name="confirmpassword"
                value={getValues('data.confirmpassword')}
                placeholder="Confirm Password"
                {...register('data.confirmpassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === watch('data.password') ||
                    "Passwords don't match.",
                })}
              />
              <div>
                {errors.data && errors.data.confirmpassword && (
                  <span className="inputError">
                    {errors.data.confirmpassword.message}
                  </span>
                )}
              </div>

              <input
                type="date"
                name="dob"
                value={getValues('data.date')}
                placeholder="Date of Birth"
                {...register('data.dob', {
                  required: 'Please select your Date of Birth',
                })}
              />

              <div>
                {errors.data && errors.data.dob && (
                  <span className="inputError">{errors.data.dob.message}</span>
                )}
              </div>

              <div className="controlbtn">
                <button className="btn btn-secondary cancelButton">
                  Cancel
                </button>
                {/* if form is validated then it will disable the button and change the text */}

                <button disabled={isValidated} className="btn btn-success">
                  {isValidated ? 'Saving....' : 'Register'}
                </button>
              </div>
            </form>
            <p>
              Already have an Account? <Link to="/login">Login Here!!!</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Register
