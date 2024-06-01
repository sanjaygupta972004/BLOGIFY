import React from 'react';
import { useState } from 'react';
import { TextInput, Button, Select } from "flowbite-react";
import { TextEditorContent } from '../components/post/TextEditorContent';
import {UploadImgOnFirebase} from '../components/post/UploadImgOnFirebase';
import {TitleCategoryDescription} from '../components/post/TitleCategoryDescription';
/**
 * React component for creating a new post.
 * Manages state for post title, category, image, and content.
 */
export default function Post() {
  const [content, setContent] = React.useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [openEditor, setOpenEditor] = useState(false);


  const handleChangeContent = (newContent) => {
    setContent(newContent);
    console.log(content);
  };


  return (
    <>
      <div className='flex min-h-screen min-w-full flex-col gap-3 h-fit p-4 mt-5'>
        <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl text-center underline dark:text-white">Create a new post</h1>
        <form className='flex w-full flex-col gap-4'>
          <TitleCategoryDescription
            setTitle={setTitle}
            setSelectCategory={setSelectCategory}
            setDescription={setDescription}
          />  
          <UploadImgOnFirebase setImageUrl={setImageUrl}/>
        </form>
        <div className='w-full py-3'>
         {
          !openEditor&&(
            <Button
            gradientDuoTone="purpleToBlue"
            className='w-full sm:w-1/4 mx-auto font-normal text-3xl'
            onClick={() => setOpenEditor(!openEditor)}
          >
            {openEditor ? 'Close Editor' : 'Open Editor to write content'}
          </Button>
          )
         }
          {
            openEditor && (
              <TextEditorContent
                content={content}
                setContent={setContent}
                handleChangeContent={handleChangeContent}
              />
            )
          }
        </div>
    
        <Button
          className='w-full sm:w-[20%] mx-auto font-normal text-3xl'
          type="submit"
        >
          Submit
        </Button>
      </div>
    </>
  );
}
