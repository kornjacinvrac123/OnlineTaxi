
import { useLocation } from 'react-router';
import Button from '../UI/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const Header = ({showLogin,showSignup}) => {

    const location=useLocation();
    // const {isLoggedIn}=location.state || "";
  return (
    <div className="flex justify-start space-x-2 h-[70px] w-full  bg-[#131316] ">
 
        <p className='text-5xl font-bold text-white mt-7  font-mono    ml-5 text-nowrap'>S W I F T</p>
        <div className='flex flex-row  justify-center items-center   w-1/2 '>
                <Button customClass='bg-inherit w-[50px] h-[70px] hover:white  shadow-none border-none hover:bg-inherit'>
                    <p 
                        className='text-2xl font-bold text-white font-sans text-center  
                        transition delay-0 duration-700 ease-in-out hover:-translate-y-2
                        hover:scale-150 mt-5 '
                    >
                        Home
                    </p> 
                </Button>
        </div> 
            <div className='flex justify-between items-end w-1/2 '>
                 <Button 
                     customClass='bg-inherit w-[50px] h-[70px] hover:white  
                     shadow-none rounded-none border-none hover:bg-inherit ml-10'
                    
                    >
                    <p 
                        className='text-2xl font-bold text-white font-sans text-center  
                        transition delay-0 duration-700 ease-in-out hover:-translate-y-2
                        hover:scale-150 mt-5 '
                    >
                        About us
                    </p> 
                </Button>
                <div className=" flex flex-row justify-end  w-1/2 mr-10 ">
                    <span className='  h-[60px] w-[150px] mt-6 ml-5 '> 
                        <Button 
                             customClass="h-auto w-full mt-2 border-none mb-2 bg-inherit
                             transition duration-700 hover:translate-y-5 flex 
                             justify-end items-end px-6 hover:bg-inherit shadow-none"
                             onBtnClick={showSignup}
                        >
                            <p className="text-white font-bold text-xl font-sans text-end">Sign-up</p>
                        </Button>
                    </span>
                    <span className="flex flex-row w-[120px] h-[60px] mt-6">
                        <Button
                            customClass="h-auto w-full mt-2 border-none mb-2 
                                        transition duration-700 hover:translate-x-10 flex 
                                        items-center justify-between px-6"
                            onBtnClick={showLogin}
                        >
                            <p className="text-white font-bold font-sans text-center">Login</p>
                            <FontAwesomeIcon icon={faCaretRight} color="white" size="x"/>
                        </Button>
                    </span>
                    {/* { isLoggedIn  &&
                    <Button text='My Account' customClass='h-[40px] w-[130px] mt-2 text-center'>
                    <Link to={"/user/:id"} />
                    </Button>} */}
                </div>
            </div>
        
 
    </div>
  )
}

export default Header