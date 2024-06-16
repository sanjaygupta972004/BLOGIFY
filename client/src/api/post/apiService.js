import axios from 'axios';
import {toast} from 'react-toastify';

 const createPost = async ({formData}) => {
     console.log("formData in api service",formData)
     const {title,description,postImage,category} = formData;
     if(!title || !description  || !category){
         throw new Error("All fields are required to create a Blog Post");
     }
        if(!postImage){
            throw new Error("Please upload an image");
        }
 try {
         const  res =  await axios.post("/api/v1/posts/createPost",formData);
         if(res.data && res.data.statusCode === 201 ){
             toast.success("Post created successfully");
         }else{
            throw new Error(res.data.message || "Failed to create a post");
         }
         return res.data;
 } catch (error) {
        if(error.response){
            throw new Error(error.response.data.message);
        }else if(error.request){
            throw new Error("Network error. Please try again");
        }else{
            throw new Error(`An error occurred: ${error.message}`);
          
 }
}
 }

const getPosts = async (query) => {
try {
        
} catch (axiosError) {
        if(axiosError.response){
                throw new Error(axiosError.response.data.message)
        }else{
                throw new Error("Something wrong while fetching posts ")
        }
}
}

export {
        createPost,
        getPosts,
}