import React, { useRef,useEffect, useState} from 'react'
import TaxiImage from '/home/zix/Documents/5semestar/PVAP/CAR_GO/public/taxi.jpg'
import AnimatedDiv from '../component/AnimatedDiv'
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFastForward } from "@fortawesome/free-solid-svg-icons";
import FavoriteLocation from '/home/zix/Documents/5semestar/PVAP/CAR_GO/public/FavoriteLocation.png'
import RepeatRide from '/home/zix/Documents/5semestar/PVAP/CAR_GO/public/RepeatRide.png'

const Main = ({showSignup}) => {
    
    const videoRef=useRef(null);
    const divRef=useRef(null);

    const [playback,setPlayback]=useState(1.0);
    const[position,setPosition]=useState(null);

    const calculatePosition = (ev) => {
      const rect = divRef.current.getBoundingClientRect();
      const styles = window.getComputedStyle(divRef.current);
      

      const borderLeft = parseInt(styles.borderLeftWidth, 10) || 0;
      const borderRight = parseInt(styles.borderRightWidth, 10) || 0;
      const borderTop = parseInt(styles.borderTopWidth, 10) || 0;
      const borderBottom = parseInt(styles.borderBottomWidth, 10) || 0;
  

      const transformMatrix = new DOMMatrix(styles.transform);
      const currentScale = transformMatrix.a || 1;
  
      const scaledBorderLeft = borderLeft * currentScale;
      const scaledBorderRight = borderRight * currentScale;
      const scaledBorderTop = borderTop * currentScale;
      const scaledBorderBottom = borderBottom * currentScale;
  

      const rawX = ev.clientX - rect.left;
      const rawY = ev.clientY - rect.top;
  

      const contentX = rawX - scaledBorderLeft;
      const contentY = rawY - scaledBorderTop;

      const adjustedX = contentX / currentScale;
      const adjustedY = contentY / currentScale;
  
      const maxX = (rect.width - scaledBorderLeft - scaledBorderRight) / currentScale;
      const maxY = (rect.height - scaledBorderTop - scaledBorderBottom) / currentScale;
  
      return {
        x: Math.max(0, Math.min(adjustedX, maxX)),
        y: Math.max(0, Math.min(adjustedY, maxY))
      };
    };
  const Video= ()=>{
    return (
      <div 
        className="relative w-full h-full transition  rounded-xl delay-150 duration-700 hover:scale-150 hover:-translate-y-4 "
        ref={divRef}
        onMouseEnter={() => {   
          videoRef.current.getInternalPlayer().play();
          }}
        onMouseLeave={() => {
          videoRef.current.getInternalPlayer().pause();
        }}
        onMouseDown={(ev) => {
          setPlayback(2.0);
          setPosition(calculatePosition(ev));
        }}
        onMouseUp={() => {
          setPlayback(1.0);
          setPosition(null);
        }}
      > 
                   <AnimatedDiv 
                      customclass='!w-full !h-auto flex border-none justify-center mb-5  '
                      animation={'animate-slide-right'}
                      blur={'blur-md'}
                      opacity={'opacity-0'}
                      delay={'animation-delay-100'}
                   >
                        <label htmlFor="" className='font-bold text-white text-3xl text-center  animate-slide-right  '>Friendly environment </label>
            </AnimatedDiv>  
        <ReactPlayer
          url="/Video.mp4"
          width="100%"
          height="100%"
          controls={false}
          playing={false}
          muted={true} 
          ref={videoRef}
          playbackRate={playback}
        />
        
        {position && (
          <FontAwesomeIcon
            icon={faFastForward}
            style={{
              position: 'absolute',
              left: position.x,
              top: position.y,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
            color="red"
            size="2x"
          />
        )}
      </div>
    );
  };


  
    
return (

<div className='bg-[#131316] w-screen min-h-screen'>

      <div className=' h-screen mr-10 ml-5 mt-10'>
            <div className='grid grid-cols-2 h-screen'>
                <div className='flex items-center justify-center '>
                    <div className='ml-5 h-1/2  mt-5 justify-center items-center'>
                        <p className='text-white font-bold font-sans text-5xl '> Free to go anywhere  with  </p><br />
                        <p className='text-white font-bold font-sans text-5xl'> Swift </p><br />
                        <p className='text-white font-semibold font-sans text-xl '> just order and hop in </p>
                        <span className='w-full h-1/2 flex justify-center items-center '>
                            <button 
                                className="text-white  text-xl font-bold 
                                py-2 px-4 rounded-lg w-[300px] h-[100px]
                                transition delay-50 
                                duration-700 ease-in-out hover:-translate-y-2
                                hover:scale-150 " 
                                style={{background:' linear-gradient(to right, #3b82f6, #60a5fa, #d1d5db)'}}
                                onClick={showSignup}
                                >
                               <p>
                               Let's get started
                              </p>
                        </button>
                        </span>
                    </div>
                
                </div>

                <div className='  flex items-center justify-center '>
                    <div 
                      className='flex w-[700px] h-[600px] rounded
                      justify-center items-center bg-cover bg-center '
                      style={{backgroundImage:`url(${TaxiImage})`}}
                    />
                </div>
        </div>     

      </div>
      <div className='h-[400px]'/>
      <div className=' bg-[#131316]  w-screen h-screen'>
       <div className='flex justify-center items-center h-[700px] w-full mt-10 ' >
       <div className='flex flex-col justify-center items-center w-auto  '> 
         <AnimatedDiv
            customclass={'h-[500px] w-full border-none'}
            animation={'animate-slide-right'}
            blur={''}
            opacity={'opacity-100'}
        >
          {Video()}
          </AnimatedDiv>
       </div>
       
       </div>
      </div>
      <div className='h-[400px]'/>
      <div className=' bg-[#131316]w-screen h-screen'>
       <div className='flex justify-between h-[400px] w-screen mt-10 ' >
        <div className='flex flex-row justify-center items-center space-x-20 h-[650px] w-full transition-all duration-500 transform-gpu   '> 
          <div className='w-[500px] h-[600px] transition delay-150 duration-700 hover:scale-125'>
                   <AnimatedDiv 
                      customclass='!w-full !h-auto flex border-none justify-center mb-5'
                      animation={'animate-slide-right'}
                      blur={'blur-md'}
                      opacity={'opacity-0'}
                      delay={'animation-delay-100'}
                   >
                        <label htmlFor="" className='font-bold text-white text-3xl text-center  animate-slide-right '>We always remember your favorite Location</label>
                  </AnimatedDiv>    

                  <AnimatedDiv
                    customclass={'h-[500px]  w-[570px]  bg-cover bg-center rounded-xl '}
                    animation={'animate-slide-right'} 
                    delay={'animation-delay-100'}
                    blur={'blur-md'}
                    opacity={'opacity-0'}
                    style={{backgroundImage:`url(${FavoriteLocation})`}}
                  />
          </div>
          <div className='w-[200px]'>

          </div>
          <div className='w-[500px] min-h-[500px] flex flex-col space-y-5 transition delay-150 duration-700 hover:scale-125'>
                  <AnimatedDiv 
                    customclass='!w-[600px] !h-[50px]  flex justify-center  items-center mb-5 border-none'
                    animation={'animate-slide-right'}
                    blur={'blur-xl'}
                    opacity={'opacity-0'}
                    delay={'animation-delay-200'}
                  >
                  <label htmlFor="" className='font-bold text-white text-3xl   animate-slide-right '>Do not Type just choose</label>
                 </AnimatedDiv>   
           <AnimatedDiv
              customclass={'h-[500px]  w-[630px] bg-red-600 bg-center bg-cover rounded-xl '}
              animation={'animate-slide-right'}
              delay={'animation-delay-200'}
              blur={'blur-xl'}
              opacity={'opacity-0'}
              style={{backgroundImage:`url(${RepeatRide})`}}
          />          
          </div>
           

        </div>
       </div>
      </div>
    </div>
  )
}

export default Main