import { Alert, Button, TextInput } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react'
import { upLoadImageFile } from '../utils/helper'


const DashProfile = () => {
  const { currentUser } = useSelector(state => state.user)  
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)

  const imageFileRef = useRef()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
    }
  }


  useEffect( () => {
   if(imageFile) {
     const handleUploadImg = async () => {
       try {
          await upLoadImageFile(imageFile, setProgress, setError, setImageUrl)
        }
      catch (error) {
       setError("An error occurred during image upload")
       }
     }
     handleUploadImg()
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
            src={currentUser.user?.profileImage} alt="profile-image" 
            onClick={() => {
              imageFileRef.current.click()
            }}/>
      </div>
        <TextInput
          placeholder='username'
          label="username"
          type="text"
          id="username"
          defaultValue={currentUser.user?.username} />
        <TextInput
          placeholder='email'
          label="email"
          type="email" id="email"
          defaultValue={currentUser.user?.email} />
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
      <div className='my-4 space-y-3'>
       <div>
            {
              error && <Alert type='error'>{error}</Alert>  
           }
        </div>
        <div>
          {
            progress > 0 && <Alert type='info'>Uploading {progress}%</Alert>
          }
          </div>
        </div>
          
      </form>
 </div>
  )
}

export default DashProfile