import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true, "Please provide a email"],
    },
    email: {
        type:String,
        required : [true, "Please provide email"],
        unique: true,
    }

})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;