import Navbar from '@/components/Navbar'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from "react"
import { useSession } from 'next-auth/react';
import { data } from 'autoprefixer';
import { useRouter } from 'next/router';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';






const upload = () => {
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [loading,setLoading] = useState(false)
    const router = useRouter()

    
    
    const {data: session, status} = useSession()

    if (status === "loading") {
        return <p>Loading...</p>
    }
    if (status === 'unauthenticated') {
        router.push('/')
    }
    


    const s3 = new S3Client({
        region: "ap-south-1",
        credentials: {
            accessKeyId: "AKIAU6GD3YQG42ZJCYXJ",
            secretAccessKey: "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"
        }
    })
   


    const generateFileName = (bytes = 32) => {
        const array = new Uint8Array(bytes)
        crypto.getRandomValues(array)
        return [...array].map((b) => b.toString(26).padStart(2,"0")).join("")
    }
    

    const handleChange = (event) => {
        setFile(event.target.files[0])

    }
    
    const uploadFile = async()=>{
        if(file){
        const putObjectCommand = new PutObjectCommand({
            Bucket: "geo-data-next-mongo",
            Key: generateFileName()+file.name,
        })
        const signedURL = await getSignedUrl(s3,putObjectCommand,{
            expiresIn: 60,
        })
        await fetch(signedURL,{
            method: "PUT",
            body: file,
            headers:{
                "Content-Type": file.type,
            }
        })
        return signedURL.split("?")[0]
        
    }
    }
    

    const handleSubmit = async (e) => { 
        e.preventDefault()
        setLoading(true)
        const url = await uploadFile()
        const id = session.user._id
        try {
            const resposnse = await fetch("http://localhost:3000/api/create",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({
                    name,
                    url,
                    id
                })
            })
            if(resposnse.ok){
            setLoading(false)
            console.log(resposnse)
            router.push('/profile/'+id)
            }
        } catch (error) {
            console.log(error)
        }
}


    return (
        <div className='bg-gray-900 h-screen'>
            <Navbar />
            <div className=' mt-[100px] bg-gray-900 flex flex-col justify-center items-center'>
                <form onSubmit={handleSubmit}>
                    <div className='w-[500px] h-[500px] bg-gray-400 rounded-3xl flex flex-col items-center'>

                        <h1 className='mt-[40px] text-2xl font-bold'>UPLOAD GEOJSON FILES</h1>
                        <label className='mt-[50px] w-[290px]'>Name</label>
                        <input className='w-[300px] mt-[1px] p-1 text-black rounded-xl outline-none' required value={name} onChange={ev => setName(ev.target.value)} type="text" placeholder='Name' />
                        <label className='mt-[50px] w-[290px]'>File</label>
                        <input className='p-1' type="file" accept=".json" required onChange={handleChange} />
                        <button className='mt-[50px] bg-black text-gray-400 p-[5px] px-5 rounded-md hover:bg-gray-800' type='submit'>{loading? "Loading..": "Upload"}</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default upload