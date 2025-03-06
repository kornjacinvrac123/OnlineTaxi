
import axios from "axios"


export const FindServiceHistory=(setStatus,setResponse,setError,UserId)=>{
  axios.
  post(('http://localhost/onlineTaxi/ServiceHistory/ServiceHistoryFind.php'),{
    UserId:UserId,
  })
  .then(response=>{
    //  console.log("Service History find response",response);
    setStatus(response.data.status);
    setResponse(response.data.message);
  })
  .catch(error=>{
    // console.log("Service History find error",error);
    setError(error);
  })
}

export const EditServiceHistory=(action,data,setStatus,setError)=>{
  axios
  .post(('http://localhost/onlineTaxi/ServiceHistory/ServiceHistoryEdit.php'),{
    id:data.id,
    UserId:data.UserId,
    StartLocation:data.StartLocation,
    EndLocation:data.EndLocation,
    RoadLength:data.RoadLength,
    Price:data.Price,
    action:action,
  })
  .then(response=>{
    // console.log("Service History edit response",response);
    setStatus(response.data.status);
  })
  .catch(error=>{
    // console.log("Service History edit error",error);
    setError(error);
  })
}