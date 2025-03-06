import React from 'react'
import Checkmark from '/home/zix/Documents/5semestar/PVAP/CAR_GO/public/checkmark.jpeg' 
import Draggable from 'react-draggable'
import Button from '../UI/Button'

const SuccessModal = ({exit}) => {

  return (

      <div className='absolute top-1/2 left-1/2  animate-fadeIn justify-start items-center transform -translate-x-1/2 z-999  
        rounded-xl border-2 h-[300px] w-[400px] bg-gray-900/50 '>
        <div className='flex flex-col justify-center items-center h-[80px]  border-white mt-5'>
            <div className='w-[50px] h-[50px]  rounded-full border-white bg-cover bg-center '   
            style={{ backgroundImage: `url(${Checkmark})` }} />
        </div>
        <hr />
        <div className='flex flex-col justify-start items-center border-white  w-full h-[100px]'>
             <p className='font-bold text-white text-3xl'>Success</p>
             <p className='font-bold text-white '>Your ride has been confirmed</p>
             <p className='font-bold text-white '>Driver will be there soon</p>
        </div>
        <div className='flex flex-col justify-center items-center  border-white h-[95px]'>
            <Button 
              text={'OK'} 
              customClass='text-white text-2xl font-bold bg-green-700 w-[250px] rounded-lg'
              onBtnClick={exit}
            />

        </div>
        </div>    
  )
}

export default SuccessModal