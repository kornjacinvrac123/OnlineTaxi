import IText from "../UI/IText";
import userImage from '../images/user.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import Button from "../UI/Button";
import { ShowOnClick } from "../Functions/loginHandleFunctions";
import{handleEditUser}from'../Functions/userDivHandleFunctions';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "axios";
import useStore from '../Functions/useStore';
import { useNavigate } from "react-router";

export const UserDiv = ({userData,onSaveChanges,onTextChange,isSaveChangeVisible,showUserPanel,userId}) => {
   

    const navigate=useNavigate();
    const[Eye,setEye]=useState(faEyeSlash);
    const passwordRef=useRef(null);
    const nameRef = useRef(null);
    const surnameRef =useRef(null);
    const usernameRef =useRef(null);
    const emailRef = useRef(null);
    const[disabledButtom,setDisabledButton]=useState(false);
    const[response,setResponse]=useState('');
    const[status,setStatus]=useState('');
    const[error,setError]=useState('');
    const repeatData=useStore((state)=>state.repeatData);


    return ( 
    <div className="grid  grid-rows-[auto,1fr]  h-screen w-[500px] bg-gray-900/50  animate-fadeIn p-[clamp(1rem,5vw,3rem)] transform origin-top transition-all duration-300 scale-[clamp(0.8,100vw/1920,1)] md:scale-100">
     <form onSubmit={
      (e)=>{
         e.preventDefault();
         if(isSaveChangeVisible){
           handleEditUser(nameRef,surnameRef,usernameRef,passwordRef,emailRef,setDisabledButton,userData,setResponse,setStatus,setError,showUserPanel);
         }
      }
     }>
     <div className="flex flex-col justify-center items-center">
      <label htmlFor="" className="font-bold text-white">{isSaveChangeVisible?"Edit profile":"About You "}</label>
       <span className="w-[100px] h-[100px] rounded-full bg-center bg-cover "
       style={{ backgroundImage: `url(${userImage})` }}/>
     </div>
     <div className="flex flex-col justify-center space-y-10">
     <label htmlFor="" className="font-bold text-white justify-start">Name</label>
      <IText 
        customValue={userData.name} 
        ref={nameRef} 
        customClass="bg-white" 
        className="text-white" 
        onTextChange={isSaveChangeVisible?(e)=>onTextChange("name",e.target.value):undefined}
      />
      <IText 
        customValue={userData.surname} 
        ref={surnameRef} 
        customClass="bg-white" 
        className="text-white"
        onTextChange={isSaveChangeVisible?(e)=>onTextChange("surname",e.target.value):undefined}
      /> 
      <label htmlFor=""  customClass="bg-white" className="font-bold text-white justify-start">Email</label>
      <IText 
        customValue={userData.email}
        ref={emailRef} 
        customClass="bg-white"
        className="text-white" 
        onTextChange={isSaveChangeVisible?(e)=>onTextChange("email",e.target.value):undefined}
      />
      <label htmlFor="" customClass="bg-white" className="font-bold text-white justify-start">Account</label>
      <IText 
          customValue={userData.username} 
          ref={usernameRef} 
          customClass="bg-white"  
          onTextChange={isSaveChangeVisible?(e)=>onTextChange("username",e.target.value):undefined} 
          className="text-white"
       />
            <div className="relative w-full ">
                <IText  customClass="w-full bg-white" customType={"password"} ref={passwordRef} customValue={userData.password}  name='password' onTextChange={isSaveChangeVisible?(e)=>onTextChange("password",e.target.value):undefined}/><br/>
                    <button
                        type="button"
                        className="absolute right-2 top-1/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={()=>ShowOnClick(Eye,setEye,faEye,faEyeSlash,passwordRef)}
                      >
                      <FontAwesomeIcon icon={Eye} />
                    </button>
            </div>

      {
        isSaveChangeVisible 
        && 
        <Button customClass={status==='Error'?'bg-red-700 text-white font-bold': "bg-green-400 hover:bg-green-500 text-white font-bold"}
         text ={response === '' ? "Save Changes" : response} 
        //  onBtnClick={onSaveChanges}
         />
      }
      <Button 
          text={"Delete Account"} 
          customClass={'bg-black border-none h-auto font-bold text-xl  hover:bg-red-600'}
          onBtnClick={()=>
          {          
            confirmAlert({
              title: 'Confirm to delete',
              message: 'Are you sure you want to delete this account?',
              buttons: [
                {
                  label: 'Yes',
                  onClick:()=>{
                    axios
                    .post(('http://localhost/onlineTaxi/deleteAll.php'),{
                      id:userId,
                    })
                    .then(response => console.log('Message from DeletePHP endpoint ',response))
                    .catch(error => console.log('Error message from DeletePHP endpoint ',error))
                    navigate('/FrontPage',{replace:true});
                  }
                },
                {
                  label: 'No',
                }
              ]
            });
          }}
        />
     </div>
     </form>
    </div>
  );
}

