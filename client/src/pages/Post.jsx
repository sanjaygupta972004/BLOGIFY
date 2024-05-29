import React from 'react';
import { TextInput, Button, Select } from "flowbite-react";
import { TextEditerContent } from '../components/TextEditerContent';

export default function Post() {
  const [content, setContent] = React.useState('');

  const handleChangeContent = (newContent) => {
    setContent(newContent);
    console.log(content);
  };

  return (
    <>
      <div className='flex min-h-screen min-w-full flex-col gap-3 h-fit p-4'>
        <h1 className="text-3xl font-bold text-center underline my-3">Create a new post</h1>
        <form className='flex w-full flex-col gap-4'>
          <div className=' flex flex-col sm:flex-row justify-between items-center w-full p-4 sm:pl-8 sm:pr-16'>
            <TextInput
              className='w-full sm:w-1/4 mb-2 sm:mb-0'
              label="Title"
              placeholder="Title"
              id="title"
              required
            />
            <Select className='w-full sm:w-1/4'>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </Select>
          </div>
          <div className='flex flex-col sm:flex-row justify-between items-center w-full py-1 sm:pl-8 sm:pr-16 border border-x-red-300 border-dotted'>
            <TextInput
              className='w-full sm:w-1/4 sm:mb-0'
              label="Image"
              placeholder="Image"
              type='file'
              id="image"
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
          <TextEditerContent
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
