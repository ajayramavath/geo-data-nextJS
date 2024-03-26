import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true,"Please provide a name."]
    },
    url:{
        type: String,
        required: [true,"Please provide a url."]
    },
    id:{
        type: mongoose.Types.ObjectId,
        required: [true, "Please provide a User."]
    }

})

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;