
import React, { useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup'
import {handleAllPanels} from '../Functions/dashboardHandleFunctions';
import Main from './Main';

const FrontPage = () => {
  
  const[showLogin,setShowLogin]=useState(false);
  const[showFrontPage,setShowFrontPage]=useState(true);
  const[showSignup,setShowSignup]=useState(false);
  



  return (
    <div className='bg-[#131316]'>
        {showFrontPage && 
            (<div className='bg-[#131316] w-screen h-screen animate-fadeIn'>

              <Header 
                showLogin={()=>{
                  handleAllPanels(setShowFrontPage,setShowLogin)
                  setShowSignup(false);
                }}
                showSignup={()=>{
                  handleAllPanels(setShowFrontPage,setShowSignup)
                  setShowLogin(false);
                }}
              />
          <hr className="mx-auto mt-10 w-2/3 border-t border-gray-300" />
              <Main
                showSignup={()=>{
                  handleAllPanels(setShowFrontPage,setShowSignup)
                  setShowLogin(false);
                }}
              />
          <div className='h-[200px] bg-inherit'/>
            <hr />
              <Footer
                showSignup={()=>{
                  handleAllPanels(setShowFrontPage,setShowSignup)
                  setShowLogin(false);
                }}
                showLogin={()=>{
                  handleAllPanels(setShowFrontPage,setShowLogin)
                  setShowSignup(false);
                }}
            />
            </div>)
        }
        {showFrontPage === false && showLogin &&
             <Login
               showFrontPage={()=>handleAllPanels(setShowLogin,setShowFrontPage)}
               showSignUp={()=>handleAllPanels(setShowLogin,setShowSignup)}
             />
        }

        {showFrontPage === false && showSignup &&
             (<Signup
               showFrontPage={()=>handleAllPanels(setShowLogin,setShowFrontPage)}
               showLogin={()=>handleAllPanels(setShowSignup,setShowLogin)}
             />)
        }
    </div>
  )
}

export default FrontPage