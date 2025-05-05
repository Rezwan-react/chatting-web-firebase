import React, { useState } from 'react'
import Lottie from "lottie-react";
import loginani from '../../../public/animation/Login-Animation.json'
import './Login.css'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userData } from '../../Slices/UserSlices';
import { getDatabase, ref, set } from "firebase/database";



function Login() {
  // =============================== variables part start 

  const [email, setEmail]                        = useState('')
  const [emailError, setEmailError]              = useState('')
  const [password , setPassword]                 = useState('')
  const [passwordError, setPasswordError]        = useState('')
  const [showPassword, setShowPassword]          = useState(false)
  const navigate                                 = useNavigate()

  const dispatch                                 = useDispatch()
  // ---------------------------------  variables part end 
  // =============================== functions part start 
  const handelEmail = (e)=>{
    setEmail(e.target.value)
    setEmailError('')
  }
  const handelPassword = (e)=>{
    setPassword(e.target.value)
    setPasswordError('')
  }
  const handleShowPassword = ()=>{
    setShowPassword(!showPassword)
  }
  // -------------------------------- functions part end
   // ================================ firebase variables part starts
   const auth = getAuth();
   const db = getDatabase();


  // ============================== main submit function part start
  const handelSubmit = (e)=>{
    e.preventDefault()
    if(!email){
      setEmailError('Please Enter Your Email')
    }
     if(!password){
      setPasswordError('Please Enter Your Password')
    }
    else{
          signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //========== Signed in 
        const user = userCredential.user;
        if(userCredential.user.emailVerified == false){
          toast.error('Please verifi your email', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
          
        }else{
          toast.success('Login successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
            localStorage.setItem('data', JSON.stringify(user))
            navigate('/')
            dispatch(userData(user))
            // =============== user data
            set(ref(db, 'Cards/' + user.uid ), {
              userName: user.displayName,
              userPhoto: user.photoURL,
              uid: user.uid,
            });
          
        }
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
      });
      
      
    }
  }

  // ------------------------------- main submit function end


  return (
    <>
        <div className="container">
        <div className='w-full h-screen flex items-center bg-[#262222]'>
            <div className="animation w-[600px]">
                <Lottie animationData={loginani}/>
            </div>
            <div className="main_from">
                <h1 className='LoginHead'>Login</h1>
                <form onSubmit={handelSubmit} className='login_form'>
                  <label>Email</label> <br/>
                  <input onChange={handelEmail} type="email" placeholder="Enter your Email" /> <br/>
                  <p className='error'>{emailError}</p>
                  <label>Password</label> <br/>
                  <div className='pass'>
                    {
                      showPassword?
                      <FaRegEye onClick={handleShowPassword} className='eyeIcons' />
                      :
                      <FaRegEyeSlash onClick={handleShowPassword} className='eyeIcons' />
                    }
                  <input onChange={handelPassword} type={showPassword? "text" : "password"} placeholder="Enter your Password" /> <br/>
                  </div>
                  <p className='error'>{passwordError}</p>
                  <Link to='/restPassword' className="text-lg font-Poppins font-normal text-white hover:text-yellow-100 flex justify-end mt-2">Forgot Password?</Link>
                  <button className='loginButton' type="submit">Login</button>
                        
                        <div >
                           
                           <Link to='/register' className='text-lg font-Poppins font-normal text-white flex justify-center mb-2'>Don't have an account ? <span className='font-bold'> Register Here</span> </Link>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </>
  )
}

export default Login