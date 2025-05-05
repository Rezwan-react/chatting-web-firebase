import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { useSelector } from 'react-redux'

function Layout() {

    const sliceUser = useSelector((state)=> state.counter.value)
    const navigate = useNavigate()


  useEffect(()=>{
    if(sliceUser == null){
      navigate('/login')
    }
  }, [])

  return (
    <>
        <div className='flex '>
        <Navbar/>
        <Outlet/>
        </div>
        
    </>
  )
}

export default Layout