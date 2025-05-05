import React from 'react'
import { NavLink } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { LiaIdCardSolid } from "react-icons/lia";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { MdLogout } from "react-icons/md";


function Navbar() {
  const currentUserData= useSelector((state) => state.counter.value)

  // ==================== logout
  const handelLogout = ()=>{
    localStorage.removeItem('data')
    location.reload()
  }





  return (
    <>
      <nav className='bg-[#435585] '>
        <div className="container ">
          <div className="menu w-[200px] ">
            <ul className=' flex flex-col gap-5 p-6 mt-3  text-xl font-Poppins font-medium text-white '>
            <NavLink to="/" className={({ isActive}) =>  isActive ? "px-5 h-[40px] flex justify-center items-center  bg-[#1A4870] rounded-lg gap-2" : "px-5 h-[40px] flex justify-center items-center hover:bg-[#1A4870] rounded-lg gap-2" } ><CgProfile className='text-lg' />  Profile </NavLink>
            <NavLink to="/FriendAdd" className={({ isActive}) =>  isActive ? " h-[40px] flex justify-center items-center bg-[#1A4870] rounded-lg gap-2" : " h-[40px] flex justify-center items-center hover:bg-[#1A4870] rounded-lg gap-2" } > <LiaIdCardSolid className='text-lg' /> Friend Add </NavLink>
            <NavLink to="/chat" className={({ isActive}) =>  isActive ? "px-5 h-[40px] flex justify-center items-center bg-[#1A4870] rounded-lg gap-2" : "px-5 h-[40px] flex justify-center items-center hover:bg-[#1A4870] rounded-lg gap-2" } > <IoChatboxEllipsesOutline className='text-lg' />chat </NavLink>
            <NavLink to="/friendRequest" className={({ isActive}) =>  isActive ? "px-5 h-[40px] flex justify-center items-center bg-[#1A4870] rounded-lg gap-2" : "px-5 h-[40px] flex justify-center items-center hover:bg-[#1A4870] rounded-lg gap-2" } > <IoChatboxEllipsesOutline className='text-lg' />friendRequest </NavLink>
            <NavLink to="/friendList" className={({ isActive}) =>  isActive ? " h-[40px] flex justify-center items-center bg-[#1A4870] rounded-lg gap-2" : "h-[40px] flex justify-center items-center hover:bg-[#1A4870] rounded-lg gap-2" } > <IoChatboxEllipsesOutline className='text-lg' />Friend list </NavLink>
            <NavLink to="/block" className={({ isActive}) =>  isActive ? " h-[40px] flex justify-center items-center bg-[#1A4870] rounded-lg gap-2" : "h-[40px] flex justify-center items-center hover:bg-[#1A4870] rounded-lg gap-2" } > <IoChatboxEllipsesOutline className='text-lg' />Block </NavLink>
            
            </ul>
          </div>
          </div>
              <div className=" flex flex-col items-center mt-[135px]">
                  <img
                    className="w-[70px] h-[70px] rounded-full border-2 border-[#5C7BE0] shadow-md"
                    src={currentUserData?.photoURL}
                    alt="profile"
                  />
                <h2 className="text-[24px] font-semibold text-white">{currentUserData?.displayName}</h2>
              </div>
              <div className=' flex justify-center items-center mt-4 text-4xl text-black active:scale-95'>
                <button onClick={handelLogout} className=''><MdLogout /> </button>
              </div>
      </nav>
    </>
  )
}

export default Navbar