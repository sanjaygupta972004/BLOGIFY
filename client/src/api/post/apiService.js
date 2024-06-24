import axios from 'axios';
import {toast} from 'react-toastify';

 const createPost = async ({formData}) => {
     const {title,description,postImage,category} = formData;
     if(!title || !description  || !category){
         throw new Error("All fields are required to create a Blog Post");
     }
        if(!postImage){
            throw new Error("Please upload an attachment image to create a post");
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

const getAuthorPosts = async ({authorId,startIndex,limit}) => {
    if(!authorId){
        throw new Error("Author Id is required to get author posts");
    }
    const queryParams = new URLSearchParams({
        authorId,
        startIndex,
        limit
    });
try {
        const res = await axios.get(`/api/v1/posts/getPosts/?${queryParams}`);
        if(res.data && res.data.statusCode === 200){
            return res.data;
        }else{
            throw new Error(res.data.message || "Failed to authorPosts");
        
        }

} catch (error) {
        if(error.response){
                throw new Error(error.response.data.message)
        }else{
                throw new Error("Something wrong while fetching posts ")
        }
}
}

const deletePost = async ({postId}) => {
    if(!postId){
        throw new Error("Post Id is required to delete a post");
    }
    try {
        const res = await axios.delete(`/api/v1/posts/deletePost/${postId}`);
        if(res.data && res.data.statusCode === 200){
            toast.success("Post deleted successfully");
            return res.data;
        }else{
            throw new Error(res.data.message || "Failed to delete a post");
        }
    } catch (error) {
        if(error.response){
            throw new Error(error.response.data.message);
        }else{
            throw new Error("Something wrong while deleting a post");
        }
    }

}


const updatePost = async ({postId,formData}) => {

}

export {
        createPost,
        getAuthorPosts,
        deletePost
}