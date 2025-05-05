import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
function Block() {
// ======================= redux data 
const sliceUser = useSelector((state)=>state.counter.value)

// =========================== custom hooks
const [blockFriend, setBlockFriend] = useState([])


// ============================= firebase  part starts
const db = getDatabase();
// ========================== fucntions part starts 


// =========================== unblock fucntions part starts 
const handelUnblock = (data)=>{
    set(push(ref(db, 'friends/' )), {
        currentUserId: sliceUser.uid,
        currentUserName: sliceUser.displayName,
        currentUserPhoto: sliceUser.photoURL,
        friendId: data.friendID,
        friendName: data.friendName,
        friendPhoto: data.friendPhoto ,        
      });
      remove(ref(db, 'blockList/' + data.key))
}


// ========================= Realtime Database
    useEffect(()=>{
        const starCountRef = ref(db, 'blockList/' );
        onValue(starCountRef, (snapshot) => {
            let arr = []

            snapshot.forEach((item)=>{
                if(item.val().currentUserID == sliceUser.uid){
                    arr.push({...item.val(), key: item.key})
                }
            })
            setBlockFriend(arr)
          });
    }, [])



  return (
    <>
           <div className="container">
        <div className='mt-4 ml-5 flex flex-col gap-4'>
         
            {
                blockFriend.map((item)=>(

          <div key={item.key}  className="card w-[400px]  rounded-lg bg-[#4d244d] shadow-lg p-4 flex justify-center gap-3 ">
            
            <div className="img w-[70px] h-[70px] bg-gray-300 rounded-full mb-4">
              <img src={item.friendPhoto} alt="img" />
            </div>
              <div className=' px-4 py-2 flex items-center'>
                <p className="job text-xl font-Poppins font-medium text-gray-500">{item.friendName}</p></div>
            
              <div className='flex gap-5'>
               <button onClick={()=>handelUnblock(item)}
              className="mt-4 mb-4 px-2 py-1 bg-blue-500 text-white font-medium font-Poppins text-sm rounded-xl hover:bg-blue-600 transition duration-200">
               UnBlock
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

export default Block