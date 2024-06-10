import React from 'react'
import { deleteCurrentUserHandler } from '../api/auth/apiService'
import {useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Modal, Button } from 'flowbite-react'

export default function DeleteAccount() {
 const dispatch = useDispatch()
  const navigate = useNavigate()
 const { currentUser } = useSelector(state => state.user)
  const userId = currentUser.user?.id
  const [openModal, setOpenModal] = React.useState(false)
 
  const handleDeleteAccount = async() => {
    await deleteCurrentUserHandler(dispatch, navigate, userId)
    setOpenModal(false)
  }

  return (
    <>
    <Button  gradientMonochrome="failure" className='w-30 h-12 text-center text-xl font-normal' onClick={() => setOpenModal(true)}> Delete-Account</Button>
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete your account?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDeleteAccount}>
              {"Yes, delete account"}
            </Button>
            <Button color="gray" onClick={() =>{
              setOpenModal(false)
              navigate("/dashboard")
            }}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  </>
  )
}
