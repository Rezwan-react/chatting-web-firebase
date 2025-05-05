import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push} from "firebase/database";
import { useSelector } from 'react-redux';


function FriendAdd() {
  //  ================ redux data part start
  const sliceUser = useSelector((state)=> state.counter.value)
    
  // ============== variables part start
  const [allUser, setAllUser] = useState([])

  // =========== firebase variables part
  const db = getDatabase();

  // ============= realtime database
  useEffect(()=>{
    const starCountRef = ref(db, 'Cards/');
    let arr = []
      onValue(starCountRef, (snapshot)=> {
      snapshot.forEach((item)=>{
        if(item.val().uid != sliceUser.uid){
          arr.push({...item.val(), key: item.key})
        }

      })
      setAllUser(arr)
    });
  }, [])

// ==================== funcitons frien add part start
const handelAdd = (friendData)=>{
  set(push(ref(db, 'FriendRequest/' )), {
    sendId:      sliceUser.uid ,
    sendName:    sliceUser.displayName ,
    sendPhoto:   sliceUser.photoURL,
    recevId :    friendData.uid,
    recervName:  friendData.userName,
    recevPhoto:  friendData.userPhoto,
  });
}


  return (
    <>
        <div className="container">       
          <div className='p-6 w-[400px] h-[500px] bg-[#48CFCB] ml-4 mt-3 rounded-lg'>
            {
              allUser.map((item)=>(
              <div key={item.key} className="flex items-center p-3 w-80  bg-gray-800 rounded-md shadow-lg ml-4 mt-5 ">
                <section className="flex justify-center items-center w-16 h-16 rounded-full shadow-md bg-gradient-to-r from-[#F9C97C] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] hover:cursor-pointer hover:scale-110 duration-300">
                  <img src={item.userPhoto} alt="profile" />
                </section>
                <section className="block border-l border-gray-300 m-3">
                    <div className="pl-3">
                    
                    <h3 className="bg-clip-text text-transparent text-white text-lg font-bold">{item.userName}</h3>
                    </div>
                    <div className=" pt-2 pl-3 mt-2">
                      <button onClick={()=>handelAdd(item)} className=' flex justify-end text-white font-Poppins font-normal text-lg rounded-lg py-2 px-5 bg-[#704264] hover:bg-[#4E31AA]  '>Add</button>
                      
                      
                    </div>
                </section>
            </div> 

              ))
            }
          </div>
        </div>
    </>
  )
}

export default FriendAdd