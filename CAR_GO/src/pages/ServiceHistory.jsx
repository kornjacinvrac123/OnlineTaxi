import noServiceImage from '/home/zix/Documents/5semestar/PVAP/CAR_GO/public/noService.jpg'
import Button from '../UI/Button'
import useStore from '../Functions/useStore.js';
import { FindServiceHistory } from '../Functions/ServiceHistoryHandlers';
import { useEffect, useState } from 'react';
import Table from '../component/Table.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";


const ServiceHistory = ({showDashboard,UserId,handleTable,showUserPanel}) => {

  const[response,setResponse]=useState('');
  const[error,setError]=useState('');
  const[status,setStatus]=useState('');
  const[showNoRecordModal,setShowNoRecordModal]=useState(false);
  const setServiceData=useStore((state)=> state.setServiceData);
  const justEdit=useStore((state)=>state.justEdit);
  const refresh=useStore((state)=>state.refresh);

  useEffect(()=>{
      const handleFetch= async()=>await FindServiceHistory(setStatus,setResponse,setError,UserId);
      handleFetch();
  },[justEdit]);

    useEffect(()=>{
    if(status==='Success' && response.length!==0){
      setServiceData(response);
      setShowNoRecordModal(false);
    }
    else setShowNoRecordModal(true);

    },[status]);


  return (
    <>
  
    <div className={`flex flex-col justify-start items-center
         h-screen w-[500px] bg-gray-900/50 animate-fadeIn p-[clamp(1rem,5vw,3rem)] 
        transform origin-top transition-all duration-300 scale-[clamp(0.8,100vw/1920,1)] md:scale-100`}
        >
     <div className='absolute left-0 top-0 mt-5'>
          <button 
          onClick={ showUserPanel }
          >
            <FontAwesomeIcon icon={faAnglesLeft} size='2x' />
          </button>
        </div>
    {showNoRecordModal &&
      (<>
        <div className='flex flex-col  justify-start  w-full h-[250px] '>
          <p className='font-bold text-white text-3xl'>No Service History found</p>
            <br />
          <p className='font-bold text-white text-2xl'>Let's make your first ride </p>
        </div>
        <div className='grid  h-screen '>
            <div className='bg-cover bg-center w-[500px] h-[450px] 'style={{ backgroundImage: `url(${noServiceImage})` }}  />   
              <div className='flex flex-col w-full justify-end items-center '>
                  <Button 
                    text={'Order service '} 
                    customClass='w-full font-bold text-xl bg-green-400' 
                    onBtnClick={
                      showDashboard
                    }
                  />
              </div>
        </div>
    </>)
    }
    {showNoRecordModal===false && status==='Success' &&
      (
        <Table
         Rows={response}
         handleShowDirection={handleTable}
        />
      )
    }
    </div>
       

    
    </>
  )
}

export default ServiceHistory