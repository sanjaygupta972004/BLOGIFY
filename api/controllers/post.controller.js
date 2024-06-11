import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { getOneMonthRange } from "../utils/getOneMonthRange.js";

const createPost = AsyncHandler(async (req, res) => {
      const {title , content, category, postImage,description} = req.body
      console.log(req.body)
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

  let posts = await Post.find(query).populate("author", "username email").sort(directionPost).skip(startIndex).limit(limit)

 
 if(posts.length === 0){
   throw new ApiError(404,"Any post is not available")
 }

 const totalPosts = await Post.countDocuments()

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
    .json(new ApiResponse(200,{posts,totalPosts,lastMonthTotalPost},"Posts fetched successfully"))  

})

export {
        createPost,
        getPosts,
}

