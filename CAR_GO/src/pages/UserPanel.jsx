
import userImage from '../images/user.png';
import { forwardRef, useState } from 'react'
import { useNavigate } from 'react-router';
import Button from '../UI/Button';
import PaymentPanel from './PaymentPanel';
import FavoriteCar from './FavoriteCar';
import FavoriteLocation from './FavoriteLocation';
import ServiceHistory from './ServiceHistory';


const UserPanel = forwardRef(({handleOtherPanels,userId,handleClick,handleServiceHistory},ref) => {

      const navigate=useNavigate();
      const[showUserPanel,setShowUserPanel]=useState(true);
      const[showPaymentPanel,setShowPaymentPanel]=useState(false);
      const[showCar,setShowCar]=useState(false);
      const[showLocation,setShowLocation]=useState(false);
      const[showServiceHistory,setShowServiceHistory]=useState(false);
      const[showModal,setShowModal]=useState(false);


      const handleUserPanels = (setThisPanel,setOtherPanel)  => {
        setThisPanel(false);
        setOtherPanel(true);
      }
      const exit=(setThisPanel,setOtherPanel)=>{
        setThisPanel(false);
        setOtherPanel(false);
      }

  return (
    <>
    {showUserPanel &&
    <div className="grid grid-cols-1 grid-rows-2  h-screen w-[500px] bg-gray-900/50 animate-fadeIn p-[clamp(1rem,5vw,3rem)] transform origin-top transition-all duration-300 scale-[clamp(0.8,100vw/1920,1)] md:scale-100">
        <button 
          className="w-[100px] h-[100px] rounded-full bg-center bg-cover "
          style={{ backgroundImage: `url(${userImage})` }} 
          onClick={handleOtherPanels} 
          ref={ref}
        />
      <div className="flex flex-col justify-center space-y-10 ">
      {/* <Button text={"Success Modal"} onBtnClick={()=>handleUserPanels(setShowUserPanel,setShowModal)}/> */}
        <Button 
          text={"Service history"} 
          onBtnClick={()=>handleUserPanels(setShowUserPanel,setShowServiceHistory)}
          customClass={'bg-green-500 border-none h-auto font-bold text-2xl hover:bg-green-600'}
        />
        <Button 
          text={"Favorite address"} 
          onBtnClick={()=>handleUserPanels(setShowUserPanel,setShowLocation)}
          customClass={'bg-green-500 border-none h-auto font-bold text-2xl hover:bg-green-600'}
        />
        <Button 
          text={"Payment methods"} 
          onBtnClick={()=>handleUserPanels(setShowUserPanel,setShowPaymentPanel)}
          customClass={'bg-green-500 border-none h-auto font-bold text-2xl hover:bg-green-600'}
        />
        <Button 
          text={"Logout"} 
          onBtnClick={()=>{navigate('/FrontPage',{replace:true})}}
          customClass={'bg-black border-none h-auto font-bold text-2xl  hover:bg-red-600'}
        />
      </div>
    </div>}
    {showUserPanel === false && showPaymentPanel && 
        (<PaymentPanel 
            showUserPanel={()=>handleUserPanels(setShowPaymentPanel,setShowUserPanel)}   
            userId={userId}
        />)
    }
    {showUserPanel === false && showCar && <FavoriteCar/>}
    {showUserPanel === false && showLocation && 
        (<FavoriteLocation 
            userId={userId}
            showUserPanel={()=>handleUserPanels(setShowLocation,setShowUserPanel)}
        />)
    }
    {showUserPanel === false && showServiceHistory && 
          (<ServiceHistory
              showDashboard={()=>{handleClick();exit(setShowServiceHistory,setShowUserPanel)}}
              showUserPanel={()=>{setShowServiceHistory(false);setShowUserPanel(true)}}
              UserId={userId}
              handleTable={handleServiceHistory}
          />)
      }
   {/* {showUserPanel === false && showModal && <SuccessModal/>} */}
    </>
  );
});
export default UserPanel;