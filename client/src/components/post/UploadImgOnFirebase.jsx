
import React, { useEffect } from 'react'
import { FileInput,Spinner,Button } from 'flowbite-react';
import { upLoadImageFile } from '../../utils/helper';
import { useState } from 'react';
import {toast} from 'react-toastify'

export function UploadImgOnFirebase({setImageUrl}) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(null);
  const[inputKey,setInputKey] = useState(new Date())

  useEffect(() => {
    if(error){
      toast.error(error)
    }
  }, [error])

  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image");
      return;
    }
   const imageUrl = await upLoadImageFile(image, setProgress, setError);
   if(imageUrl){
     setImageUrl(imageUrl)
     setTimeout(() => {
      toast.success("Image uploaded successfully")
      setProgress(null)
      setImage(null)
      setError("")
      setInputKey(new Date())
     },500)
   }else{
     setError("An error occurred during uploading image")
   }
  };

  return (
    <div className='flex flex-col gap-y-2 sm:flex-row sm:justify-between w-[96%] ml-6 border-2 rounded-lg py-[6px] border-indigo-500 border-dotted' >
    <div className='w-full sm:pl-8 sm:w-1/3 px-2 '>
      <FileInput
        key={inputKey}
        accept='image/*'
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
    </div>
    <Button
      className='w-[75%] sm:w-[20%] mx-auto sm:mr-16 text-2xl font-sans'
      type='submit'
      onClick={handleUploadImage}
    >
     { progress ?(<Spinner aria-label="Default status example" />): "Upload Image"}
    </Button>
  </div>
  )
}
