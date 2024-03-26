import mongoose, { connection } from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log('MongoDB connected succesfully')
        })

        connection.on('error',(err)=>{
            console.log(err);
            process.exit()
        })

    } catch (error) {
        console.log('something went wrong');
        console.log(error);
        
    }
}