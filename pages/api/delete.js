
import Post from "@/models/post";
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';



export default async function handler(req,res){
    if(req.method=== "DELETE"){
        const s3 = new S3Client({
            region: "ap-south-1",
            credentials: {
                accessKeyId: "AKIAU6GD3YQG42ZJCYXJ",
                secretAccessKey: "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"
            }
        })
        
        try {
            const { id } = req.body
            const deletedPost = await Post.findByIdAndDelete({ _id: id })
            const url = deletedPost.url.split("/").pop()
            const deleteObjectCommand = new DeleteObjectCommand({
                Bucket: "geo-data-next-mongo",
                Key: url,
            })
            await s3.send(deleteObjectCommand)
            return res.status(200).json({
                message: "Deleted",
                deletedPost
            })
        } catch (error) {
            console.log(error)
        }
        

    }
}