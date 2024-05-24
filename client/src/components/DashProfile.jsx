import React from 'react'
import { Alert } from 'flowbite-react'
import { useState, useRef, useEffect } from 'react'
import { upLoadImageFile } from '../utils/helper'
import UpdateProfile from './UpdateProfile'
import { updateProfileImageAsync } from '../redux/profile/profileSlice'
import { useDispatch, useSelector } from 'react-redux'


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
    <div className='flex justify-center mt-10 w-full rounded-lg'>
      <form className='flex flex-col gap-3 w-full md:w-1/2' >
        <h1 className='text-center font-serif font-bold  text-2xl underline'> User_Profile</h1>
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
          <div className='text-xl font-serif sm:text-2xl p-4   '>
            <h1 >
              {"@"+currentUser.user?.username}
            </h1>
            <h2>
              {currentUser.user?.email}
            </h2>
          </div>
        </div>
        <div>
            <UpdateProfile/>
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