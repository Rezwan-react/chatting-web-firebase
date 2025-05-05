import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from 'react-redux';
import UserSlices from '../../Slices/UserSlices';
import { data } from 'autoprefixer';
import { current } from '@reduxjs/toolkit';

function FriendRequest() {
  const [friendRequest, setFriendRequest] = useState([])

  // ============================ firebase variables part starts
  const db = getDatabase();

//  ======================== redex data
  const userSlices = useSelector((state)=> state.counter.value)


  // ============================= firebase database part starts

console.log(userSlices)

  useEffect(()=>{
    const starCountRef = ref(db, 'FriendRequest/' );
      onValue(starCountRef, (snapshot) => {
        let arr = []
        snapshot.forEach((item)=>{
          if(item.val().recevId == userSlices.uid){
            arr.push({...item.val(), key:item.key})
          }
          // arr.push({...item.val(), key:item.key})
        })
          setFriendRequest(arr)
    });
  }, [])

  // ==================== Confirm FriendRequest 
  const handelConfirm =(data)=>{
     
    // set(push(ref(db, 'friend/' )), {
    //   currentUserId: UserSlices.uid,
    //   currentUserName: UserSlices.displayName,
    //   currentUserPhoto: UserSlices.photoURL,
    //   friendId: data.sendId,
    //   friendName: data.sendName,
    //   friendPhoto: data.sendPhoto,
 
    // });
    // remove(ref(db, 'FriendRequest/' + e.key))
    set(push(ref(db, 'friends/' )), {
      currentUserId: userSlices.uid,
      currentUserName: userSlices.displayName,
      currentUserPhoto: userSlices.photoURL,
      friendId: data.sendId,
      friendName: data.sendName,
      friendPhoto: data.sendPhoto,

    });
    remove(ref(db, 'FriendRequest/' + data.key))
    console.log('fjj')
  }




  return (
    <>
      <div className="container">
        <div className='mt-4 ml-5 flex flex-col gap-4'>
          {
            friendRequest.map((item)=>(

          <div key={item.key} className="card w-[400px]  rounded-lg bg-[#4d244d] shadow-lg p-4 flex justify-center ">
            
            <div className="img w-[70px] h-[70px] bg-gray-300 rounded-full mb-4">
              <img src={item.sendPhoto} alt="img" />
            </div>
              <div className=' px-4 py-2 flex items-center'>
                <p className="job text-xl font-Poppins font-medium text-gray-500">{item.sendName}</p></div>
            
              <div className='flex gap-5'>
              <button onClick={()=>handelConfirm(item)}
              className="mt-4 mb-4 px-2 py-1 bg-blue-500 text-white font-medium font-Poppins text-sm rounded-xl hover:bg-blue-600 transition duration-200">
              Confirm
            </button>
            <button className="mt-4 mb-4 px-2 py-1 bg-blue-500 text-white font-medium font-Poppins text-sm rounded-xl hover:bg-red-700 transition duration-200">
              Remove
            </button>
              </div>
          </div>
            ))
          }


        </div>
      </div>
    </>
  )
}

export default FriendRequest