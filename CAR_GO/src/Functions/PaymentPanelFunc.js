import axios from "axios";
export const handleCardPanel=(setShowPayment,setShowCard)=>{
 setShowPayment(false);
 setShowCard(true);
}
export const handleCardShow=()=>{
  setShowPayment(true);
  setShowCard(false);
}

export const handlePayCard = (setStatus,setError,userId)=>{
   axios.post(("http://localhost/onlineTaxi/card/cardFind.php"),{
    userId:userId,
   })
   .then(response=>{
      // console.log('Response from Card Find',response);
    setStatus(response.data.status);
   })
   .catch(error=>{
    setError(error);
   })
}
export const handleInfoCircle=(setThisPanel,setOtherPanel,setEditSaveButton)=>{
   setThisPanel(false);
   setOtherPanel(true);
   setEditSaveButton(true);

}