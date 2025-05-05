
import './Register.css'
import Lottie from "lottie-react";
import RegAnimation from "../../../public/animation/RegAnimation.json"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ScaleLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
function Register() {
     // =============================== variables part start 
    const [name, setName]                                   = useState ('')
    const [nameError, setNameError]                         = useState ('')
    const [email, setEmail]                                 = useState ('')
    const [emailError, setEmailError]                       = useState ('') 
    const [password, setPassword]                           = useState ('')
    const [passwordError, setPasswordError]                 = useState ('')
    const [show, setShow]                                   = useState (false)
    const [conPassword, setConPassword]                     = useState (false)
    const [conpasswordError, setConPasswordError]           = useState ('')
    const navigate                                          = useNavigate ()


    // ================================ firebase variables part starts
    const auth = getAuth();
    const [loader, setLoader]                              = useState (false)

    // =============================== functions part start 
       const handelName = (e)=>{
        setName(e.target.value)
        setNameError('')
       }

        const handelEmail = (e)=>{
           setEmail(e.target.value)
           setEmailError('')
        }
        
        const handelPassword = (e)=>{
          setPassword(e.target.value)
          setPasswordError('')
        }

        const handelShow = (e)=>{
          setShow(!show)
        }

        const handelConPass = (e)=>{
          setConPassword(e.target.value)
          setConPasswordError('')
        }

    // ============================== main submit function part start
        const handelSubmit = (e)=>{
            e.preventDefault()

            if(name ==''){
                setNameError('Please Enter Your Name')
            }
            
            if(email ==''){
                setEmailError('Please Enter Your Email')
            }
            if(!password){
              setPasswordError('Please Enter Your Password')
            }
             if(!conPassword){
              setConPasswordError('Please Enter Your Password')
            }
            else{
              if(password != conPassword){
                alert('Please enter the same password')
              }
              else{
                setLoader(true)
                createUserWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    // =============== add update profile and photo part
                    updateProfile(auth.currentUser, {
                      displayName: name,
                      photoURL: "https://static.vecteezy.com/system/resources/thumbnails/032/176/191/small_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg"
                    })
                    // =============== loader part
                    setLoader(false)
                    // =============== toast part
                    toast.success('Register successfully', {
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
                      navigate('/login')
                      // =============== send email verification part
                      sendEmailVerification(auth.currentUser)
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setLoader(false)
                    if(errorCode == 'auth/weak-password'){
                      toast.error('weak-password', {
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
                    }
                    if(errorCode == 'auth/email-already-in-use'){
                      toast.error('email already used', {
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
                    }
                  });
              }
            }
        } 


  return (
    <>
      <div className="container">
        <div className="w-full h-screen flex items-center">
        <div className="reg_animation  w-[600px]">
            <Lottie animationData={RegAnimation}/>
        </div>
        <div className="reg_form">
            <h1 className='RegHead'>Create account</h1>
            <form onSubmit={handelSubmit} >
              {/* ==================== name ================== */}
                <label>Name</label> <br/>
                <input onChange={handelName} type="text" placeholder="Enter your Name" /> <br/>
                <p className='error'>{nameError}</p>
                {/* =================== email ================== */}
                <label>Email</label> <br/>
                <input onChange={handelEmail} type="email" placeholder="Enter your Email" /> <br/>
                <p className='error'>{emailError}</p>
                {/* =================== password =============== */}
                <label>Password</label> <br/>
                <div className='RegPass'>
                  {
                    show ?
                    <FaRegEye onClick={handelShow} className='RegEyeIcons' />
                    :
                    <FaRegEyeSlash onClick={handelShow} className='RegEyeIcons'/> 
                  }
                <input onChange={handelPassword} type={show? 'text' : 'password'} placeholder="Enter your Password" /> <br/>
                </div>
                
                <p className='error'>{passwordError}</p>
                {/* ===================== confirm pass ================== */}
                <label>Confirm Password</label> <br/>
                 <div className="conPass">
                {
                    conPassword ?
                    <FaRegEye onClick={handelConPass} className='RegEyeIcons' />
                    :
                    <FaRegEyeSlash onClick={handelConPass} className='RegEyeIcons'/> 
                  }
                <input onChange={handelConPass} type={conPassword? 'text' : 'password'} placeholder="Confirm your Password" /> <br/>
                </div> 
                 <p className='error'>{conpasswordError}</p> 
                 {/* ===================== submit button ================== */}
                {
                  loader?
                <div className='loader'>

                <ScaleLoader color='#fff' />
                </div>
                :

                <button type='submit' className='RegButton'  >Register</button>
                }                
            </form>
        </div>
        </div>
      </div>
    </>
  )
}

export default Register



              

