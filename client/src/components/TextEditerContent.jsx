import React, { useEffect } from 'react'
import {Editor} from "@tinymce/tinymce-react"
import {useSelector} from 'react-redux'

// eslint-disable-next-line react/prop-types
export const TextEditerContent = ({intialValue= "",label,handleChangeContent}) => {     
   const[currentTheme, setCurrentTheme] = React.useState('dark')
   const {theme} = useSelector(state => state.theme)
   const editorRef = React.useRef("")
   
  

   useEffect(() => {
   setCurrentTheme(theme === 'dark' ? 'dark' : 'light')
   }, [theme, setCurrentTheme])
    

   useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const applyTheme = () => {
        const body = editor.getBody();
        if (currentTheme === 'dark') {
          body.style.backgroundColor = '#2e2e2e';
          body.style.color = '#ffffff';
        } else {
          body.style.backgroundColor = '#ffffff';
          body.style.color = '#000000';
        }
      };
      applyTheme();
      editor.on('init', applyTheme);
    }
  }, [currentTheme]);



 return (
         <div className='w-full h-full'>
              <label htmlFor="content" className="block text-xl font-medium">{label}</label>
                  <Editor
                   apiKey= {import.meta.env.VITE_TINYURL_API_KEY}
                   onInit={(evt, editor) => editorRef.current = editor}
                    initialValue= {intialValue}
                    key = {currentTheme}
                    init={{
                      height: 600,
                      min_height: 500,
                      min_width: 500,
                      menubar: true,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                        content_style: currentTheme ==='dark'
                        ? "body { background-color: #2e2e2e; color: #ffffff; font-family:Helvetica,Arial,sans-serif; font-size:16px }"
                        : "body { background-color: #ffffff; color: #000000; font-family:Helvetica,Arial,sans-serif; font-size:17px }",
                    }}
                     onEditorChange={handleChangeContent}
                  />  
         </div>

  );
}
