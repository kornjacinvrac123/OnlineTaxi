import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { faBars, faBug } from '@fortawesome/free-solid-svg-icons';
import UserPanel from './UserPanel';
import {UserDiv} from '../pages/UserDiv';
import {handleClick,handleOtherPanels, handleSaveChanges,handleUserChange,handleUserDiv_Readonly,
  handleStartEndLocation,handleAllPanels,handleShowModal,exit,AddServiceHistory,handleEditOrAdd
} from "../Functions/dashboardHandleFunctions"; // Importing functions
import UserNavBar from './UserNavBar';
import Map from '../component/Map';
import IText from '../UI/IText';
import Button from '../UI/Button';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpDownLeftRight,faXmark } from "@fortawesome/free-solid-svg-icons";
import FavoriteCar from './FavoriteCar';
import { areFieldsFilled } from '../Functions/addCardHandleFunctions';
import useStore from '../Functions/useStore';
import {FindLocation} from '../Functions/FavoriteLocationHandleFunctions'
import CheckoutModal from '../component/CheckoutModal';
import SuccessModal from '../component/SuccessModal';
import QuestionModal from '../component/QuestionModal';
// import {EditServiceHistory} from '../Functions/ServiceHistoryHandlers'



                                  // DISCLAIMER //
// For some reason when we switch accounts from one to another map draws last  polyline route from
// previous users at the moment of loading the dashBoard, so it is possible to have this bug 
// I think it is because of cash maybe, so we need to use enforce using php server on FIRST loading....
                                  ///////////////


