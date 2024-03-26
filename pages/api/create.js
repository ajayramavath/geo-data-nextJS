import {connect} from "@/database/dbConfig";
import Post from "@/models/post";

connect()


export default async function handler(req,res){
    if(req.method === 'POST'){
        try {
           const {name ,url,id} = req.body;
           const newPost = Post({
            name:name,
            url:url,
            id:id
           })
           const savedPost = await newPost.save()
            return res.json({ message: "Post Created" }, savedPost)

        } catch (error) {
            console.log(error)
        }
    }
}