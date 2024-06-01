import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createPost = AsyncHandler(async (req, res) => {
      const {title , content, category, postImage} = req.body
      if(!title,!content,!category){
        throw new ApiError(400,"All fields required")
      }  
      const userId = req.user?.id
      const user = await User.findById(userId)  
        if(!user){
          throw new ApiError(404,"User not found")
        }

        const post  = await Post.create({
                title,
                content,
                category,
                postImage,
                author: userId
        })
       if(!post){
        throw new ApiError(500,"Something went wrong while creating post")
       }

       return res 
        .status(201)
        .json(new ApiResponse(201,post,"Post created successfully"))

});



export {
        createPost,
}
