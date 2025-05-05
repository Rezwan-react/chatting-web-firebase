import React, { useState } from 'react'
import './RestPassword.css'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
function RestPassword() {

  const [email, setEmail] = useState('');
  // const [submitted, setSubmitted] = useState(false);
  const navigate     = useNavigate()
  const auth = getAuth();

  const handleChange = (e)=>{
    setEmail(e.target.value);
    
  };

  const handleSubmit =(e)=>{
    e.preventDefault()

    if(!email){
      alert('Please Enter Your Email')
      return;
    }else{
      sendPasswordResetEmail(auth, email)
  .then(() => {
    navigate('/')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    }
  }


   

  return (
    <>

    {/* <div className='flex justify-center items-center min-h-screen bg-red-400'>
    <div className='subscribe'>
        <p>Forgot Password</p>
        <input   placeholder="Your e-mail" className="subscribe-input" name="email" type="email"
           value={email}
           onChange={handleChange}
           required
        />
        <br/>
        <button  type='submit' className='submit-btn'>Send Reset</button>
    </div>
    </div> */}
    
    <div className="flex justify-center items-center min-h-screen bg-red-400">
      <div className="w-full max-w-md p-8 bg-yellow-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 p-2 block w-full border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>
          <button type="submit" className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default RestPassword