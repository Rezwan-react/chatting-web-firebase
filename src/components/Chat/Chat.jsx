import React, { useEffect, useState } from 'react'
import { FaRegPaperPlane } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, push, ref, set } from "firebase/database";
function Chat() {
  // ===================== redux datapart starts
    const userData = useSelector((state)=> state.chatData.chatUserData)
    const sliceUser = useSelector((state)=>state.counter.value)
  // ==================== custom part starts
    const [message, setmessage] = useState('') 
    const [chirkut, setchirkut  ] = useState([])
  // ============================= firebase  part starts
  const db = getDatabase();
  // ========================== fucntions part starts 
    const handelSend = (data)=>{
      set(push(ref(db, 'message/' )), {
        senderId: sliceUser.uid,
        receverId: userData.friendId,
        msg: message,
        msgTime: formatAMPM(new Date)
      });
      setmessage('')
    }

    const handelKey = (e)=>{
      if(e.key == "Enter"){
        handelSend()
      }
    }

  // ========================= Realtime Database part starts
    useEffect(()=>{
      const starCountRef = ref(db, 'message/');
        onValue(starCountRef, (snapshot) => {
          let arr =[]
        snapshot.forEach((item)=>{
          if(item.val().senderId == sliceUser.uid && item.val().receverId == userData.friendId){
            arr.push({...item.val(), key:item.key})
          }else if(item.val().receverId == sliceUser.uid && item.val().senderId == userData.friendId){
            arr.push({...item.val(), key:item.key})
          }
        })
        setchirkut(arr)
      });
    }, [userData])

    // =============== realtime date and time 
    
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

  return (
    <>
      <div className='chat_text '>
        <div className="userDataBar p-5 bg-[#435585]">
        <div  className="singel_users flex justify-between mb-5 items-center ">
          <div className='flex items-center gap-5'> 
            <div className=" bg-green-100 user_image w-[50px] h-[50px] rounded-full overflow-hidden">
                <img src={userData?.friendPhoto} alt="user photo" />
              </div>
                <h2 className='text-lg font-semibold text-white'>{userData?.friendName}</h2>
          </div>                        
          </div>
        </div>
        <div className="msg_box w-[1000px] h-[500px]  p-5 overflow-y-scroll">
          
          {
            chirkut.map((item)=>{
              return(
                  item.senderId == sliceUser.uid?
                  <div className='mb-5 '>
                <p className="sender_msg w-fit py-1 px-3  ml-auto bg-[#6A9AB0] rounded-xl font-Poppins text-white">{item.msg}</p>
                <p className="sender_msg w-fit py-1 px-3  ml-auto  rounded-xl text-sm  font-Poppins text-black">{item.msgTime}</p>
                </div>
                :
                <div className='mb-5 '>
                <p className="recive_msg w-fit py-1 px-3 bg-[#3A6D8C] rounded-xl font-Poppins text-white">{item.msg}</p>
                <p className="sender_msg w-fit py-1 px-3    rounded-xl text-sm font-Poppins text-black">{item.msgTime}</p>
                </div>
              )
            })
          }
        </div>
        <div className="msg_input flex px-10  border-t-2 border-t-[#640D5F]  ">
            <input onKeyDown={(e)=>handelKey(e)}  onChange={(e)=>setmessage(e.target.value)} value={message}               
            type="text"  className='w-full bg-transparent text-xl font-bold font-Poppins text-[#522258] mt-4 outline-none ' placeholder='Enter your msg'/>
            <button onClick={handelSend}            
            className='text-xl text-[#2E236C] active:scale-[1.1] '><FaRegPaperPlane /></button>
        </div>
    </div>
      
    </>
  )
}

export default Chat