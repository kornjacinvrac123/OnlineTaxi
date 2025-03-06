import React, { useEffect, useState,useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft,faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Button from '../UI/Button';
import IText from '../UI/IText';
import axios from 'axios';
import {FindLocation,EditLocation} from '../Functions/FavoriteLocationHandleFunctions'
import useStore from '../Functions/useStore';

const FavoriteLocation = ({customClass,showUserPanel,setAddCard,addBtnClassEdit,userId}) => {
   
    const[response,setResponse]=useState('');
    const[status,setStatus]=useState('');
    const[error,setError]=useState('');
    const[text,setText]=useState('');
    const[secondStatus,setSecondStatus]=useState('');
    const[disable,setDisable]=useState(false);
    const[newText,setNewText]=useState(false);
    const setLocation=useStore((state)=>state.setLocation);
    const buttonText= secondStatus==='Success' ? 'Address is edited properly' : 'Address is not found';
    const textRef=useRef(null);
    // const [buttonClicked,setButtonClicked]=useState(false);

    useEffect(()=>{
      if(secondStatus === 'Success'){
        setLocation(text);
        setSecondStatus('');
      }
    },[secondStatus]);
    
    useEffect(()=>{
      const FetchData = async ()=>{
       await FindLocation(userId,setResponse,setStatus,setError);
      }
     FetchData();
    },[userId]);

    useEffect(()=>{
      if(status === 'Success'){
         setText(response);
         setNewText(true);

      }
      else {
        // console.log('Did not find address');
      }
    },[status,response,error]);

  return (
    <>
  <div className={`${customClass} flex flex-col justify-center items-center h-screen w-[500px] bg-gray-900/50 animate-fadeIn p-[clamp(1rem,5vw,3rem)] transform origin-top transition-all duration-300 scale-[clamp(0.8,100vw/1920,1)] md:scale-100`}>
        <div className='absolute left-0 top-0 mt-5'>
          <button onClick={()=>{
            showUserPanel();
            // setAddCard(false);
          }}>
            <FontAwesomeIcon icon={faAnglesLeft} size='2x' />
          </button>
        </div>
        <div>
         <label htmlFor="" className='font-bold text-white text-xl '>Favorite address</label><br />
          <form action="" onSubmit={(e)=>{e.preventDefault(); EditLocation(userId,text,setSecondStatus,setError,textRef,setDisable); }}>
              <div className="flex flex-col space-y-3 w-full" >
                  <IText 
                        key={newText}
                        ref={textRef}
                        customValue={text}
                        onTextChange={(e)=>setText(e.target.value)}
                        customType='text' 
                        customPlaceHolder="Your favorite address"
                        customClass="font-bold text-xl h-[50px] w-full placeholder-gray-600 text-black bg-white px-2 text-center"
                    />
              </div>

              
              <div className={`${addBtnClassEdit}flex  flex-col justify-end w-full`}>
                  <Button 
                        text={'Edit your Address'} 
                        disable={disable}
                        customClass={`w-full h-[50px]  bg-green-700  text-white font-bold 
                         
                          
                          ${
                          secondStatus === 'Error' ? 'bg-red-700'  : ' bg-green-700'}
                          `}
                  />
            </div>
          </form>
          </div>
        </div>
        </>
  )

}

export default FavoriteLocation