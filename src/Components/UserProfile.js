import React, { useState, useEffect } from 'react'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../Pages/firebase'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import userImage from '../Asset/Images/user.png'
import UpdateModal from './UpdateModal'
import '../Components/styles/UserProfile.css'

const UserProfile = () => {
  const navigate = useNavigate()
  const [userDetails, setuserDetails] = useState({})
  const [isOpen, setIsOpen] = React.useState(false)
  const [loader, setLoader] = useState(false)

  const userId = sessionStorage.getItem('userId')

  // fetch authenticated user details
  const fetchUserDetails = async () => {
    setLoader(true)
    const userData = await getDoc(doc(db, 'usersData', userId))
    if (userData.exists()) {
      setuserDetails(userData.data())
    }
    setLoader(false)
  }

  useEffect(() => {
    const token = sessionStorage.getItem('fakeJWT')

    if (token && userId) {
      fetchUserDetails()
    } else {
      toast.warn('Login to access requested data ')
      navigate('/login')
    }
  }, [isOpen])

  const { name, email, phone, dob } = userDetails

  const openModal = (isOpen) => {
    setIsOpen(isOpen)
  }

  // delete account
  const deleteAccount = async (id) => {
    const confirmation = window.confirm(
      'Are you sure want to delete your Account Permament?',
    )
    if (confirmation) {
      const usersRef = await doc(db, 'usersData', id)
      deleteDoc(usersRef)
      toast.success('Account Deleted Successfully')
      sessionStorage.removeItem('fakeJWT')
      setTimeout(() => {
        navigate('/register')
      }, 2000)
    }
  }

  return (
    <>
      {!loader ? (
        <>
          <div className="container">
            <div className="profileSection">
              <div className="profileLeft">
                <img src={userImage} alt="profile" />
                <div className="actionBtn">
                  <button
                    className="btn btn-warning updateDetails"
                    onClick={openModal}
                  >
                    Update Details
                  </button>
                  <button
                    className="btn btn-danger deleteAccount"
                    onClick={() => deleteAccount(userId)}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
              <div className="profileRight">
                <div className="userDetails">
                  <b>FullName :</b>
                  <span>{name}</span>
                </div>
                <div className="userDetails">
                  <b>Email Address :</b>
                  <span>{email}</span>
                </div>
                <div className="userDetails">
                  <b>Phone No. :</b>
                  <span>{phone}</span>
                </div>
                <div className="userDetails">
                  <b>Date of Birth :</b>
                  <span>{dob}</span>
                </div>
              </div>
            </div>
          </div>
          <UpdateModal
            userDetails={userDetails}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        </>
      ) : (
        <p className="loading text-center mt-5">Loading....</p>
      )}
    </>
  )
}

export default UserProfile
