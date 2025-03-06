import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import userImage from '../images/user.png';
const UserNavBar = ({bars,handleClick,name,ClickForReadOnly}) => {
   
  return (
    <div className="grid grid-cols-1 w-full h-auto bg-gray-900/30 absolute top-0 left-0  z-50">
        <div className="flex flex-cols justify-between ">
                <div className="flex justify-start space-x-2">
                    <button onClick={handleClick} >
                        <FontAwesomeIcon icon={bars} size="3x"/>
                    </button>
                    <div className="flex flex-col font-bold pt-2 ">
                        <p className='text-l'>
                            <p>   Hi    </p>
                            <p> {name}  </p> 
                        </p>
                    </div>
                </div>
                <div>
                <button className="w-[50px] h-[50px] rounded-full bg-center bg-cover "
                style={{ backgroundImage: `url(${userImage})` }} onClick={ClickForReadOnly}/>
                </div>
       </div>
    </div>
  )
}

export default UserNavBar