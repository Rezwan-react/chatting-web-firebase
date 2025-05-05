import { useSelector } from 'react-redux';
import './Home.css'
import { FaUserPen } from "react-icons/fa6";
import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
function Home() {
  // ==================== val
     const [show, setShow] = useState(false)
  // ================== react cropper 
  const defaultSrc ="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();

  // ===================== react cropper funcitons 
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result );
    };
    reader.readAsDataURL(files[0]);
  };

  
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  // ==================== firebase 
  const storage = getStorage();
  const auth = getAuth();

  // ================== functions 

  const handelSave= ()=>{ 
    const storageRef = ref(storage, 'userPhoto/' + currentUserData.uid + '.png');     
    uploadString(storageRef, cropData, 'data_url').then((snapshot) => {
      console.log('Uploaded a data_url string!');
      getDownloadURL(storageRef)
      .then((url)=>{
        onAuthStateChanged(auth, (user) => {
          updateProfile(auth.currentUser, {
            photoURL: url
          }).then(()=>{
            location.reload()
          })
        });
      });
    });
  }

    // ============================ slice data part start
    
    const currentUserData= useSelector((state) => state.counter.value)
    
  
    console.log(cropData)

  return (
    <>


          <div className='container flex min-h-screen items-center justify-center'>            
          <div className="card">
            <div className="w-full h-[187px] bg-[#7E60BF] relative">
              <div onClick={()=> setShow(true)} className=' top-5 right-5  absolute'>

                <FaUserPen className='text-4xl active:scale-95' />
              </div>
            </div>
            <div className="image">
              <img className=' rounded-full '  src={currentUserData?.photoURL} alt="Profile" />
            </div>
              <div className="card-info">
                <h2 className="mt-4 text-xl font-bold text-indigo-600 dark:text-indigo-400">{currentUserData?.displayName}</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-300">{currentUserData?.email}</p>
              </div>  
          </div>
          </div> 
          {
            show &&
          <div className='w-full h-full bg-[#00000081] absolute top-0 left-0 flex justify-center items-center'>
            <div className=' bg-white p-5 rounded-lg'>
              <div className=' flex items-center justify-between my-4'>
                <button onClick={handelSave} className='text-4xl text-[#A5B68D] active:scale-95'> <FaCheck /></button>
                <button onClick={()=> setShow(false)} className='text-4xl text-[#347928] active:scale-95'><MdOutlineCancel /></button>
              </div>
              <div style={{ width: "100%" }}>
                <input type="file" onChange={onChange} />
                
                <br />
                <br />
               <Cropper
               ref={cropperRef}
              style={{ height: 400, width: "400px" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              guides={true}
              />
              </div>
                <div>
                  
                    <div
                      className="box mt-10"
                      style={{ width: "100%", float: "right", }}
                       >
                        <h1>
                         
                         <button style={{ float: "right" }} onClick={getCropData}>
                          Crop Image
                        </button>
                        </h1>
                        <img style={{ width: "100px" }} src={cropData} alt="cropped" />
                    </div>
                </div>
                   <br style={{ clear: "both" }} />
            </div>
          </div>
          }




      


     

    </>
  )
}

export default Home