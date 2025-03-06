import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import useStore from "./useStore";

// faXmark meaning to shut down everything
export const handleClick = (bars, setBars, setHidden, setShowUserDiv,setPaymentPanel,setShowSaveChange) => () => {
  if (bars === faBars) {
    setHidden(false);
    setShowSaveChange(true);
    setBars(faXmark);
  } else if (bars === faXmark) {
    setHidden(true);
    setShowUserDiv(false);
    setPaymentPanel(false);
    setBars(faBars);
  }
};




//Enabling other panels 
export const handleOtherPanels = (setShowSaveChange,setPanel, setHidden) => () => {
    setPanel(true);
    setHidden(true);
    setShowSaveChange(true);
};

//Function that implements readonly userDiv component   
export const handleUserDiv_Readonly = (showUserDiv,setShowUserDiv, setHidden,setShowSaveChange)=>()=> {
    if(showUserDiv===false)setShowUserDiv(true);
    else setShowUserDiv(false);
    setHidden(true);
    setShowSaveChange(false);
    return false;
};

export const handleSaveChanges = (setShowUserDiv, setHidden) => () => {
  setShowUserDiv(false);
  setHidden(false);
};
//variable that stores two lambda methods setUser and field, value 
// redefining setUser so it can change only chosen field and rest will copy
export const handleUserChange = (setUser) => (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,//3 dots means to copy old data
      [field]: value,//[whatTOchange] : theChange
    }));
  };
export const handleAllPanels=(setThis,setOther)=>{
  setThis(false);
  setOther(true);
} 
  
// Nominatim OpenStreetMap API  handler function

export const handleStartEndLocation = (location,setRoute,setError)=>{
  axios.get(
   `https://nominatim.openstreetmap.org/search?format=json&q=${location.value},Belgrade,Serbia`,
 )
 .then(response=>{
  //  console.log('Route data is ', response.data);
   if(response.data.length>0){
     const {lat,lon} = response.data[0];
     if(lat && lon)
      // lng:lon is needed for using it without conversion in map component
     setRoute({lat,lng:lon});
    else{
      setRoute(null);
      setError('Could not read Location');
      // console.log(lat,lon);
    }
   }
   else {
    setRoute(null);
    setError('Location could not be found');
   }
 })
 .catch(error => {
  //  console.log('Error is ', error);
   setError(error);
 })

}

export const handleShowModal=(setThisPanel,setOtherPanel)=>{
  setThisPanel(false);
  setOtherPanel(true);

}
export const exit=(setShowButtonCar,setDisabled,setRoute,setStart,currLoc,status,response,setEndRoute,setEnd,setAddCard)=>{
  if(currLoc === ''){
    setRoute(null);
  }
  else {
    setRoute(currLoc);
  }
  if (status === 'Success') {
    setStart(response); 
  } else {
    setStart(null); 
  }

  setShowButtonCar(false);
  setDisabled(true);
  setEndRoute(null);
  setEnd(null);
  setAddCard(false);

}

export const AddServiceHistory = (UserId,StartLocation,EndLocation,RoadLength,Price,setStatus,setError)=>{
  axios
  .post(('http://localhost/onlineTaxi/ServiceHistory/ServiceHistoryAdd.php'),{
    UserId:UserId,
    StartLocation:StartLocation,
    EndLocation:EndLocation,
    RoadLength:RoadLength,
    Price:Price,
  })
  .then(response=>{
    // console.log('Service History response ',response);
    setStatus(response.data.status);
  })
  .catch(error=>{
    // console.log('Service History error: ',error);
    setError(error);
  })
}
export const handleEditOrAdd=(start,end,globalData,setJustEdit)=>{
  const isEdit=globalData.some((item)=>{
    return(
      item.StartLocation.trim().toLowerCase() === start.trim().toLowerCase() &&
      item.EndLocation.trim().toLowerCase() === end.trim().toLowerCase()
    ); 
  });
  setJustEdit(isEdit);
}