const Dashboard = () => {


    const navigate = useNavigate();
    const location = useLocation();
    const{isLoggIn,userData}=location.state || {};
    const[bars,setBars]=useState(faBars);
    const[hidden,setHidden]=useState(true);
    const[showUserDiv,setShowUserDiv]=useState(false);
    const[showPayment,setShowPayment]=useState(false);
    const[showSaveChange,setShowSaveChange]=useState(true);
    const[showCar,setShowCar]=useState(false);
    const[showDirection,setShowDirection]=useState(true);
    const[showButtonCar,setShowButtonCar]=useState(false);
    const[response,setResponse]=useState('');
    const[status,setStatus]=useState('');
    const[serviceHistoryStatus,setServiceHistoryStatus]=useState('');
    const[locationError,setLocationError]=useState();
    const[color,setColor]=useState('red');
    // const[editOrAdd,setEditOrAdd]=useState('');
    // const[errorEditOrAdd,setErrorEditOrAdd]=useState('');
    const setAddCard=useStore((state)=>state.setAddCard);
    const FavoriteLocationGlobal = useStore((state)=>state.addLocation);
    const[showModal,setShowModal]=useState(false);
    const globalPrice=useStore((state)=>state.price);
    const paymentMethod=useStore((state)=>state.paymentMethod);
    const distance=useStore((state)=>state.distance);
    const repeatRoute=useStore((state)=>state.repeatRoute);
    const setRepeatRoute=useStore((state)=>state.setRepeatRoute);
    const repeatData=useStore((state)=>state.repeatData);
    const setRepeatData=useStore((state)=>state.setRepeatData);
    const editStatus=useStore((state)=>state.editStatus);
    const[clicked,setClicked]=useState(false);
    const destinationRef=useRef(null);
  //   const setEditStatus=useStore((state)=>state.setEditStatus);
  //   const serviceData = useStore((state)=>state.serviceData);   
  //  const setJustEdit=useStore((state)=>state.setJustEdit);
  //  const justEdit=useStore((state)=>state.justEdit);
    const[showSuccess,setShowSuccess]=useState(false);
    // const[showAddCard,setShowAddCard]=useState(false);
    const logoRef=useRef(null);
    const startRef=useRef(null);
    const endRef=useRef(null);
    const[refresh,setRefresh]=useState(null);
    const [start, setStart] = useState(null); 
    const [end, setEnd] = useState(null);
    const[route,setRoute] = useState(null);
    const[endRoute,setEndRoute]=useState(null);
    const[error,setError]=useState(null);
    const[disabled,setDisabled]=useState(true);
    const[currLoc,setCurrLoc]=useState('');
    const [user, setUser] = useState({
      id:userData.id,
      name:userData.name,
      surname:userData.surname,
      username: userData.username,
      email: userData.email,
      password: userData.password
    }); 
   const onUserTextChange=handleUserChange(setUser);  
   
   const isSaveChangeVisible = handleUserDiv_Readonly(showUserDiv,setShowUserDiv,setHidden,setShowSaveChange);


  useEffect(()=>{
    const FetchData = async()=>{
      await FindLocation(user.id,setResponse,setStatus,setLocationError);
    }
    FetchData();
  },[FavoriteLocationGlobal])
 
  useEffect(()=>{
    if(status === 'Success'){
      setStart(response);
      setRefresh(response);
      handleStartEndLocation({value:response},setRoute,setError);
      handleStartEndLocation({value:response},setCurrLoc,setError);
    }
    else {
      setStart(null);
      setEnd(null);
    }
  },[response,status]);

  useEffect(()=>{
    if(editStatus === true){
        handleStartEndLocation({value:repeatData.StartLocation},setRoute,setError);
        handleStartEndLocation({value:repeatData.EndLocation},setEndRoute,setError);
        setColor('green');
    }
  },[repeatData,editStatus]);

  useEffect(()=>{
  if(areFieldsFilled(startRef,endRef)){
    setDisabled(false);
    if(clicked){
      setTimeout(()=>destinationRef.current.innerText='Choose car',500);
      setTimeout(()=>handleAllPanels(setShowDirection,setShowCar),1500) 
    }
  }
  else {
    setDisabled(true);
    setShowButtonCar(false);
    setClicked(false);
  }
 },[start,end,clicked]);
  return (
    <>
        <UserNavBar 
          key={bars}
          bars={bars} 
          handleClick={handleClick(bars,setBars,setHidden,setShowUserDiv,setShowPayment,setShowSaveChange)}
          ClickForReadOnly={isSaveChangeVisible} 
          name={user.name}
        />
        <div className='absolute z-50 left-0 top-14'>

              { hidden!=true && 
              (<UserPanel 
                handleOtherPanels={()=>handleOtherPanels(setShowSaveChange,setShowUserDiv,setHidden)()} 
                ref={logoRef} 
                userId={user.id}
                handleClick={handleClick(bars,setBars,setHidden,setShowUserDiv,setShowPayment,setShowSaveChange)}
                handleServiceHistory={()=>handleAllPanels(setShowDirection,setRepeatRoute)}
               />)
              }
              
              { hidden === true && showUserDiv === true && 
                (<UserDiv 
                  userId={user.id}
                  userData={user} 
                  onTextChange={onUserTextChange} 
                  onSaveChanges={handleSaveChanges(setShowUserDiv, setHidden)}
                  isSaveChangeVisible={showSaveChange} 
                  showUserPanel={()=>{setHidden(false);setShowUserDiv(false);}}          
                />)
              }

         </div>       
          <div className='flex flex-col h-screen'>
                <div className='relative  z-0 w-screen h-screen '>
                  <Map 
                      start={route} 
                      end={endRoute} 
                      key={`${route}-${endRoute}-${color}`} 
                      color={color}
                  />
                </div>
            { showDirection && 
            <Draggable>
            <form
                action=""
                onSubmit={(e)=>{
                e.preventDefault(); 
                if(areFieldsFilled(startRef,endRef)){
                  setDisabled(false);
                  // setTimeout(()=>setShowButtonCar(true),1500);
                  handleStartEndLocation({value:start},setRoute,setError);
                  handleStartEndLocation({value:end},setEndRoute,setError);
                }
                else {
                  setDisabled(true);
                  setShowButtonCar(false);
                }
                } 
              }
              className='absolute top-1/3 left-1/2 border-4 border-white rounded-xl animate-fadeIn transform -translate-x-1/2 h-auto z-50 justify-center items-center  w-[350px]'>
                  <div className=' bg-gray-900/50  flex flex-col justify-center items-center h-auto rounded-xl animate-fadeIn w-auto'>
                     
                     <div className='flex flex-row justify-start'>

                      <label 
                        htmlFor="" 
                        className='font-bold text-2xl font-sans text-white mx-5 mt-5 mb-5'
                      >Hello
                      </label>
                     </div>
                     <div className='flex flex-col justify-center items-center space-y-5 w-auto h-auto'>
                      <IText 
                          customPlaceHolder='Enter start location'
                          key={refresh} 
                          ref={startRef} 
                          customClass='max-w-[300px] bg-white text-black font-sans' 
                          customValue={start} 
                          onTextChange={(e)=>setStart(e.target.value)}
                      />
                        <IText 
                          customPlaceHolder='Enter end location'  
                          ref={endRef}
                          customClass='max-w-[300px] bg-white text-black font-sans'
                          customValue={end}
                          onTextChange={(e)=>setEnd(e.target.value)}
                        />     
                        <Button 
                          text='Set destination'  
                          ref={destinationRef}
                          customClass={`text-2xl font-bold border-none  font-sans max-w-[300px] w-full h-[70px]
                          ${disabled ? 'pointer-events-none' : 'hover:bg-green-400' }
                          ${clicked ? 'bg-green-400 hover:bg-green-400':''}
                          
                          `}

                          onBtnClick={()=>setClicked(true)}
                          disabled={disabled}
                        />
                     </div>
                     <br />
                    {/* Let's leave it here but it is not longer used i changed it so it will be more automatic */}

                      {/* <div className='animate-fadeIn w-full  flex justify-end '>
                        {showButtonCar && 
                        (<Button 
                            text="Choose car" 
                            customClass='font-bold bg-red-600 border-none hover:bg-red-700 mb-5 mr-5' 
                            disabled={disabled} 
                            onBtnClick={()=>{
                              handleAllPanels(setShowDirection,setShowCar);
                              // Some idea that is not very well i guess
                              // handleEditOrAdd(start,end,serviceData,setJustEdit);
                            }}
                        />)}
                      </div> */}
                  </div>
            </form>
            </Draggable>}
            {showDirection=== false && showCar && (
            <Draggable>
              <div className='absolute top-1/3 left-1/2 transform -translate-x-1/2 z-50 justify-center items-center w-auto h-auto  rounded-xl'>
                <div className='flex justify-end w-auto h-auto'>
                  <button onClick={()=>
                  {
                    exit(setShowButtonCar,setDisabled,setRoute,setStart,currLoc,status,response,setEndRoute,setEnd,setAddCard);
                    handleAllPanels(setShowCar,setShowDirection)
                  }}>
                  <FontAwesomeIcon icon={faXmark} size='2x' />
                  </button>
                </div>
                  <FavoriteCar 
                    userId={user.id} 
                    showModal={()=>handleShowModal(setShowCar,setShowModal)}
                  />
                </div>
            </Draggable>
          )}
          {showDirection === false && showCar === false && showModal && (
            <Draggable>
                <div className='absolute top-1/3 left-1/2 transform -translate-x-1/2 z-50 justify-center items-center'>
                  <CheckoutModal
                    start={start}
                    end={end}
                    price={globalPrice}
                    pay={paymentMethod}
                    showModal={()=>{
                      handleShowModal(setShowModal,setShowSuccess);
                      setColor('green'); 
                      // justEdit  
                      // ? EditServiceHistory('edit',repeatData,setEditOrAdd,setErrorEditOrAdd)
                      AddServiceHistory(user.id,start,end,parseFloat((distance/1000).toFixed(1)),globalPrice,setServiceHistoryStatus,setError);
                     }
                    }
                    exit={()=>{
                      exit(setShowButtonCar,setDisabled,setRoute,setStart,currLoc,status,response,setEndRoute,setEnd,setAddCard);
                      handleAllPanels(setShowModal,setShowDirection);
                    }}
                  />
                </div>
            </Draggable>
          )
          
          }
          {showDirection=== false && showCar === false && showModal === false && showSuccess && (
            <Draggable>
              <div className='absolute top-1/3 left-1/2 transform -translate-x-1/2 z-50 justify-center items-center'>
               <SuccessModal
                exit={()=>{
                  exit(setShowButtonCar,setDisabled,setRoute,setStart,currLoc,status,response,setEndRoute,setEnd,setAddCard);
                  handleAllPanels(setShowSuccess,setShowDirection);
                }}
               />
              </div>
             </Draggable>
          ) }

          {showDirection === false && repeatRoute === true && (
            <Draggable>
              <div className='absolute top-1/3 left-1/2 transform -translate-x-1/2 z-50 justify-center items-center'>
                 <QuestionModal
                  exit={()=>{
                    exit(setShowButtonCar,setDisabled,setRoute,setStart,currLoc,status,response,setEndRoute,setEnd,setAddCard);
                    handleAllPanels(setRepeatRoute,setShowDirection);
                  }}
                  apply={()=>{
                    handleShowModal(setRepeatRoute,setShowSuccess);
                  }}
                 />
              </div>
          </Draggable>
          )}
        </div>
  
      
            
    </>
  )
}

export default Dashboard