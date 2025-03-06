import React, { useRef, useState,useEffect } from 'react'
import Button from '../UI/Button'
import IText from "../UI/IText"
import {handleSubmit,handleMonths,handleYears,handleCardNumber,handleCvv2,ShowOnClick,handleEditSubmit, areFieldsFilled}from "../Functions/addCardHandleFunctions"
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEyeSlash,faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import useStore from '../Functions/useStore';


const AddCard = ({handleCardShow,userId,editSaveButton,customClass,editBtnClass,handleCardPanel}) => {

  const [value, setValue] = useState({
    cardNumber:"",
    month:"",
    year:" ",
    cvv2:" ",
    cardName:" ",
  });
  const ref1=useRef(null);
  const ref2=useRef(null);
  const ref3=useRef(null);
  const ref4=useRef(null);
  const ref5=useRef(null);
  const[response,setResponse]=useState("");
  const[error,setError]=useState("");
  const[status,setStatus]=useState('');
  const[Eye,setEye]=useState(faEyeSlash);
  const[disabled,setDisabled]=useState(true);
  const helper=editSaveButton ?'Edit card info':'Add new card';
  const setRender=useStore((state)=>state.setRender);

  // useEffect(()=>setRender(true),[]);

  // Using useEffect when prop EditSaveButton its activated to set values from php server and to show to our client
  useEffect(()=>{
      axios.post(("http://localhost/onlineTaxi/card/cardFind.php"),{
       userId:userId,
      })
      .then(serverResponse=>{
       setValue({
        cardNumber:serverResponse.data.message.cardNumber,
        month: serverResponse.data.message.month || "",
        year: serverResponse.data.message.year || "",
        cvv2: serverResponse.data.message.cvv2 || "",
        cardName: serverResponse.data.message.cardName || "",
      });
      })
      .catch(error => {
          setError(error);
      })
  },[editSaveButton]);

 useEffect(()=>{
   if(areFieldsFilled(ref1,ref2,ref3,ref4,ref5)){
    setDisabled(false);
   } 
   else setDisabled(true);
 },[value.cardName,value.cardNumber,value.month,value.year,value.cvv2])
 

  return (
     <>
<div className={`grid grid-rows-[auto,1fr]  h-screen w-[500px] bg-gray-900/50  
  animate-fadeIn p-[clamp(1rem,5vw,3rem)] transform origin-top
   transition-all duration-300 scale-[clamp(0.8,100vw/1920,1)] md:scale-100 ${customClass}  `}>
  <div className='absolute left-0 top-0 mt-5'>
          <button onClick={()=>{
            handleCardPanel();
            setRender(true)
          }} >
            <FontAwesomeIcon icon={faAnglesLeft} size='2x' />
          </button>
        </div>
  <form action="" className='grid grid-rows-2 w-full' onSubmit={(e)=>{
    e.preventDefault();

    editSaveButton
    ? handleEditSubmit(value,setResponse,setStatus,setError,userId,handleCardPanel,setRender)
    : handleSubmit(setResponse,setError,setDisabled,setStatus,userId,ref1,ref2,ref3,ref4,ref5,handleCardPanel,setRender);
  }}>
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-white text-lg font-bold mb-4">{editSaveButton?'Edit your card info':'Insert your card info'}</h2>
   
      <div className="w-full mb-4">
        <label className="text-white mb-1 block">Card Number</label>
        <IText 
          customType='text'
          name='cardNumber' 
          ref={ref1}
          customValue={value.cardNumber}
          onTextChange={(e)=>handleCardNumber(e,setValue)}
          customPlaceHolder="1234 5678 9012 3456"
          maxlength='19'
          customClass="text-black bg-white text-center px-4"
        />
      </div>


      <div className="w-full mt-5">
        <div className="flex justify-between gap-2">
      
          <div className="flex flex-col items-start flex-1">
            <label className="text-white mb-1">Month</label>
            <select 
             onChange={(e)=>{setValue(prev=>({...prev,month:e.target.value}))}}
              value={value.month}
              name="month" 
              defaultValue={'01'} 
              ref={ref2} 
              className="h-[50px] w-full placeholder-gray-500 text-black bg-white rounded-3xl px-2"
            >
              {handleMonths()}  
            </select>   
          </div>


          <div className="flex flex-col items-start flex-1">
            <label className="text-white mb-1">Year</label>
            <select
              onChange={(e)=>{setValue(prev=>({...prev,year:e.target.value}))}}
              value={value.year}
              name="year" 
              defaultValue={`${new Date().getFullYear()}`}
              ref={ref3} 
              className="h-[50px] w-full placeholder-gray-500 text-black bg-white rounded-3xl px-2"
            >
              {handleYears()}  
            </select>              
          </div>


          <div className="flex flex-col items-start flex-1 max-w-[85px]">
            <label className="text-white mb-1">CVV2/CVC2</label>
            <IText 
              customType='password' 
              customValue={value.cvv2}
              onTextChange={(e)=>handleCvv2(e,setValue)}
              name='cvv2' 
              ref={ref4} 
              maxlength='3' 
              customPlaceHolder="***"
              customClass="h-[50px] w-full placeholder-gray-600 text-black bg-white px-2 text-center"
            />
             <button
            type="button"
            className="absolute right-2 top-1/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={()=>ShowOnClick(faEye,faEyeSlash,setEye,Eye,ref4)}
          >
          <FontAwesomeIcon icon={Eye} color={'black'} />
          </button>
          </div>
        </div>
      </div>

      <div className="w-full mt-5">
        <label className="text-white mb-1 block">Cardholder Name</label>
        <IText 
          customValue={value.cardName}
          onTextChange={(e)=>setValue(prev=>({...prev,cardName:e.target.value}))}
          label="Cardholder Name" 
          ref={ref5} 
          name='cardName' 
          customPlaceHolder="John Doe"
          customClass="w-full placeholder-gray-600 text-black bg-white px-4"
        />
      </div>
    </div>

    <div className={`flex justify-center items-end  ${editBtnClass}  `}>
      { 
      <Button
        disabled={disabled}
        customClass={`
          ${status === 'Error'
            ? `bg-red-700 text-white font-bold w-full ${disabled ? 'pointer-events-none hover:none ' : ''}`
            : `bg-green-400 hover:bg-green-500 text-white font-bold w-full ${disabled ? ' pointer-events-none hover:none ' : ''}`}
        `}
        text={response === '' ? helper : response} 
       
      
      />
      }
    </div>
  </form>
</div>

  </>)
}

export default AddCard
