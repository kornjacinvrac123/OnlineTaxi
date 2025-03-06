import React, { useRef, useState ,useEffect} from 'react'
import Button from '../UI/Button'
import IText from '../UI/IText'
import logImage from'../images/log.jpg'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router'
import {HandleSubmit} from '../Functions/signupHandleFunctions.js'
import { ShowOnClick } from '../Functions/loginHandleFunctions.js'
import { areFieldsFilled } from '../Functions/addCardHandleFunctions.jsx'



const Signup = ({showFrontPage,showLogin}) => {
  
  const navigate=useNavigate();
  const[data,setData]=useState("");
  const[status,setStatus]=useState("");
  const[error,setError]=useState("");
  const[name,setName]=useState("");
  const[surname,setSurname]=useState("");
  const[username,setUsername]=useState("");
  const[password,setPassword]=useState("");
  const[email,setEmail]=useState("");
  const[Eye,setEye]=useState(faEyeSlash);
  const passwordRef=useRef(null);
  const nameRef=useRef(null);
  const usernameRef=useRef(null);
  const surnameRef=useRef(null);
  const emailRef=useRef(null);
  const[disabledButton,setDisabledButton]=useState(true);



    // useEffect(()=>{
    // if(status==='Success'){setTimeout(()=>navigate('/login')),500}
    // },[status]);

    useEffect(()=>{
      if(areFieldsFilled(nameRef,surnameRef,usernameRef,passwordRef,emailRef)){
          setDisabledButton(false);
      }
      else{
          setDisabledButton(true);
      }
    },[name,surname,username,password,email]);
useEffect(()=>{
  console.log('DATA JE ',data);
  console.log('Error je : ',error);
},[data,error]);


return (
  <div
    className="h-screen flex flex-col justify-center items-center bg-[#131316]"
  >
      <div className='absolute top-0 left-0 ml-5 mt-10'>
              <button 
                  onClick={showFrontPage}
              >
                <p className='text-3xl font-bold text-white font-mono text-center '>S W I F T</p> 
             </button>
    </div> 
    <div className="flex flex-row justify-center items-center w-full animate-slide-down">


      <form
        action=""
        onSubmit={(e)=>{
          e.preventDefault();
          HandleSubmit(passwordRef,nameRef,usernameRef,surnameRef,emailRef,setError,setDisabledButton,name,surname,username,password,email,setData,setStatus);
        }}
        className="flex flex-col justify-center items-center"
      >
         <label htmlFor="" className="font-bold ml-3 text-white text-5xl">Sign  Up</label> <br />
         <p className="font-semibold ml-3 text-white  mt-5 text-no-wrap space-x-5 font-sans">
        Already have an account?  

        <button 
          className='text-blue-500 ml-2'
          onClick={showLogin}
          type={'button'}
        >
          Login In
        </button>
      </p>
        <div className="bg-[#131316] in-w-[500px] w-[500px] max-w-lg  mx-auto h-auto p-8 flex flex-col justify-center items-center">
          <IText  
              customType={"text"} 
              ref={nameRef}
              customValue={name}
              customPlaceHolder="name" 
              required onTextChange={(ev) => { setName(ev.target.value) }} 
              customClass='!bg-[#131316] font-sans text-white  border-0 border-b focus:border-b-2 focus:border-b-blue-500 hover:border-b-2 
          hover:border-b-gray-500 focus:outline-none bg-inherit rounded-none'
          />
          <br />
          <IText 
              customType={"text"} 
              customValue={surname}
              ref={surnameRef}
              customPlaceHolder="surname"
              required onTextChange={(ev) => { setSurname(ev.target.value) }} customClass='!bg-[#131316] font-sans text-white  border-0 border-b focus:border-b-2 focus:border-b-blue-500 hover:border-b-2 
          hover:border-b-gray-500 focus:outline-none bg-inherit rounded-none'
          />
          <br />
          <IText 
              customType={"text"} 
              ref={usernameRef}
              customValue={username}
              customPlaceHolder="username" 
              required onTextChange={(ev) => { setUsername(ev.target.value) }} 
               customClass='!bg-[#131316] font-sans text-white  border-0 border-b focus:border-b-2 focus:border-b-blue-500 hover:border-b-2 
             hover:border-b-gray-500 focus:outline-none bg-inherit rounded-none'
          />
          <br />
          <div className="relative w-full">
          <IText 
              customType={"password"}
              customValue={password}
              ref={passwordRef} 
              customPlaceHolder="password" 
              required onTextChange={(ev) => { setPassword(ev.target.value) }} 
               customClass='!bg-[#131316] font-sans text-white  border-0 border-b focus:border-b-2 focus:border-b-blue-500 hover:border-b-2 
              hover:border-b-gray-500 focus:outline-none bg-inherit rounded-none'
           />
          <button
            type="button"
            className="absolute right-2 top-1/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={()=>ShowOnClick(Eye,setEye,faEye,faEyeSlash,passwordRef)}
          >
          <FontAwesomeIcon icon={Eye} />
          </button>
          </div>
          <br />
          <IText 
            customType={"email"}
            ref={emailRef} 
            customValue={email}
            customPlaceHolder="email"
            required onTextChange={(ev) => { setEmail(ev.target.value) }} 
             customClass='!bg-[#131316] font-sans text-white  border-0 border-b focus:border-b-2 focus:border-b-blue-500 hover:border-b-2 
             hover:border-b-gray-500 focus:outline-none bg-inherit rounded-none'
           />
           <br />
          <Button 
              text={status === '' ? 'Continue' : data} 
              disabled={disabledButton}
              onBtnClick={status === 'Success' ? setTimeout(showLogin,600) : ''}
              customClass={`text-3xl font-bold w-full bg-black border-0 
               ${disabledButton ? 'pointer-events-none' : ''} 
              //  ${data && status !== 'Success' ? 'bg-red-600 hover:bg-red-600' : (status === 'Success' ? 'bg-green-400 hover:bg-green-400' : '')}`}
          />
        </div>
      </form>
    </div>
  </div>
);


  
}

export default Signup