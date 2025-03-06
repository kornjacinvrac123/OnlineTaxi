import React, { useEffect,useState } from 'react'
import QuestionMark from '/home/zix/Documents/5semestar/PVAP/CAR_GO/public/questionmark.jpeg'
import Button from '../UI/Button'
import useStore from '../Functions/useStore'
import {EditServiceHistory} from '../Functions/ServiceHistoryHandlers'
const QuestionModal = ({exit,apply}) => {
  
  const repeatData=useStore((state)=>state.repeatData);
  const setRepeatRoute=useStore((state)=>state.setRepeatRoute);
  const setRefresh=useStore((state)=> state.setRefresh);
  const setJustEdit=useStore((state)=>state.setJustEdit);
  const[status,setStatus]=useState('');
  const[error,setError]=useState('');


 useEffect(()=>{
  if(status === 'Success')setJustEdit(true);
 },[status]);

  return (
    
    <div className='absolute top-1/3 left-1/2  animate-fadeIn justify-center items-center transform -translate-x-1/2 z-999  rounded-xl border-2 h-[250px] w-[550px] bg-gray-900/50 '>
      <p className='text-center font-bold text-white text-3xl'>Repeat a ride ?</p>
      <div className='flex justify-start items-center  '>
      <div className='h-[65px] w-[65px]  bg-white bg-cover bg-center rounded-full border-2 mt-5 ml-5'
                style={{ backgroundImage: `url(${QuestionMark})` }} 
                />
       <div className='flex justify-between w-full'>
        <div className='flex flex-col ml-5 mt-5'>
            <p className='font-bold text-xl text-white'>From:
            <p className='border-b-4 inline border-black'> {repeatData.StartLocation} </p> 
            </p>
            <p className='font-bold text-xl text-white'>To:
            <p className='border-b-4 inline ml-7 border-black'> {repeatData.EndLocation} </p> 
            </p>
        </div>
        <p className='mt-8 mr-5 font-bold text-3xl text-white'>{repeatData.Price} EUR</p>
       </div>
      </div><br /><hr />
      <div className='flex flex-row justify-between items-end  h-[110px]'>
      <Button 
        text={'No'} 
        customClass='bg-red-600 text-3xl font-bold h-[55px] w-[150px] mx-5 mb-5 ' 
        onBtnClick={exit}
      />
      <Button 
        text={'Yes'} 
        customClass='bg-green-400 font-bold  text-3xl h-[55px] w-[150px] mr-5 mb-5'
        onBtnClick={()=>{
            EditServiceHistory('time',repeatData,setStatus,setError);
            setRepeatRoute(false);
            apply();
        }}
      />
     </div>
    </div>   
  )
}

export default QuestionModal