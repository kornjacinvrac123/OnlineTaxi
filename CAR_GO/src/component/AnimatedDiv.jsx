import React from 'react';
import { useInView } from 'react-intersection-observer';

const AnimatedDiv = ({ customclass, animation, delay, children , blur,opacity,style}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '-100px 0px',
    triggerOnce: true, 
  });

  // console.log(`inView: ${inView}, animation: ${animation}, delay: ${delay}`); // Debugging

  return (
    
        <div
          
          ref={ref}
          className={`w-1/3 h-[400px] border-2 transition-opacity duration-500 ${
            inView 
            ? `${animation} ${delay || ' '} ${opacity} blur-none` 
            : `opacity-0 ${blur}`
          } ${customclass}`}
          style={style}
        >
          {children}
        </div>
  );
};

export default AnimatedDiv;