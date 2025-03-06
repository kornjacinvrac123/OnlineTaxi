import axios from "axios";
export function fillTheBlanks(ref1,ref2,ref3,ref4,ref5){
    if(!ref1.current.value.trim() || !ref2.current.value.trim()
        || !ref3.current.value.trim()|| !ref4.current.value.trim()
    || !ref5.current.value.trim())return false;
    return true;
  }
export function passwdCorr(passwd){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;   
    return passwordRegex.test(passwd) && passwd.length >= 6;
}
export const HandleSubmit = async(passwordRef,nameRef,usernameRef,surnameRef,emailRef,setError,setDisabledButton,
  name,surname,username,password,email,setData,setStatus
)=>{
 
    if(fillTheBlanks(passwordRef,nameRef,usernameRef,surnameRef,emailRef)){
      if(passwdCorr(passwordRef.current.value)){
        setError("");
        axios.post(("http://localhost/onlineTaxi/users/usersAdd.php"),{
          name:name,
          surname:surname,
          username:username,
          password:password,
          email:email,
        })
        .then(response=>{
          console.log("Usao sam u response ",response.data.message);
          setData(response.data.message);
          setStatus(response.data.status);
        })
        .catch(error =>{
          setError(error);
        })
      }
      else {
        setData("Weak password");
        setStatus('Error');
      }
    }
}