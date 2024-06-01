
import React from 'react'
import { FileInput,Label,Button } from 'flowbite-react';
import { upLoadImageFile } from '../../utils/helper';
import { useState } from 'react';
export function UploadImgOnFirebase({setImageUrl}) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(null);
  const handleUploadImage = async (e) => {
    e.preventDefault();
    const imageUrl = await upLoadImageFile(image, setProgress, setError);
  };

  return (
    <div className='flex flex-col gap-y-2 sm:flex-row sm:justify-between w-[96%] ml-6 border-2 rounded-lg py-[6px] border-indigo-500 border-dotted' >
    <div className='w-full sm:pl-8 sm:w-1/3 px-2 '>
      <FileInput
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
      Upload Image
    </Button>
  </div>
  )
}
