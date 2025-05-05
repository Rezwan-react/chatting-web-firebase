import { configureStore } from '@reduxjs/toolkit'
import UserSlices from './Slices/UserSlices'
import ChatUserSlice from './Slices/ChatUserSlice'

export default configureStore({
  reducer: {
    counter: UserSlices,
    chatData: ChatUserSlice,
  },
})