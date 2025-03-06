import React, { useState,useEffect } from 'react'
import userImage from '../images/rsd.png';
import paycard from '../images/card.png';
import Button from '../UI/Button';
import AddCard from './AddCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft,faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import {handleCardPanel,handleCardShow,handlePayCard,handleInfoCircle} from '../Functions/PaymentPanelFunc'
import useStore from '../Functions/useStore';

const PaymentPanel = ({showUserPanel,userId,customClass,handlePlaceOfCall,addBtnClassEdit}) => {


const[showCard,setShowCard]=useState(false);
const[showPayment,setShowPayment]=useState(true);
const[status,setStatus]=useState('');
const[error,setError]=useState('');
const[flag,setFlag]=useState(false);
const[editSaveButton,setEditSaveButton]=useState(false);
const setPaymentMethod=useStore((state)=>state.setPaymentMethod);
const setAddCard=useStore((state)=>state.setAddCard);
const paymentMethod=useStore((state)=>state.paymentMethod);
const setRender=useStore((state)=>state.setRender);
// const refreshPayment=useStore((state)=>state.refreshPayment);
    useEffect(()=>setRender(true),[]);
    useEffect(()=>{
      const AsyncFetch=async()=>{
      await handlePayCard(setStatus,setError,userId);
      }
      AsyncFetch();
    },[showPayment]);

    useEffect(()=>{
      if(status === 'Error'){
        setFlag(true);
      }
      else setFlag(false);

    },[status,error]);

 const CreatePayOption = (image,string1,string2)=>{
  return(
    <div className={`bg-white p-4 h-[60px] w-auto mt-10 rounded-lg shadow-md flex justify-between items-center space-x-3`}>
           <div className="flex items-center space-x-3">
                <span
                  className="w-12 h-12 bg-cover bg-center rounded-full"
                  style={{ backgroundImage: `url(${image})` }}/>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{string1}</p>
                  <p className="text-gray-500 text-sm">{string2}</p>
                </div>
            </div>
           {string1==='Card' && <div className='flex justify-end items-end'>
              <button onClick={()=>
              {
                handleInfoCircle(setShowPayment, setShowCard, setEditSaveButton);
                setAddCard(true);
                setRender(false);
                // if (handlePlaceOfCall === 'FavoriteCar') {
                //   setAddCard(true);
                // } else {
                //   handleInfoCircle(setShowPayment, setShowCard, setEditSaveButton);
                // }
              }}>

              <FontAwesomeIcon icon={faCircleInfo} size='2x'/>
              </button>
            </div>}
        </div>
  )
}

  return (
    <>{showPayment &&
  <div className={`grid grid-rows-[auto,1fr]  h-screen w-[500px] bg-gray-900/50  
  animate-fadeIn p-[clamp(1rem,5vw,3rem)] transform origin-top
   transition-all duration-300 scale-[clamp(0.8,100vw/1920,1)] md:scale-100 ${customClass}  `}>
        <div className='absolute left-0 top-0 mt-5'>
          <button onClick={()=>{
            showUserPanel();
            setAddCard(false);
          }}>
            <FontAwesomeIcon icon={faAnglesLeft} size='2x' />
          </button>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-none items-center space-x-3">
            <div className='flex-grow'>
            {CreatePayOption(userImage, "Cash", "Pay with cash")}
            </div>
             <input 
                type="radio"  
                className="w-[40px] h-[40px] mt-10" 
                name="paymentOption" 
                value="Cash" 
                checked={paymentMethod === 'Cash'}   
                onChange={
                  (e)=>{
                    setPaymentMethod(e.target.value);
                    // console.log('Clicked the : ',e.target.value)
                  }
                }
             />
          </div>
          {flag === false && (
            <div className="flex items-center space-x-3 ">
            <div className="flex-grow ">
              {CreatePayOption(paycard, "Card", "Pay with card")}
            </div>
            <input 
                type="radio" 
                className="w-[40px] h-[40px] mt-10" 
                name="paymentOption" 
                value="Card"  
                checked={paymentMethod === 'Card'}    
                onChange={
                  (e)=>{
                    setPaymentMethod(e.target.value);
                    // console.log('Clicked the : ',e.target.value)
                  }
                }
             />
            
          </div>)}
          </div>


        {flag === true && 
        (<div 
            className={`flex justify-center items-end mt-5 ${addBtnClassEdit} `}
         >   
          <Button 
            text={"Add new card"} 
            onBtnClick={()=>{handleCardPanel(setShowPayment,setShowCard);
              setRender(false);
            }}
            customClass='w-full bg-green-400 font-bold text-xl hover:bg-green-500 border-none '
          />
        </div>)}
        </div>}
        {showPayment === false && showCard &&
            (<AddCard 
              // here customClass just does not work maybe cuz its using parents div css
                  handleCardPanel={()=>handleCardPanel(setShowCard,setShowPayment)}
                  userId={userId} 
                  customClass={customClass}
                  editSaveButton={editSaveButton}  
            />)
        }
        </>
  )
}

export default PaymentPanel