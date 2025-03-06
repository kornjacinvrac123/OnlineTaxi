import axios from 'axios'

export function fillTheBlanks(ref1,ref2){
  if(!ref1.current.value.trim() || !ref2.current.value.trim())return false;
  return true;
}

export const handleLoginSubmit = async (setDisabledButton,setStatus,setResponse,setError,username,password,passwordRef,usernameRef) => {
  if(fillTheBlanks(passwordRef,usernameRef)){
    // setDisabledButton(false);
    axios.post(("http://localhost/onlineTaxi/users/usersFind.php"), {
      username: username,
      password: password,
    })
    .then(response=>{
      setStatus(response.data.status);
      setResponse(response.data.message);
    })
    .catch(error => {
      if (error.response) {
        // console.log("Errs >= 400", error.response.data);
        // console.log("Err status", error.response.status);
        setError(error.response.data.message); 
      } else if (error.request) {
        // console.log("Server is not working at all:  ", error.request);
        // setError("Server is not working");
      } else {
        // console.log("General err:", error.message);
      }
    })
  } 
  // else  setDisabledButton(true);
};
export const ShowOnClick=(Eye,setEye,faEye,faEyeSlash,passwordRef)=>{
  if(Eye === faEye){
    passwordRef.current.type="password";
    setEye(faEyeSlash);
  }
  else if(Eye === faEyeSlash){
    passwordRef.current.type="text";
    setEye(faEye);
  }
}