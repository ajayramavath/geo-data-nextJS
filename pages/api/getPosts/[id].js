import mongoose from "mongoose";
import Post from "@/models/post";
import {connect} from "@/database/dbConfig"

connect()

export default async function handler(req,res){
    if(req.method === "GET"){
        const {id} = req.query
        try {
            const posts = await Post.find({id:id});
            res.status(200).json({posts})

        } catch (error) {
            console.log(error)
        }
        
    }
}

