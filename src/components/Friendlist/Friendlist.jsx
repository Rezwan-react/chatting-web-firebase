import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, remove, push, set } from "firebase/database";
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';


function Friendlist() {
  const sliceUser = useSelector((state)=>state.counter.value)
// =========================== custom hooks
  const [friends , setFriends] = useState([])

// =========================== custom hooks
  const db = getDatabase();

// =============================== friends part starts
  useEffect(()=>{
    const starCountRef = ref(db, 'friends/');
      onValue(starCountRef, (snapshot) => {
        let arr = []
        snapshot.forEach((item)=>{
          if(item.val().currentUserId == sliceUser.uid ){
            arr.push({friendId: item.val().friendId, friendName: item.val().friendName, friendPhoto: item.val().friendPhoto , key: item.key })
          }else if(item.val().friendId == sliceUser.uid){
            arr.push({friendId: item.val().currentUserId, friendName: item.val().currentUserName, friendPhoto: item.val().currentUserPhoto , key: item.key    })

          }
          // arr.push({...item.val(), key: item.key})
          
          
        })
        setFriends(arr)
    });
  }, [])

  // ================================ block friends part starts
  const handelBlock = (friendBolck)=>{    
    set(push(ref(db, 'blockList/')), {
      currentUserID: sliceUser.uid,
      currentUsername: sliceUser.displayName,
      currentUserphoto: sliceUser.photoURL,
      friendID: friendBolck.friendId,
      friendName: friendBolck.friendName,
      friendPhoto: friendBolck.friendPhoto
      
    });
    remove(ref(db, 'friends/' + friendBolck.key))
  }

  return (
    <>
       <div className="container">
        <div className='mt-4 ml-5 flex flex-col gap-4'>
         
            {
              friends.map((item)=>(

          <div key={item.key}  className="card w-[400px]  rounded-lg bg-[#4d244d] shadow-lg p-4 flex justify-center gap-3 ">
            
            <div className="img w-[70px] h-[70px] bg-gray-300 rounded-full mb-4">
              <img src={item.friendPhoto} alt="img" />
            </div>
              <div className=' px-4 py-2 flex items-center'>
                <p className="job text-xl font-Poppins font-medium text-gray-500">{item.friendName}</p></div>
            
              <div className='flex gap-5'>
               <button onClick={()=>handelBlock(item)}
              className="mt-4 mb-4 px-2 py-1 bg-blue-500 text-white font-medium font-Poppins text-sm rounded-xl hover:bg-blue-600 transition duration-200">
               Block
            </button>
               <button 
              className="mt-4 mb-4 px-2 py-1 bg-blue-500 text-white font-medium font-Poppins text-sm rounded-xl hover:bg-blue-600 transition duration-200">
               Unfriend
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

export default Friendlist