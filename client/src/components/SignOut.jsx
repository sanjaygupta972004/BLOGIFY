import React from 'react'
import { signOutHandler } from '../api/auth/apiService'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal,Alert } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi";
export default function SignOut() {
  const [openModal, setOpenModal] = React.useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.user) 

    const handleSignOut = async (e) => {
      e.preventDefault()
      await signOutHandler(dispatch, navigate)
      setOpenModal(false)
    }
  React.useEffect(() => {
      setOpenModal(true)
  }, [loading])
  return (
     <div>
      <Modal popup  size= "md" title="Sign Out" show = {openModal} onClose={()=>setOpenModal(false)} >
        <Modal.Header />
        <Modal.Body>
            <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-sans text-gray-500 dark:text-gray-400">
              Are you sure you want to sign-out your account?
            </h3>
            <div className="flex justify-center gap-4 font-mono text-xl">
              <Button color="success" onClick={handleSignOut}>
                {"Yes, sign-out"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
            <div>
              {loading && (
                <Alert color="info" className="mt-4">
                  <span className="font-semibold">Signing out...</span>
                </Alert>
              )}
              {error && (
                <Alert color="danger" className="mt-4">
                  <span className="font-semibold">Error:</span> {error}
                </Alert>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      </div>

  )
}
