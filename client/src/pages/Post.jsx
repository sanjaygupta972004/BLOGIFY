import React, { useState, useEffect } from 'react';
import { Button, Spinner, Alert } from "flowbite-react";
import { TextEditorContent } from '../components/post/TextEditorContent';
import { UploadImgOnFirebase } from '../components/post/UploadImgOnFirebase';
import { TitleCategoryDescription } from '../components/post/TitleCategoryDescription';
import { HiInformationCircle } from 'react-icons/hi';
import { createPostAsync } from '../redux/post/PostSlice';
import { useSelector,useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function Post() {
  const [content, setContent] = useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [openEditor, setOpenEditor] = useState(false);
  const [inputKey, setInputKey] = useState(new Date());

  const dispatch = useDispatch()
  const navigate = useNavigate()
   
  const {isLoading,error,isSuccess,posts} = useSelector((state) => state.post)
  console.log("isLoading",isLoading)
  console.log("error",error)
 
  const handleChangeContent = (newContent) => {
     if(newContent){
      setContent(newContent)
     }
  };
    

 const handleSubmit =  (e) => {
    e.preventDefault();
    const formData = {
      title: title,
      description: description,
      content: content,
      category: selectCategory,
      postImage: imageUrl,
    }
    if(formData){
      dispatch(createPostAsync({formData}))
    }

  }

  useEffect(() => {
    if (isSuccess) {
      setInputKey(new Date());
      navigate("/dashboard")
      setOpenEditor(false);
    }
  }, [isSuccess, error]);

  return (
    <>
      <div className='flex min-h-screen min-w-full flex-col gap-3 h-fit p-4 mt-5'>
        <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl text-center underline dark:text-white">
          Create a <span className='text-red-600 '>New</span> post
        </h1>
        <form className='flex w-full flex-col gap-4' onSubmit={handleSubmit}
        >
          <TitleCategoryDescription
            setTitle={setTitle}
            setSelectCategory={setSelectCategory}
            setDescription={setDescription}
            inputKey={inputKey}
          />
          <UploadImgOnFirebase setImageUrl={setImageUrl} />
          <div className='w-full py-3'>
            {!openEditor && (
              <Button
                gradientDuoTone="purpleToBlue"
                className='w-full sm:w-1/4 mx-auto font-normal text-3xl'
                type="button"
                onClick={() => setOpenEditor(!openEditor)}
              >
                {openEditor ? 'Close Editor' : 'Open Editor to write content'}
              </Button>
            )}
            {openEditor && (
              <TextEditorContent
                content={content}
                setContent={setContent}
                handleChangeContent={handleChangeContent}
              />
            )}
          </div>
          <Button
            className='w-full sm:w-[20%] mx-auto font-normal text-3xl'
            type="submit"
          >
            {isLoading ? <Spinner size="md" color={"white"} /> : 'Submit'}
          </Button>
         <div className=' w-full mx-auto px-3 py-2 font-normal text-xl sm:text-2xl'>
           {error&& <Alert  color="failure" icon={HiInformationCircle} size="md">{error}</Alert>}
         </div>
        </form>
      </div>
    </>
  );
}
