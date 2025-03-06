import React from 'react'
import Payment from '/home/zix/Documents/5semestar/PVAP/CAR_GO/public/payment.png'
import LocationTag from '/home/zix/Documents/5semestar/PVAP/CAR_GO/public/tag.jpg'
import Button from '../UI/Button'
import useStore from '../Functions/useStore'

const CheckoutModal = ({start,end,price,pay,showModal,exit}) => {

 const setApply=useStore((state)=>state.setApply);
 const setExit=useStore((state)=>state.setExit);

  return (
      <div className='absolute top-1/3 left-1/2  animate-fadeIn justify-center items-center transform -translate-x-1/2 z-999  rounded-xl border-2 h-auto w-[500px] bg-gray-900/50 '>
      <p className='font-bold text-white text-3xl text-center pt-5'>Verify</p>
      <div className='h-[80px] mt-10 '>
           <div className=' flex justify-between'>
               <div className='h-[65px] w-[65px] bg-white bg-cover bg-center rounded-xl border-2 mt-2 ml-5'
              style={{ backgroundImage: `url(${LocationTag})` }} 
               />
              <div className='flex flex-col w-full justify-start'>
              <p className='font-bold text-white text-xl ml-5 mt-2 '>From:  <p className='border-b-4 inline border-black'>{start}</p>  </p>
              <p className='font-bold text-white text-xl ml-5 '>To:  <p className='ml-7 border-b-4 inline border-black'>{end}</p></p> 
              </div>
               
           </div>
      </div>
      <hr />
      <div className=' h-[80px]'>
        <div className=' flex justify-between'>
            <div className='h-[65px] w-[65px] bg-white bg-cover bg-center rounded-xl border-2 mt-2 ml-5'
                  style={{ backgroundImage: `url(${Payment})` }} 
                  />
              <div className='flex flex-col  w-full justify-start'>
                  <p className='font-bold text-white text-2xl ml-5 mt-2 '>Payment Method </p>
                  <p className='font-bold text-white text-xl ml-5 '>{pay}</p> 
              </div>
            </div>
      </div>
     <hr />
     <div className='h-[80px]'>
        <div className='flex justify-between'>
            <p className='mt-5 font-bold text-white ml-5 text-3xl'>Total</p>
            <p className='mt-5 font-bold text-white mr-5 text-3xl'>{price} EUR</p>
        </div>
     </div>
     <div className='flex flex-row justify-between items-end  h-[150px]'>
      <Button 
        text={'Exit'} 
        customClass='bg-red-600 text-3xl font-bold h-[55px] w-[150px] mx-5 mb-5 ' 
        onBtnClick={exit}
      />
      <Button 
        text={'Apply'} 
        customClass='bg-green-400 font-bold  text-3xl h-[55px] w-[150px] mr-5 mb-5'
        onBtnClick={showModal}
      />
     </div>
    </div>
  )
}

export default CheckoutModal