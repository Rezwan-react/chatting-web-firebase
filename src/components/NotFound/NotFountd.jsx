import Lottie from 'lottie-react'
import React from 'react'
import NotFount from '../../../public/animation/notFound.json'
function NotFountd() {
  return (
    <div className='w-[600px] m-auto'>
        <Lottie animationData={NotFount}/>
        <h1 className='text-[60px] font-bold text-red-600 flex justify-center'>Page Not Fountd</h1>
    </div>
  )
}

export default NotFountd