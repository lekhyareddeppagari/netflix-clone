import React, { useState ,useRef} from 'react'
import Header from './Header'
import {checkValidData} from "../utils/validate";
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_LOGO } from '../utils/constants';

const Login = () => {
  
  const [isSignInForm ,setIsSignInForm]=useState(true);
  const dispatch =useDispatch();


  //useref is used to refernce the tags and use state is used to update nd store the value
  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);

  const [errorMessage,setErrorMessage]=useState(null);
 
  const handleButtonClick=()=>{
  //validate form data
  const message=checkValidData(email.current.value, password.current.value);
  setErrorMessage(message);

  if(message) return;
if(!isSignInForm){
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    
    const user = userCredential.user;
    //updating displayname
    updateProfile(user, {
      displayName: name.current.value, photoURL: USER_LOGO,
    }).then(() => {
      const 
      {uid ,email,displayName,photoURL} = auth.currentUser; //details come from auth not  from user .bcoz auth contains updated details
      dispatch(addUser({uid:uid, email:email, dispalyName:displayName ,photoURL:photoURL}));
      
      // Profile updated!
      // ...
    }).catch((error) => {
      setErrorMessage(errorMessage)
      // An error occurred
      // ...
    });
    
    
    //console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"_ "+errorMessage)
    // ..
  });
   }
   else{
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    //console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage)
  });

   }
}
  const toggleSignInForm =()=>{
    setIsSignInForm(!isSignInForm)
  }
  
  
  return (
    <div>
      <Header/>
    
      <div className="fixed">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/32c47234-8398-4a4f-a6b5-6803881d38bf/eed3a573-8db7-47ca-a2ce-b511e0350439/IN-en-20240122-popsignuptwoweeks-perspective_alpha_website_small.jpg" 
        alt="logo"/>
        </div>
        
        <form 
        onSubmit={(e)=>e.preventDefault()}
        className="w-3/12 absolute p-8 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg opacity-75 ">
          <h1 className='font-semibold text-2xl  py-2'>{isSignInForm? "Sign In":"Sign Up"}</h1>
      {
        !isSignInForm &&   
              <input
              ref={name} type="text"
        placeholder="Full Name"
        className="p-2 my-4 w-full bg-gray-700" />
      }
        <input type="text"
        ref={email}
        placeholder="Email Address"
        className="p-2 my-4 w-full bg-gray-700" />
        <input 
        ref={password}
        type="password"
        placeholder="password"
        className="p-2 my-4 w-full bg-gray-700" />
 <p className=" p-2 font-bold text-red-400">{errorMessage}</p>
          <button 
          onClick={handleButtonClick}
          className='p-2 my-3 bg-red-700 w-full rounded-lg'>
          {isSignInForm? "Sign In":"Sign Up"}
          </button>

          <p onClick={()=>{toggleSignInForm()}} className='py-4 cursor-pointer'>
            {isSignInForm? "New to Netflix ? Sign Up Now":"Already Registered ? Sign In"}
          </p>
        </form>
        
    
  </div>
  )
}

export default Login