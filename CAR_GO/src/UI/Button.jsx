import React, { forwardRef } from 'react'

const Button = forwardRef(({customClass,type,text,onBtnClick,children},ref)=>{
  return (
    <button
        className={` block 
        w-auto px-4 text-white bg-black py-2 border border-gray-300 rounded-3xl shadow-lg focus:outline-none hover:bg-gray-800 ${customClass}`}
        ref={ref}
        type={type}
        onClick={onBtnClick}
        >
        {text}
        {children}
    </button>
  )
});

export default Button