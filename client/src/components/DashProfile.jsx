import React from 'react'
import { Alert } from 'flowbite-react'
import { useState, useRef, useEffect } from 'react'
import { upLoadImageFile } from '../utils/helper'
import UpdateProfile from './UpdateProfile'
import { updateProfileImageAsync } from '../redux/profile/profileSlice'
import { useDispatch, useSelector } from 'react-redux'
import DeleteAccount from './DeleteAccount'


const DashProfile = () => {
  const { currentUser } = useSelector(state => state.user)  
  const [imageFile, setImageFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const { loading, profileImageError } = useSelector(state => state.profile)
  const userId = currentUser.user?.id

  const imageFileRef = useRef()
  const timeRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
    }
    if(timeRef.current) {
      clearTimeout(timeRef.current)
    }
  }

  useEffect( () => {
   if(imageFile) {
     const handleUploadImg = async () => {
       try {
         const imageUrl = await upLoadImageFile(imageFile, setProgress, setError)
         if (imageUrl) {
           timeRef.current = setTimeout(() => {
             dispatch(updateProfileImageAsync({ imageUrl, userId }))
           },1000)
         }
       }
      catch (error) {
       setError("An error occurred during upload and update profile image. Please try again.")
       }
     }
     handleUploadImg()
    }
    return () => {
      if(timeRef.current) {
        clearTimeout(timeRef.current)
      } 
   }
  }, [imageFile,dispatch,userId])


  return (
    <div className='flex justify-center mt-10 w-full rounded-lg mr-7 min-h-fit'>
      <form className='flex flex-col gap-5 w-full ' >
        <h1 className='text-start text-2xl mx-3 px-5 dark:text-white  w-full font-serif opacity-80 sm:text-3xl text-gray-100
         dark:opacity-60 bg-gray-500 rounded-lg'> User-Profile</h1>
        <input
          type="file"
          ref={imageFileRef}
          onChange={handleFileChange}
          hidden
        /> 
       <div className='w-[105px] h-[105px] hover:cursor-pointer shadow-md overflow-hidden rounded-full self-center '>
          <img
            className='w-full h-full object-cover border-5  border-[lightgray] '
            src={currentUser.user?.profileImage} alt="profile-image" 
            onClick={() => {
              imageFileRef.current.click()
            }}/>
        </div>
        <div className='flex flex-col justify-start items-start '>
          <div className='text-xl font-serif sm:text-[28px] p-4   '>
            <h1 className='my-1'> <span className='px-4 md:text-3xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 rounded-lg'>userName:</span>
              {"@"+currentUser.user?.username}
            </h1>
            <h2>
              <span className='px-4  md:text-3xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>userEmail:</span>
              {currentUser.user?.email}
            </h2>
          </div>
        </div>
        <div className='ml-5 flex justify-between gap-3 flex-col md:flex-row  items-center'>
          <div className='mt-2'> 
            <UpdateProfile/>
          </div>
          <div className='mt-2 '>
          <DeleteAccount/>
          </div>
        </div>
           
        <div className='my-4 space-y-3 font-serif text-2xl'> 
            {
              error && <Alert type='error'>{error}</Alert>
            }
            {
              profileImageError && <Alert type='error'>{profileImageError}</Alert>
            }
            {
              loading && <Alert type='info'>Loading...</Alert>
            } 
            {
            progress == 100.00 ? <Alert type='info'>profile-Img Uploaded successfully</Alert> : progress > 0 ? <Alert type='success'>Uploading {progress}</Alert> : null
            }    
          </div>
      </form>
 </div>
  )
}

export default DashProfile