
import Button from'../UI/Button';
import IText from '../UI/IText';
import standardCar from '/home/zix/Documents/5semestar/PVAP/CAR_GO/public/standard.png'
import economicCar from '/home/zix/Documents/5semestar/PVAP/CAR_GO/public/economic.png'
import luxCar from '/home/zix/Documents/5semestar/PVAP/CAR_GO/public/lux.png'
import { useEffect, useState,useRef,forwardRef } from "react"
import { useNavigate } from 'react-router';
import PaymentPanel from './PaymentPanel';
import useStore from '../Functions/useStore';
import AddCard from './AddCard';

const FavoriteCar = ({userId,showModal}) => {

  const [selectedCar, setSelectedCar] = useState('economic');
  const[panel,setPanel]=useState(false);
  const[panel2,setPanel2]=useState(true);
  const[disable,setDisable]=useState(true);
  const distance = useStore((state) => state.distance);
  const duration = useStore((state) => state.duration);
  const setGlobalPrice=useStore((state)=>state.setPrice);
  const[price,setPrice]=useState(distance < 20000 ? Math.round((distance/1000)*2): Math.round((distance/1000)*1));
  const ecoRef=useRef(null);
  const standRef=useRef(null);
  const luxRef=useRef(null);
  const [clicked,setClicked]=useState(false);
  const render=useStore((state)=>state.render);
  // const setAddCard=useStore((state)=>state.setAddCard);

  const handleCarChange = (event) => {
    setSelectedCar(event.target.value);
  };
  const addCard= useStore((state)=>state.addCard);

  const handleDirectionShow=(setThis,setOther)=>{
    setThis(prev => !prev);
    setOther(prev => !prev);
  }
  useEffect(()=>console.log('Set render je : ',render),[render]);
 // not very gently but useful it works
  useEffect(()=>{
    // console.log('Selected is : ',selectedCar);
    if(selectedCar === 'economic'){
    ecoRef.current.style.backgroundColor='#4ade80';
    setPrice(distance < 20000 ? Math.round((distance/1000)*2): Math.round((distance/1000)*1));

  }
  else ecoRef.current.style.backgroundColor='white';
    if(selectedCar === 'standard'){
      standRef.current.style.backgroundColor='#4ade80';
      setPrice(distance < 20000 ? Math.round((distance/1000)*3): Math.round((distance/1000)*1.5));

    }
    else standRef.current.style.backgroundColor='white';
    if(selectedCar === 'lux'){
      luxRef.current.style.backgroundColor='#4ade80';
      setPrice(distance < 20000 ? Math.round((distance/1000)*5): Math.round((distance/1000)*2));

    }
    else luxRef.current.style.backgroundColor='white';
  },[selectedCar]);
  useEffect(()=>{setGlobalPrice(price)},[price]);
  
  useEffect(()=>{
   if(selectedCar!='')setDisable(false);
   else {
    setDisable(true);
    setClicked(false);
   }
  },[selectedCar]);

  useEffect(()=>{
    if(clicked){
     handleDirectionShow(setPanel2,setPanel);
     setClicked(false);
    }


  },[clicked]);

  return (
    <>
    {panel2 &&(
    <div className="grid  bg-gray-900/50 rounded-xl grid-rows-[auto,1fr] h-auto w-auto animate-fadeIn p-[clamp(1rem,5vw,3rem)]
     transform origin-top transition-all duration-300 scale-[clamp(0.8,100vw/1920,1)] md:scale-100">
    <div className='flex flex-row justify-between space-x-5 w-[400px]'>
        <label className="w-full rounded-xxl">
          <input
            type="radio"
            name="carType"
            value='economic'
            defaultChecked={selectedCar === 'economic'}
            onChange={handleCarChange}
            className="hidden" 
          />
         {/* Dynamic changes in tailwind do not work very well for some reason so i Used refs */}
         {/* example : ${selectedCar === 'economic' ? 'bg-[#4ade80]' : 'bg-[white]'} */}
          <div ref={ecoRef} className={` rounded-xl w-full h-[150px] bg-white hover:bg-green-400 flex flex-col items-center justify-center cursor-pointer`}>
            <p className="text-black">{Math.round(duration/60)+3} minutes</p>
            <span className='h-[50px] w-[50px] block bg-cover bg-center' style={{ backgroundImage: `url(${economicCar})` }} />
            <p className="text-black font-bold">eco</p>
            <p className="text-black">{distance < 20000 ? Math.round((distance/1000)*2): Math.round((distance/1000)*1)} EUR</p>
          </div>
        </label>

   
        <label className="w-full">
          <input
            type="radio"
            name="carType"
            value='standard'
            checked={selectedCar === 'standard'}
            onChange={handleCarChange}
            className="hidden" 
          />
          <div ref={standRef}className={`rounded-xl w-full h-[150px] bg-white hover:bg-green-400 flex flex-col items-center justify-center cursor-pointer `}>
            <p className="text-black">{Math.round(duration/60)+2} minutes</p>
            <span className='h-[50px] w-[50px] block bg-cover bg-center' style={{ backgroundImage: `url(${standardCar})` }} />
            <p className="text-black font-bold">standard</p>
            <p className="text-black">{distance < 20000 ? Math.round((distance/1000)*3): Math.round((distance/1000)*1.5)} EUR</p>
          </div>
        </label>

  
        <label className="w-full">
          <input
            type="radio"
            name="carType"
            value='lux'
            checked={selectedCar === 'lux'}
            onChange={handleCarChange}
            className="hidden" 
          />
          <div ref={luxRef} className={` rounded-xl w-full h-[150px] bg-white hover:bg-green-400 flex flex-col items-center justify-center cursor-pointer `}>
            <p className="text-black">{Math.round(duration/60)+1} minutes</p>
            <span className='h-[50px] w-[50px] block bg-cover bg-center' style={{ backgroundImage: `url(${luxCar})` }} />
            <p className="text-black font-bold">biz</p>
            <p className="text-black">{distance < 20000 ? Math.round((distance/1000)*5): Math.round((distance/1000)*2)} EUR </p>
          </div>
        </label>
      </div>

      <div className=' flex flex-col justify-normal w-full space-y-5 mt-5'>
      {/* <Button 
        text={'Payment method'} 
        onBtnClick={()=>{setDisable(false);handleDirectionShow(setPanel2,setPanel);
        }} /> */}
      <Button 
        text="Let's go" 
        disable={disable} 
        customClass={`text-3xl font-bold w-full h-[70px] border-none bg-green-400 ${disable ? 'pointer-events-none' : 'hover:bg-green-500'}`}
        onBtnClick={()=>{
          // showModal();
          setClicked(true);
        }}
      />
      </div>  
    </div>)
        }
    {panel && panel2 === false && 
        (
       <div className='w-auto h-auto rounded-lg'>
            <div className='w-auto h-auto  border-white rounded-xl  bg-gray-900/50 animate-fadeIn'>
              <PaymentPanel 
                showUserPanel={()=>handleDirectionShow(setPanel,setPanel2)}
                userId={userId}
                addBtnClassEdit='flex items-center'
                customClass='!h-auto !bg-transparent rounded-xl' 
                handlePlaceOfCall='FavoriteCar'
              />
              { render &&
                (
                  <div className='w-full flex justify-center items-center'>
                        <div className='flex justify-center items-center w-[400px]  h-auto  rounded-xl mb-10 animate-fadeIn'>
                            <Button
                              text={'Continue'}
                              customClass={`text-3xl font-bold w-full h-[70px] bg-green-400 hover:bg-green-500 border-none`}
                              onBtnClick={showModal}
                            />
                      </div>
                  </div>
                  
                )
              }
             <br />
            </div>
          
      </div>
       
      )
     
     }

    </>
  )
}

export default FavoriteCar