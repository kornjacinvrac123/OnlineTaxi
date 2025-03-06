import React from 'react'
import Login from './pages/Login';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import FrontPage from './pages/FrontPage.jsx';
import UserPanel from './pages/UserPanel.jsx';
import { useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import PaymentPanel from './pages/PaymentPanel.jsx';
const App= () => {
  return (
    <BrowserRouter>
    <AppWrapper/>  
    </BrowserRouter>
    
  );
};
const AppWrapper=()=>{
  const location=useLocation();
  const {isLoggedIn} = location.state || {isLoggedIn:false};
   

  return (
     <>
     {isLoggedIn?<Dashboard/>:""}
      <Routes>
        <Route path="/FrontPage" element={<FrontPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/user/:id" element={<UserPanel/>}/>
        <Route path="/payment/:id" element={<PaymentPanel/>}/>
      </Routes>
      </>
  )
}
export default App;