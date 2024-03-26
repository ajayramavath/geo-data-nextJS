import mongoose from "mongoose";
import { connect } from "@/database/dbConfig";
import User from "@/models/user.js"

connect()

export default async function handler(req, res) {
    if(req.method ==='GET'){
       
        const { email } = req.query;
        const user = await User.findOne({ email })
        res.status(200).json({ id: user._id});

    }
}