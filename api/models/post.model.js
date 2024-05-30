import Mongoose ,{Schema} from "mongoose";

const postSchema = new Schema(
        {
                title: {
                        type: String,
                        required: true,
                        trim: true,
                },
                content: {
                        type: String,
                        required: true
                },
                category: {
                        type: String,
                        default: "General"
                },
                postImage: {
                        type: String,
                        default: ""
                },
                user: {
                        type: Schema.Types.ObjectId,
                        ref: "User"
                }        
}
,{
        timestamps: true
})

export const Post = Mongoose.model("Post", postSchema);        