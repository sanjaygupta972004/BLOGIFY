import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { getOneMonthRange } from "../utils/getOneMonthRange.js";
import { isValidObjectId } from "mongoose";

const createPost = AsyncHandler(async (req, res) => {
      const {title , content, category, postImage,description} = req.body
      if(!title,!content,!category, !description){
        throw new ApiError(400,"All fields are required")
      }  
      const userId = req.user?.id
      const user = await User.findById(userId)  
        if(!user){
          throw new ApiError(404,"This user does not exist in our database")
        }

        const post  = await Post.create({
                title,
                content,
                category,
                postImage,
                description,
                author: userId
        })
       if(!post){
        throw new ApiError(500,"Something went wrong while creating post")
       }

       return res 
        .status(201)
        .json(new ApiResponse(201,post,"Post created successfully"))

});


const getPosts = AsyncHandler(async (req, res) => {
  const startIndex = req.query.startIndex ? parseInt(req.query.startIndex) : 0
  const limit =  req.query.limit ? parseInt(req.query.limit) : 9
  const directionPost = req.query.directionPost ? req.query.directionPost : {updateAt: 1}
  let query = {}
  if(req.query.postId) query._id = req.query.postId
  if(req.query.authorId) query.author = req.query.authorId
  if(req.query.slug) query.category = req.query.slug
  if(req.query.searchTerm) query.$or = [
  {title: { $regex: req.query.searchTerm, $options: 'i'}},
  {content: { $regex: req.query.searchTerm, $options: 'i'}},
  {description: { $regex: req.query.searchTerm, $options: 'i'}}

]
  let posts = await Post.find(query).populate("author", "username email profileImage").sort(directionPost).skip(startIndex).limit(limit)

 if(posts.length === 0){
   throw new ApiError(404,"Any post is not available")
 }

  const totalPosts = await Post.countDocuments()
  const totalPostsAccordingToQuery =  posts.length


 const { start, end } = getOneMonthRange(new Date())

 const lastMonthPosts = await Post.find({
    createdAt: {
      $gte: start,
      $lt: end
    }
 })

  const lastMonthTotalPost = lastMonthPosts.length

  return res
    .status(200)
    .json(new ApiResponse(200,{posts,totalPosts,lastMonthTotalPost,totalPostsAccordingToQuery},"Posts fetched successfully"))  

})

const getPost = AsyncHandler(async (req, res) => {
const {postId} = req.params
if(!isValidObjectId(postId)){
  throw new ApiError(400,"postId is not valid")
}
const post = await Post.findById(postId).populate("author", "username email profileImage")
if(!post){
  throw new ApiError(404,"Post is not available in our database with this id")
}
return res
  .status(200)
  .json(new ApiResponse(200,post,"Post fetched successfully"))

})

const updatePost = AsyncHandler(async (req, res) => {
  const {postId} = req.params
  const {title, description,category } = req.body
  if(!title,!description,!category){
    throw new ApiError(400,"title, description and category are required")
  }
  if(!isValidObjectId(postId)){
    throw new ApiError(400,"postId is not valid")
  }
  const authorId = req.user?.id

  const post = await Post.findById(postId)
  if(!post){
    throw new ApiError(404,"Post is not available in our database with this id")
  }
  if(authorId.toString() !== post.author.toString()){
    throw new ApiError(403,"You are not authorized to update this post")
  }
  const updatedPost = await Post.findByIdAndUpdate(postId,{
    title,
    description,
    category
  },
  {new: true})
  if(!updatedPost){
    throw new ApiError(500,"Something went wrong while updating post")
  }
  return res 
    .status(200)
    .json(new ApiResponse(200,updatedPost,"Post updated successfully"))
 })
 

const deletePost = AsyncHandler(async (req, res) => {
  const {postId} = req.params
  if(!isValidObjectId(postId)){
    throw new ApiError(400,"postId is not valid")
  }
  const authorId = req.user?.id
  const post = await Post.findById(postId)
  if(authorId.toString() !== post.author.toString()){
    throw new ApiError(403,"You are not authorized to delete this post")
  }
  const deletedPost = await Post.findByIdAndDelete(postId)
  if(!deletedPost){
    throw new ApiError(500,"Something went wrong while deleting post")
  }
  return res 
    .status(200)
    .json(new ApiResponse(200,{},"Post deleted successfully"))
 })


export {
        createPost,
        getPosts,
        getPost,
        updatePost,
        deletePost
}

