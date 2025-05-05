import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, remove, push, set } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { chatUserData } from '../../Slices/ChatUserSlice';

function ChatBar() {
  const sliceUser = useSelector((state)=>state.counter.value)
  const dispatch = useDispatch()
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
// ===================== updat data to slice
    const handelUserData =(data)=>{
      dispatch(chatUserData(data))
      localStorage.setItem('chatUser', JSON.stringify(data))
    }


  return (
    <>
      <div className='w-[300px] border-2 border-[#7E60BF] p-5'>
        <h1 className='text-xl font-bold font-Poppins text-black mb-5'>Friends</h1>
        {
              friends.map((item)=>(
        <div key={item.key} onClick={()=>handelUserData(item)} className="singel_users flex justify-between mb-5 items-center ">
          <div className='flex items-center gap-5'> 
            <div className=" bg-green-100 user_image w-[50px] h-[50px] rounded-full overflow-hidden">
                <img src={item.friendPhoto} alt="user photo" />
              </div>
                <h2 className='text-lg font-semibold'>{item.friendName}</h2>
          </div>                        
          </div>
           ))
          }

      </div>
    </>
  )
}

export default ChatBar