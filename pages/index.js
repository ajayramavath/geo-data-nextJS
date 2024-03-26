import React, { useEffect } from 'react'
import { useRef } from "react";
import {useSession , signIn , signOut} from 'next-auth/react'
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Lottie from 'lottie-react'
import animationData from "@/components/Animation.json"




export default function Home() {

  const session = useSession()
  const earthRef = useRef()
  const id = session?.data?.user?._id
 

  if(!session.data){
    return (

      <div className="w-screen h-screen bg-gray-900 flex flex-col justify-center items-center">
        <div>
          <h1 className="mb-[80px] text-2xl text-gray-300 font-bold p-[10px] rounded-lg">GEO_DATA</h1>
        </div>
        <div>
          <button className="bg-gray-400 hover:bg-[#00df9a] rounded-md mb-[80px] p-[5px] text-black" onClick={()=>signIn('google',{callbackUrl: '/'})}>Sign in with Google</button>
        </div>
      </div>
    );
  }

  return(
    <div className="w-screen h-screen bg-gray-900 ">
      <Navbar/>

      <div className="mt-[100px]">
        <Lottie lottieRef={earthRef} style={{ height: 300 }} animationData={animationData} />
      </div>
      
      <div className="flex justify-center gap-10 mt-[50px]">

        <Link href={"/CreateMap"} className='bg-gray-400 text-black p-[5px] px-5 rounded-md hover:bg-[#00df9a]'>
          Create Map
        </Link>

        <Link href={"/upload"} className="bg-gray-400 text-black p-[5px] px-5 rounded-md hover:bg-[#00df9a]">
          Upload Map
        </Link>
        <Link href={"/profile/"+id} className="bg-gray-400 text-black mr-[30px] p-[5px] rounded-md px-5 hover:bg-[#00df9a]" >My Maps</Link>
      </div>
    </div>
  )

  
}
