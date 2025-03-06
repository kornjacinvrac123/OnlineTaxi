import axios from 'axios'

// Functions that checks if any html tag is filled or not and give appropriate ans
export function areFieldsFilled(...refs) {
    for (let ref of refs) {
        if (!ref.current) {
            // console.log("Ref not initialized:", ref);
            return false; 
        }

        const value = ref.current.value;

        if (typeof value === "string" && value.trim() === "") {
            // console.log("Empty:", ref.current);
            return false;
        }

        if (typeof value === "undefined" || value === null) {
            // console.log("Not valid:", ref.current);
            return false;
        }
    }
    return true;
}

  // handleing submitting to the backend php server
  export const handleSubmit=(setResponse,setError,setDisabled,setStatus,userId,ref1,ref2,ref3,ref4,ref5,f,setRender)=>{
   if(areFieldsFilled(ref1,ref2,ref3,ref4,ref5)){
    //  setDisabled(false);
     axios.post(("http://localhost/onlineTaxi/card/cardAdd.php"),{
     userId:userId,
     cardNumber:ref1.current.value,
     month:ref2.current.value,
     year:ref3.current.value,
     cvv2:ref4.current.value,
     cardName:ref5.current.value,
    })
    .then(response=>{
      setResponse(response.data.message);
      setStatus(response.data.status);
      // console.log("INFO from cardADD: ",response);
    })
    .catch(error=>{
     setError(error);
    //  console.log("ERROR from cardAdd: ",error);
    })
    setTimeout(()=> {  f();
      setRender(true);
    },500);
   }
   else {
    // setDisabled(true);
    console.log("All data is mandatory");}
  }


  //Function that prohibits anything other than numbers and '-' via regex
  export const handleCardNumber = (e,setValue) => {
    let input = e.target.value.replace(/\D/g, ""); 
    const formattedInput = input.replace(/(\d{4})(?=\d)/g, "$1-");
    //...prev -> copies all other info,and we're setting just cardNum
    setValue(prev=>({
    ...prev,
    cardNumber : formattedInput||"",
    }));
  };
  export const handleCvv2= (e,setValue) => {
    let input = e.target.value.replace(/\D/g,"");
    setValue(prev=>({
    ...prev,
    cvv2:input
    }));
  }
   
 // creating option with diff values
  export function CreateOption(value){
    return <option value={value}>{value}</option>
  }
 

  //custom option tag but with years
  export const handleYears=()=>{
    const currYear=new Date().getFullYear();
    const options=[];
    for(let i = currYear;i<currYear+20;i++){
      options.push(CreateOption(i));
    }
  return options;
  }

  // custom option tag with months
 export const handleMonths=()=>{
    const options=[];
    let varr;
    for(let i = 1;i<=12;i++){
      if(i < 10){
         varr="0"+i;
      }
      else varr=i;
      options.push(CreateOption(varr));
    }
  return options;
  }
 // Fnc use same as Login and signup functionality
export const ShowOnClick=(faEye,faEyeSlash,setEye,Eye,htmlReference)=>{
  if(Eye === faEye) {
    if(htmlReference.current)htmlReference.current.type="password"; 
    setEye(faEyeSlash);
  }
  else {
    if(htmlReference.current)htmlReference.current.type="text";
     setEye(faEye);
  }

}

// handle Edit submit

export const handleEditSubmit= (value,setResponse,setStatus,setError,userId,handleCardPanel,setRender)=>{
   axios.post("http://localhost/onlineTaxi/card/cardEdit.php",{
     userId:userId,
     cardNumber:value.cardNumber,
     month:value.month,
     year:value.year,
     cvv2:value.cvv2,
     cardName:value.cardName,
   })
   .then(response=>{
    //  console.log("Response from Card edit ",response.data);
     setResponse(response.data.message);
     setStatus(response.data.status);
   })
   .catch(error=>{
    // console.log("Error from Card edit: ",error);
    setError(error);
   })
   setTimeout(()=> {  handleCardPanel();
    setRender(true);
   },500);
}
