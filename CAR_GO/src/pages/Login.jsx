import React, { useRef, useState ,useEffect} from 'react'
import Button from '../UI/Button'
import IText from '../UI/IText'
import logImage from'../images/log.jpg'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import{handleLoginSubmit,ShowOnClick} from '../Functions/loginHandleFunctions'
import { Link } from 'react-router'
import { areFieldsFilled } from '../Functions/addCardHandleFunctions'

const Login = ({showFrontPage,showSignUp}) => {

  const navigate=useNavigate();
  const[username,setUsername]=useState("");
  const[password,setPassword]=useState("");
  const[response,setResponse]=useState("");
  const[status,setStatus]=useState("");
  const[error,setError]=useState("");
  const[Eye,setEye]=useState(faEyeSlash);
  const passwordRef=useRef(null);
  const usernameRef=useRef(null);
  const[disabledButton,setDisabledButton]=useState(true);
  useEffect(()=>{
   if(status ==='Success' && !error && response){
    setTimeout(()=>{
      navigate(`/Dashboard`,{state:{isLoggedIn:true,userData:{id:response.id,name:response.name,
        surname:response.surname,username:response.username,password:response.password,
        email:response.email
      }}});
    },600);
   }
  },[status,error,response,navigate]); 
  useEffect(()=>{
    if(areFieldsFilled(usernameRef,passwordRef)){
        setDisabledButton(false);
    }
    else{
        setDisabledButton(true);
    }
  },[username,password]);
  return (
   

  <body className="h-screen flex  flex-col justify-center items-center bg-[#131316]  ">
    <div className='absolute top-0 left-0 ml-5 mt-10'>
              <button 
                  onClick={showFrontPage}
              >
                <p className='text-3xl font-bold text-white font-mono text-center '>S W I F T</p> 
             </button>
    </div> 
  <form action="" className="  animate-slide-up flex flex-col justify-center items-center w-[500px]" onSubmit={
    (e)=>{
      e.preventDefault();
      handleLoginSubmit(setDisabledButton,setStatus,setResponse,setError,username,password,passwordRef,usernameRef);
    }
  }>
    <label htmlFor="" className="font-bold ml-3 text-white text-5xl">Log  In</label>
    <p className="font-semibold ml-3 text-white  mt-5 text-no-wrap space-x-5 font-sans">
       Don't have an account?  

      <button 
        className='text-blue-500 ml-2'
        onClick={showSignUp}
        type={'button'}
      >
         Sign-up 
      </button>
    </p>
    <div className=" bg-inherit in-w-[320px] max-w-lg w-full mx-auto h-auto  p-8 flex flex-col justify-center items-center"><br/>
      <IText  
          customType={"text"} 
          ref={usernameRef}
          customPlaceHolder="username" 
          name='username' 
          customValue={username}
          customClass='!bg-[#131316] font-sans text-white  border-0 border-b focus:border-b-2 focus:border-b-blue-500 hover:border-b-2 
          hover:border-b-gray-500 focus:outline-none bg-inherit rounded-none'
          onTextChange={(ev)=>{setUsername(ev.target.value)}}
      /> 
      <br/>
      <div className="relative w-full">
      <IText 
          customType={"password"} 
          ref={passwordRef} 
          customPlaceHolder="password"
          name='password' 
          customValue={password}
          customClass='!bg-[#131316] font-sans text-white border-0 border-b focus:border-b-2 focus:border-b-blue-500 hover:border-b-2 
          hover:border-b-gray-500 focus:outline-none bg-inherit rounded-none'
          onTextChange={(ev)=>{setPassword(ev.target.value)}}
      />
       <br/>
      <button
          type="button"
          className="absolute right-2 top-1/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={()=>ShowOnClick(Eye,setEye,faEye,faEyeSlash,passwordRef)}
      >
          <FontAwesomeIcon icon={Eye} />
      </button>

      </div><br />
      <Button 
             text={status !== 'Success' ? (response  ? response : 'Continue') : "Let's go"} 
           disabled={disabledButton}
           customClass={`text-3xl font-bold w-full bg-black border-0 
            ${disabledButton ? 'pointer-events-none' : ''} 
            ${response && status !== 'Success' ? 'bg-red-600 hover:bg-red-600' : (status === 'Success' ? 'bg-green-400 hover:bg-green-400' : '')}`}
          
      />
    </div>
  </form>
    {/* {(status !=='Success' || error) && (
        <div className="flex  flex-col justify-center rounded-xl w-[200px] text-center bg-red-600 text-white font-bold">
        {response && <p>{response}</p>}
        {error && <p>{error}</p>}
        </div>
    )}; */}
  </body>

  )
}

export default Login