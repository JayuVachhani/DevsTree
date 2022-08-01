import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../Pages/firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'

const UpdateModal = (props) => {
  const { name, email, phone, dob } = props.userDetails
  const [updatedDetails, setUpdatedDetails] = useState({
    fullname: '',
    email: '',
    phone: '',
    dob: '',
  })
  const userId = sessionStorage.getItem('userId')

  const handleUpdate = (e) => {
    setUpdatedDetails({ ...updatedDetails, [e.target.name]: e.target.value })
  }

  const hideModal = () => {
    props.setIsOpen(false)
  }
  // Update Details
  const updateDetails = async () => {
    const usersRef = await doc(db, 'usersData', userId)
    await updateDoc(usersRef, {
      name: updatedDetails.fullname ? updatedDetails.fullname : name,
      email: updatedDetails.email ? updatedDetails.email : email,
      phone: updatedDetails.phone ? updatedDetails.phone : phone,
      dob: updatedDetails.dob ? updatedDetails.dob : dob,
    })

    toast.success('User Updated Successfully')
    setTimeout(() => {
      props.setIsOpen(false)
    }, 2000)
  }
  return (
    <div>
      <Modal show={props.isOpen} onHide={hideModal} size="md">
        <Modal.Header>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            name="fullname"
            placeholder="username"
            className="w-100"
            onChange={(e) => handleUpdate(e)}
            defaultValue={name}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            className="w-100 mt-3"
            defaultValue={email}
            onChange={(e) => handleUpdate(e)}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone No"
            className="w-100 mt-3"
            defaultValue={phone}
            onChange={(e) => handleUpdate(e)}
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            className="w-100 mt-3"
            defaultValue={dob}
            onChange={(e) => handleUpdate(e)}
          />
          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={hideModal}>
              Cancel
            </button>
            <button className="btn btn-warning" onClick={updateDetails}>
              Update
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default UpdateModal
