import React from 'react'
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { deletePostAsync } from '../../redux/post/PostSlice';


export default function DeletePost({postId,resetHandler}) {
  const[openModal, setOpenModal] = React.useState(false)
  const dispatch = useDispatch()
  const handleDeletePost = async() => {
    try {
      if(postId){
        await dispatch(deletePostAsync({postId})).unwrap()
        setOpenModal(false)
        resetHandler(true)
      }
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }


  return (
   <>
    <Button  gradientMonochrome="failure" className='w-30 h-12 text-center text-xl font-normal' onClick={() => setOpenModal(true)}> Delete</Button>
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete your POST?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDeletePost}>
              {"Yes, delete account"}
            </Button>
            <Button color="gray" onClick={() =>{
              setOpenModal(false)
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
