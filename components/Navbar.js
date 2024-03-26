import React from 'react'
import {signOut} from 'next-auth/react'
import Link from 'next/link'
import { FaPowerOff } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";

const Navbar = () => {
    
    return (
        <div className='flex w-full justify-between mb-[20px] pt-10 align-middle'>
            <div className='ml-[100px] flex'>
                <Link href={"/"} className='text-[#00df9a] font-bold' >GEO_DATA</Link>
                <div className='text-[#00df9a] ml-2 mt-[1px]'><FaMapMarkedAlt size={20} /></div>
            </div>
            <div className='mr-[70px]' >
                <button className="bg-gray-400 text-black rounded-md p-[5px] hover:bg-[#00df9a] " onClick={signOut}><FaPowerOff size={20} /></button>
            </div>

        </div>
    )
}

export default Navbar