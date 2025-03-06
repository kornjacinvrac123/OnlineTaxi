
import axios from "axios"
import { areFieldsFilled } from "./addCardHandleFunctions"

export const handleEditUser= async(nameRef,surnameRef,usernameRef,passwordRef,emailRef,setDisabledButton,userData,setResponse,setStatus,setError,showUserPanel)=> {
    if(areFieldsFilled(nameRef,surnameRef,usernameRef,passwordRef,emailRef)){
        setDisabledButton(false);
        axios.post(('http://localhost/onlineTaxi/users/usersEdit.php'),{
            id:userData.id,
            name:userData.name,
            surname:userData.surname,
            username: userData.username,
            email: userData.email,
            password: userData.password
        })
        .then(response=>{
            // console.log('Edit user info ',response.data);
            setResponse(response.data.message);
            setStatus(response.data.status);
        })
        .catch(error=>{
            // console.log('Edit user error ',error);
            setError(error);
        })
        setTimeout(()=>showUserPanel(),500);
    }
    else setDisabledButton(true);

}