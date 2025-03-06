import React from 'react'
import Button from '../UI/Button'
import { useNavigate } from 'react-router'

const Footer = ({showSignup,showLogin}) => {

  const navigate=useNavigate();

  return (
    <div className='flex justify-start bg-[#131316] w-full h-[400px]'>
        <div className='flex  h-[400px] w-1/3   justify-center items-center'>
            <p className='text-white font-bold text-6xl font-sans text-left'>SWIFT</p>
        </div>
     <div className='flex flex-col justify-center items-center  space-y-5  w-1/3'>

    <Button 
            customClass='bg-inherit w-[50px] h-[70px] hover:white  shadow-none border-none hover:bg-inherit'
            // onBtnClick={()=>window.location.reload() }
            >
                <p className='text-2xl font-bold text-white font-sans text-center
                transition duration-700 hover:-translate-y-1 hover:scale-125'>
                    Home
                </p> 
    </Button>
     
        <Button 
         customClass='bg-inherit w-[50px] h-[70px] hover:white  shadow-none border-none hover:bg-inherit'
         onBtnClick={showSignup}
        >
            <p className='text-2xl font-bold text-white font-sans text-center
            transition duration-700 hover:-translate-y-1 hover:scale-125'>
                Sign up
            </p> 
        </Button>
        <Button 
         customClass='bg-inherit w-[50px] h-[70px] hover:white  shadow-none border-none hover:bg-inherit'
         onBtnClick={showLogin}
        >
            <p className='text-2xl font-bold text-white font-sans text-center 
            transition duration-700 hover:-translate-y-1 hover:scale-125'>
                Log in
            </p> 
        </Button>       
     </div>
     <div className='flex justify-end items-center  w-[500px] '>
        <button 
            className="text-white  text-xl font-bold py-2 px-4 rounded-full w-[300px] h-[100px]
            transition delay-50 duration-700 ease-in-out hover:-translate-y-2
            hover:scale-125 text-center " 
            style={{background:' linear-gradient(to right, #3b82f6, #60a5fa, #d1d5db)'}}
        >
            <a 
                href="https://www.linkedin.com/in/zivan-urosevic-23845624a"
                target='_blank'
            >
                <p className='text-white font-bold text-2xl font-sans text-center'>Developer information</p>
            </a>
            
        </button>
     </div>
    </div>
  )
}

export default Footer