

import axios from "axios"
import { areFieldsFilled } from "./addCardHandleFunctions";


export const FindLocation = (id,setResponse,setStatus,setError) => {
     axios
     .post(('http://localhost/onlineTaxi/address/addressFind.php'),{
       id:id,
     })
     .then(response=>{
      // console.log('Reponse from Find php is ',response);
      setStatus(response.data.status);
      setResponse(response.data.message);
     })
     .catch(error=>{
        // console.log('Error is ',error);
        setError(error);
     })
}
export const EditLocation = (id,FavoriteAddress,setStatus,setError,textRef,setDisable)=>{
    if(areFieldsFilled(textRef))
    {
        setDisable(false);
        axios
        .post(('http://localhost/onlineTaxi/address/addressEdit.php'),{
          id:id,
          FavoriteAddress:FavoriteAddress,
        })
        .then(response=>{  
        //   console.log('Response is ',response);
          setStatus(response.data.status);
        })
        .catch(error=>{
            console.log('Error is ',error);
            setError(error);
        })
    }
    else setDisable(true)
}