import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className="flex items-center gap-4">
       <h1 className="flex items-center gap-4">
       <AiOutlineLoading3Quarters className='animate-spin'/>
        <span>Loading</span>
       </h1>
        </div>
    </div>
  )
}

export default Loading