import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import NotFountd from './components/NotFound/NotFountd'
import RegisterPage from './pages/RegisterPage'
import { ToastContainer } from 'react-toastify'
import database from './firebase.config'
import RestPassword from './components/restPassword/RestPassword'
import Layout from './LayoutOne/Layout'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'

import FriendRequestPage from './pages/FriendRequestPage'
import FriendPage from './pages/FriendPage'
import Friendlist from './components/Friendlist/Friendlist'
import BlockPage from './pages/BlockPage'



function App() {

  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/restPassword' element={<RestPassword />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/FriendAdd' element={<FriendPage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/friendRequest' element={<FriendRequestPage />} />
          <Route path='/friendList' element={<Friendlist />} />
          <Route path='/block' element={<BlockPage />} />


        </Route>
        <Route path='*' element={<NotFountd />} />
      </Route>
    )
  )


  return (
    <>
      <RouterProvider router={route} />
      <ToastContainer />
    </>
  )
}

export default App
