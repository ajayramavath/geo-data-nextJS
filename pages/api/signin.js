import { connect } from "@/database/dbConfig";
import User from "@/models/user.js"
import { NextResponse } from "next/server";

connect()

export default async function handler( req, res){
    
    if(req.method === 'POST'){
        try {

            const { name, email } = req.body;
            const user = await User.findOne({ email })
            if (user) {
                return res.json({message:"User exists"},user)
            }
            const newUser = new User({
                name,
                email
            })
            const savedUser = await newUser.save()
            
            return res.json({message: "User Created"},savedUser)
            
        } catch (error) {
            return res.json({error: error})
        }
    }
}
    

    
