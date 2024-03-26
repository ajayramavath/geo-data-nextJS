import React from 'react'
import axios from 'axios'
import { MdOutlineDeleteOutline } from "react-icons/md";


const Post = (props) => {

  const handleDelete= async (post) => {
    try {
      const res = await axios.delete("/api/delete", {
        data: {
          id: post._id
        }
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    
    <article className='text-gray-500 font-bold h-[80px] flex flex-col items-center justify-center border border-collapse border-gray-500  hover:bg-gray-800 hover:text-white'>
      <h3 className='mt-6 text-xl text-pretty' >{props.data.name}</h3>
      <div className='mt-3 mb-3'>
        <a href="" onClick={() => handleDelete(props.data)} ><MdOutlineDeleteOutline size={20} /></a>
      </div>
   
    </article>
  )
}

export default Post