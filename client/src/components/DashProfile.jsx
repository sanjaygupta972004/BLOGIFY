import { Button, TextInput } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react'
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'

import { app } from '../firebase'


const DashProfile = () => {
  const { currentUser } = useSelector(state => state.user)  
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const imageFileRef = useRef()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
    }
  }

 

  const upLoadFile = async (imageFile) => {
    if (!imageFile) return;
    const fileName =  imageFile.name + new Date().getTime()  

    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImageFileUploadProgress(progress.toFixed(0))

      },
      (error) => {
        setImageFileUploadError(`file must be less than 2MB and must be an image file: ${error.message}`)
    }, () => {
         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           setImageUrl(downloadURL)
           console.log('File available at', downloadURL)
    })
      }
    )
  }

  useEffect(() => {
    if (imageFile) {
      upLoadFile(imageFile)
    }
  }, [imageFile])


  return (
    <div className='flex justify-center mt-10 w-full '>
      <form className='flex flex-col gap-3 w-full md:w-1/2' >
        <h1 className='text-center font-serif font-bold  text-2xl underline'> User_Profile</h1>
        <input
          type="file"
          ref={imageFileRef}
          onChange={handleFileChange}
          hidden
        /> 
       <div className='w-[105px] h-[105px] shadow-md overflow-hidden rounded-full self-center '>
          <img
            className='w-full h-full object-cover border-5 border-[lightgray] '
            src={imageUrl || currentUser.user.profileImage} alt="userImg"
            onClick={() => {
              imageFileRef.current.click()
            }}/>
      </div>
        <TextInput
          placeholder='username'
          label="username"
          type="text"
          id="username"
          defaultValue={currentUser.user.username} />
        <TextInput
          placeholder='email'
          label="email"
          type="email" id="email"
          defaultValue={currentUser.user.email} />
        <TextInput
          placeholder='password'
          label="password"
          type="password"
          id="password" />
        <Button label="Update" >
          Update
        </Button>
        <div className='flex justify-between  '>
          <Button label="Delete" >
            Delete
          </Button>
          <Button label="Logout" >
            Logout
          </Button>
        </div>
        
    </form>

 </div>
  )
}

export default DashProfile