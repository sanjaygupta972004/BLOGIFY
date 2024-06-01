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
                        default: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
                },
                author: {
                        type: Schema.Types.ObjectId,
                        ref: "User"
                }        
}
,{
        timestamps: true
})

export const Post = Mongoose.model("Post", postSchema);        