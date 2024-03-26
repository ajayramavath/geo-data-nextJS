import Navbar from '@/components/Navbar'
import React from 'react'
import NewMap from '@/components/NewMap'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRef , useState } from 'react'
import fileDownload from 'js-file-download'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const CreateMap = () => {
    const {data:session , status} = useSession()
    const [loading,setLoading] = useState()
    const router = useRouter()
    const fgref = useRef();

    if(status==='loading'){
        return <p>Loading...</p>
    }
    if(status === 'unauthenticated'){
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
        return [...array].map((b) => b.toString(26).padStart(2, "0")).join("")
    }

    const uploadFile = async (file) => {
        if (file) {
            const putObjectCommand = new PutObjectCommand({
                Bucket: "geo-data-next-mongo",
                Key: generateFileName() + file.name,
            })
            const signedURL = await getSignedUrl(s3, putObjectCommand, {
                expiresIn: 60,
            })
            await fetch(signedURL, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                }
            })
            return signedURL.split("?")[0]

        }
    }
    
    const  handleExport = () =>{
        var datenow = new Date()
        let datestr = datenow.toLocaleDateString('en-GB');
        let filename = 'export_map_' + datestr + '.geojson'
        let nodata = '{"type":"FeatureCollection","features":[]}';

        let filedata = JSON.stringify(fgref.current.toGeoJSON());

        if (filedata === nodata) {
            alert('Add features to download!');
        } else {
            fileDownload(filedata, filename)
        }
    }

    const handleSave = async () => {
        var name = prompt("Give your map a name")
        if (name === "") {
            alert("Name is required to create your map!")
        }else{
            let nodata = '{"type":"FeatureCollection","features":[]}';
            const data = JSON.stringify(fgref.current.toGeoJSON())
            if (data !== nodata) {
                setLoading(true)
                const jsonFile = new File([data], name + ".json");
                const url = await uploadFile(jsonFile)
                const id = session.user._id
                try {
                    const resposnse = await fetch("http://localhost:3000/api/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name,
                            url,
                            id
                        })
                    })
                    if (resposnse.ok) {
                        setLoading(false)
                        console.log(resposnse)
                        router.push('/profile/' + id)
                    }
                } catch (error) {
                    console.log(error)
                }

            }else{
                alert('Add features to save!');
            }
        }

    }




  return (
    <main>
        <Navbar/>
       <div className='h-[80vh]'>
        <NewMap data={fgref} />
       </div>
       <div className= "flex justify-center items-center gap-36 mt-6">
              <button onClick={handleExport} className='bg-gray-300 text-black p-[5px] px-5 rounded-md hover:bg-[#00df9a]'>Export</button>
              <button onClick={handleSave} className='bg-gray-300 text-black p-[5px] px-5 rounded-md hover:bg-[#00df9a]'>{loading ? "Loading...":"Save"}</button>

       </div>
    </main>
  )
}

export default CreateMap