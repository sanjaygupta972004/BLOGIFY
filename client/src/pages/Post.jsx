import React, { useState, useEffect } from 'react';
import { Button, Spinner, Alert } from "flowbite-react";
import { TextEditorContent } from '../components/post/TextEditorContent';
import { UploadImgOnFirebase } from '../components/post/UploadImgOnFirebase';
import { TitleCategoryDescription } from '../components/post/TitleCategoryDescription';
import { useCreatePostMutation } from '../api/post/ApiSlice';
import { toast } from 'react-toastify';
import { HiInformationCircle } from 'react-icons/hi';


export default function Post() {
  const [content, setContent] = useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [openEditor, setOpenEditor] = useState(false);
  const [clientError,setClienterror] = useState('');
  const [inputKey, setInputKey] = useState(1);


  const handleChangeContent = (newContent) => {
    setContent(newContent);
  };
   
  const [createPost, { isSuccess, isLoading, isError, error }] = useCreatePostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClienterror('');
    if (!title || !description || !content  || !selectCategory || title === '' || description === '' || content === '') {
      setClienterror('All fields are required to create a Blog Post');
      return;
    }
    if(!imageUrl){
      setClienterror('Please upload an image');
      return;
    }
    const formData = {
      title: title,
      description: description,
      content: content,
      category: selectCategory,
      postImage: imageUrl,

    }
    try {
       await createPost(formData).unwrap();
    } catch (error) {
      console.error('Failed to create post:', error.message);
      setClienterror('Failed to create post');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setInputKey(2);
      setOpenEditor(false);

      toast.success('Post created successfully');
    }

    if (isError) {
      setClienterror(error||'Failed to create post');
    }
  }, [isSuccess, isError, error]);

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
           {clientError && <Alert  color="failure" icon={HiInformationCircle} size="md">{clientError}</Alert>}
         </div>
        </form>
      </div>
    </>
  );
}
