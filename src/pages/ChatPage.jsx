import React from 'react'
import Chat from '../components/Chat/Chat'
import ChatBar from '../components/ChatBar/ChatBar'

function ChatPage() {
  return (
    <>
        <div className=' flex gap-2 pl-[10px]'>
        <ChatBar/>
        <Chat/>
        </div>
        
    </>
  )
}

export default ChatPage