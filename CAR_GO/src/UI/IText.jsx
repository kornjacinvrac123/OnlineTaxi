import { Input } from 'postcss';
import React, { forwardRef } from 'react'


// using forward ref to embroider reference to a function component <3
const IText = forwardRef(({customClass ,checked,name, pattern, disabled,maxlength,min,max,customLabel, customValue,customType,customPlaceHolder,onTextChange},ref)=>{
 return(
 <input type={customType} 
 value={customValue}
 placeholder={customPlaceHolder}
 onChange={onTextChange}
 ref={ref}
 label={customLabel}
 min={min}
 max={max}
 maxLength={maxlength} 
 disabled={disabled}
 pattern={pattern}
 name={name}
 checked={checked}
 //focus:outline-none focus:ring-2
 className={`${customClass} pl-5 w-full py-2 border font-bold bg-orange-200 text-black placeholder-gray-400 border-gray-300 rounded-3xl shadow-sm  focus:ring-blue-500 focus:border-blue-500 mb-4 box-border`}
      style={{boxSizing: 'border-box'}}
 />
 );  


})

export default IText