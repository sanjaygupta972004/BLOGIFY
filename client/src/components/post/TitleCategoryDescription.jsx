import React, { useState, useEffect } from 'react';
import { TextInput,Select} from "flowbite-react";
export function TitleCategoryDescription({ setTitle, setSelectCategory, setDescription, inputKey }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleTitleChange = (e) => {
    if (isMounted) {
      setTitle(e.target.value);
    }
  };

  const handleCategoryChange = (e) => {
    if (isMounted) {
      setSelectCategory(e.target.value);
    }
  };

  const handleDescriptionChange = (e) => {
    if (isMounted) {
      setDescription(e.target.value);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col sm:flex-row justify-between items-center w-full space-y-2 sm:pl-8 sm:pr-16'>
        <TextInput
          key={inputKey}
          className='w-full sm:w-1/3 mb-2 sm:mb-0'
          label='Title'
          placeholder='Title'
          id='title'
          onChange={handleTitleChange}
          required
        />
        <Select
          className='w-1/2 sm:w-1/4'
          label='Category'
          id='category'
          onChange={handleCategoryChange}
        >
          <option value=''>Select Category</option>
          <option value='Frontend'>Frontend</option>
          <option value='Backend'>Backend</option>
          <option value='Devops'>Devops</option>
          <option value='Design'>Design</option>
          <option value='Machine Learning'>Machine Learning</option>
          <option value='Data Science'>Data Science</option>
          <option value='Others'>Others</option>
        </Select>
      </div>
      <div>
        <TextInput
          key={inputKey}
          className='w-full sm:w-1/2 m-2 sm:mb-2 sm:pl-6 sm:pr-18'
          label='Description'
          placeholder='Description'
          id='description'
          onChange={handleDescriptionChange}
          required
        />
      </div>
    </div>
  );
}