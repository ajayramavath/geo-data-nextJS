import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import DynamicMap from '../DynamicMap'
import Post from '../Post'
import Link from 'next/link'

const user = () => {
    const [posts , setPosts]=useState([])
    const [data , setData] = useState([])
    const {status} = useSession()
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        if(!router.isReady) return
        const getPosts = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/getPosts/" + id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const data = await res.json();
                setPosts(data.posts)

            } catch (error) {
                console.log(error)
            }

        }
        getPosts()
    }, [router.isReady]);

    if(status === 'loading'){
        return (
            <div className='flex justify-center items-center'>
                <p>Loading...</p>
            </div>
        )
    }
    if(status === 'unauthenticated'){
        router.push('/')
    }

    const handleClick= async (post)=> {
        const url = post.url
        fetch(url).then(res => res.json()).then(resData => {
            setData(resData);
        })
    }

    

return (
    <main>
    <Navbar/>
    <div className='flex mt-[10px]' >
        <div className='w-3/4'>
            <DynamicMap data={data} />
        </div>
          <div className='w-1/4 h-[100vh] flex flex-col overflow-auto'>
            <div>
              <p className= "border-b font-bold h-[50px] flex justify-center items-center bg-gray-900">My Maps</p>
              <Link href={'/upload'} className="flex justify-center items-center h-[50px] border-b bg-gray-600 rounded-lg m-5 hover:bg-[#00df9a]" >Add New</Link>
                </div>
                <ul>
                        {posts && posts.map(post=>
                            <div className='text-black'>
                                <li onClick={()=>handleClick(post)}><Post data={post} /> </li>
                            </div>
                        )}
                </ul>
          </div>
          
        
    </div>
    </main>
  )
}

export default user