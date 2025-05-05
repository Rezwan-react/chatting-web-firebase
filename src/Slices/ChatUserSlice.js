import { createSlice } from '@reduxjs/toolkit'

export const chatUser = createSlice({
  name: 'chatData',
  initialState: {
    chatUserData:  JSON.parse(localStorage.getItem('chatUser')) ? JSON.parse(localStorage.getItem('chatUser')) : null
  },
  reducers: {
    chatUserData: (state, action) => {
      state.chatUserData = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {  chatUserData } = chatUser.actions

export default chatUser.reducer