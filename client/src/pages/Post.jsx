import React from 'react';
import { useState } from 'react';
import { TextInput, Button, Select } from "flowbite-react";
import { TextEditorContent } from '../components/TextEditorContent';

/**
 * React component for creating a new post.
 * Manages state for post title, category, image, and content.
 */
export default function Post() {
  const [content, setContent] = React.useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');


  const handleChangeContent = (newContent) => {
    setContent(newContent);
    console.log(content);
  };

  const data = {
    title: title,
    category: selectCategory,
    content: content,
    image: image
  };
  console.log(data);


  return (
    <>
      <div className='flex min-h-screen min-w-full flex-col gap-3 h-fit p-4'>
        <h1 className="text-3xl font-bold text-center underline my-3">Create a new post</h1>
        <form className='flex w-full flex-col gap-4'>
          <div className='flex flex-col sm:flex-row justify-between items-center w-full p-4 sm:pl-8 sm:pr-16'>
            <TextInput
              className='w-full sm:w-1/4 mb-2 sm:mb-0'
              label="Title"
              placeholder="Title"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Select className='w-full sm:w-1/4'
              label="Category"
              id="category"
              value={selectCategory}
              onChange={(e) => setSelectCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Devops">Devops</option>
              <option value="Design">Design</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Data Science">Data Science</option>
              <option value="Others">Others</option>
            </Select>
          </div>
          <div className='flex flex-col sm:flex-row justify-between items-center w-full py-1 sm:pl-8 sm:pr-16 border border-x-red-300 border-dotted'>
            <TextInput
              className='w-full sm:w-1/4 sm:mb-0'
              label="Image"
              placeholder="Image"
              type='file'
              id="image"
              onChange={(e) => {
                if (e.target.files[0]) {
                  const file = e.target.files[0];
                  setImage(file);
                }
              }}
              required
            />
            <Button
              className='sm:w-1/8 mr-10'
              type='submit'
            >
              Upload Image
            </Button>
          </div>
        </form>
        <div className='w-full p-4'>
          <TextEditorContent
            label="Content"
            initialValue={"start typing here..."}
            handleChangeContent={handleChangeContent}
          />
        </div>
        <Button
          className='w-full sm:w-1/4 mx-auto'
          type="submit"
        >
          Submit
        </Button>
      </div>
    </>
  );
}
